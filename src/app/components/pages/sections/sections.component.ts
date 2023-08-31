import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject, Subscription, lastValueFrom, takeUntil } from 'rxjs';

import { SubSection } from 'src/app/models/sub-section';
import { SubSectionService } from 'src/app/services/sub-section.service';
import { Documentation } from 'src/app/models/documentation';
import { DocumentationService } from 'src/app/services/documentation.service';
import { PrimarySectionService } from 'src/app/services/primary-section.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit, OnDestroy {
  primarySectionTitle: string = '';

  subSections: SubSection[] = [];

  docs: Documentation[] = [];
  docSearch: FormControl = new FormControl();
  docsList: Documentation[] = [];

  _unsubscribeAll: Subject<any>;

  constructor(
    private subSecService: SubSectionService,
    private docService: DocumentationService,
    private primarySectionService: PrimarySectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id-sec'));

    lastValueFrom(this.primarySectionService.getById(id)).then((result) => {
      this.primarySectionTitle = result.title;
    });

    this.subSecService
      .getByPrimarySection(id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        this.subSections = result;
      });

    lastValueFrom(this.docService.getDocs()).then((result) => {
      this.docs = result;
    });

    this.docSearch.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((title: string) => {
        lastValueFrom(this.docService.searchInDocs(title)).then((result) => {
          this.docsList = result;
        });
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  navigate(id: number) {
    this.router.navigate([`/doc/${id}`]);
  }
}
