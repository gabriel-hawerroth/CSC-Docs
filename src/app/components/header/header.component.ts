import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, lastValueFrom } from 'rxjs';
import { FormControl } from '@angular/forms';

import { Documentation } from 'src/app/models/documentation';
import { DocumentationService } from 'src/app/services/documentation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() sub_title!: string;

  docs: Documentation[] = [];
  docsList: FormControl = new FormControl();

  subscriptions!: Subscription;

  constructor(private docService: DocumentationService) {}

  ngOnInit() {
    const docsSubscription = this.docsList.valueChanges.subscribe(
      (title: string) => {
        lastValueFrom(this.docService.searchInDocs(title)).then((result) => {
          this.docs = result;
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions != null && this.subscriptions != undefined) {
      this.subscriptions.unsubscribe();
    }
  }

  onDocSearch(e: Event) {}
}
