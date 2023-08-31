import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject, Subscription, lastValueFrom } from 'rxjs';

import { PrimarySection } from 'src/app/models/primary-section';
import { PrimarySectionService } from 'src/app/services/primary-section.service';
import { Documentation } from 'src/app/models/documentation';
import { DocumentationService } from 'src/app/services/documentation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  primarySections: PrimarySection[] = [];

  docs: Documentation[] = [];
  docsList: FormControl = new FormControl();

  _unsubscribeAll: Subject<any>;

  constructor(
    private primarySectionService: PrimarySectionService,
    private docService: DocumentationService,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.primarySectionService.getPrimarySections().subscribe((result) => {
      this.primarySections = result;
    });

    this.docsList.valueChanges.subscribe((title: string) => {
      lastValueFrom(this.docService.searchInDocs(title)).then((result) => {
        this.docs = result;
      });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  navigate(id: number) {
    this.router.navigate([`/section/${id}`]);
  }
}
