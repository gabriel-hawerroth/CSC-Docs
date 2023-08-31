import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-second-header',
  templateUrl: './second-header.component.html',
  styleUrls: ['./second-header.component.scss'],
})
export class SecondHeaderComponent {
  @Input() title: string = '';
  @Input() back_page: string = '';

  pageType = '';

  constructor(private route: ActivatedRoute) {
    const id = Number(this.route.snapshot.paramMap.get('id-doc'));
    if (id != null) this.pageType = 'cadastro';
    else this.pageType = 'doc';
  }
}
