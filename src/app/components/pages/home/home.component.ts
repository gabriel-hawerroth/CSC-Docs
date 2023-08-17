import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription, lastValueFrom } from 'rxjs';

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
  primarySections: PrimarySection[] = [
    { id: 1, title: 'Contabilidade' },
    { id: 2, title: 'Faturamento' },
    { id: 3, title: 'Contas a receber' },
    { id: 4, title: 'Contas a pagar' },
    { id: 5, title: 'Facilities' },
    { id: 6, title: 'Supply' },
  ];

  docs: Documentation[] = [];
  docsList: FormControl = new FormControl();

  subscriptions!: Subscription;

  constructor(
    private primarySectionService: PrimarySectionService,
    private docService: DocumentationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions = new Subscription();

    // const primarySectionSubscription = this.primarySectionService
    //   .getPrimarySections()
    //   .subscribe((result) => {
    //     this.primarySections = result;
    //   });

    const docsSubscription = this.docsList.valueChanges.subscribe(
      (title: string) => {
        lastValueFrom(this.docService.searchInDocs(title)).then((result) => {
          this.docs = result;
        });
      }
    );

    // this.subscriptions.add(primarySectionSubscription);
    this.subscriptions.add(docsSubscription);
  }

  ngOnDestroy(): void {
    if (this.subscriptions != null && this.subscriptions != undefined) {
      this.subscriptions.unsubscribe();
    }
  }

  navigate(id: number) {
    this.router.navigate([`/section/${id}`]);
  }
}
