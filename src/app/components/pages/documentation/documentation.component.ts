import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { Documentation } from 'src/app/models/documentation';
import { DocumentationService } from 'src/app/services/documentation.service';
import { DocSection } from 'src/app/models/doc-section';
import { DocSubSection } from 'src/app/models/doc-sub-section';
import { SubSection } from 'src/app/models/sub-section';
import { SubSectionService } from 'src/app/services/sub-section.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent implements OnInit {
  docSections: DocSection[] = [];

  docSubSections: DocSubSection[] = [];

  doc!: Documentation;
  subSection!: SubSection;

  constructor(
    private route: ActivatedRoute,
    private docService: DocumentationService,
    private subSecService: SubSectionService
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id-doc'));

    await lastValueFrom(this.docService.getById(id)).then((result) => {
      this.doc = result;
    });

    lastValueFrom(this.subSecService.getById(this.doc.subSectionId)).then(
      (result) => {
        this.subSection = result;
        console.log(result);
        console.log(result.primarySectionId);
      }
    );
  }
}
