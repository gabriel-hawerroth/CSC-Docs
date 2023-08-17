import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription, lastValueFrom } from 'rxjs';

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
  primarySectionTitle: string = 'Faturamento';

  subSections: SubSection[] = [
    { id: 1, title: 'Serviço', primary_section_id: 1 },
    { id: 2, title: 'Contratos', primary_section_id: 1 },
    { id: 3, title: 'Proprietárias', primary_section_id: 1 },
  ];

  docs: Documentation[] = [
    { id: 1, title: 'Lorem Ipsum', sub_section_id: 1 },
    { id: 2, title: 'Lorem Ipsum', sub_section_id: 1 },
    { id: 3, title: 'Lorem Ipsum', sub_section_id: 1 },
    { id: 4, title: 'Lorem Ipsum', sub_section_id: 1 },
    { id: 5, title: 'Lorem Ipsum', sub_section_id: 1 },
    { id: 6, title: 'Lorem Ipsum', sub_section_id: 2 },
    { id: 7, title: 'Lorem Ipsum', sub_section_id: 2 },
    { id: 8, title: 'Lorem Ipsum', sub_section_id: 2 },
    { id: 9, title: 'Lorem Ipsum', sub_section_id: 2 },
    { id: 10, title: 'Lorem Ipsum', sub_section_id: 2 },
    { id: 11, title: 'Lorem Ipsum', sub_section_id: 2 },
    { id: 16, title: 'Lorem Ipsum', sub_section_id: 2 },
    { id: 12, title: 'Lorem Ipsum', sub_section_id: 3 },
    { id: 13, title: 'Lorem Ipsum', sub_section_id: 3 },
    { id: 14, title: 'Lorem Ipsum', sub_section_id: 3 },
    { id: 15, title: 'Lorem Ipsum', sub_section_id: 3 },
  ];
  docsList: FormControl = new FormControl();

  subscriptions!: Subscription;

  constructor(
    private subSecService: SubSectionService,
    private docService: DocumentationService,
    private primarySectionService: PrimarySectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id-sec'));

    this.subscriptions = new Subscription();

    // lastValueFrom(this.primarySectionService.getById(id)).then((result) => {
    //   this.primarySectionTitle = result.title;
    // });

    // const subSectionSubscription = this.subSecService
    //   .getSubSections()
    //   .subscribe((result) => {
    //     this.subSections = result;
    //   });

    const docsSubscription = this.docsList.valueChanges.subscribe(
      (title: string) => {
        lastValueFrom(this.docService.searchInDocs(title)).then((result) => {
          this.docs = result;
        });
      }
    );

    // this.subscriptions.add(subSectionSubscription);
    this.subscriptions.add(docsSubscription);
  }

  ngOnDestroy(): void {
    if (this.subscriptions != null && this.subscriptions != undefined) {
      this.subscriptions.unsubscribe();
    }
  }

  navigate(id: number) {
    this.router.navigate([`/doc/${id}`]);
  }
}
