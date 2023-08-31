import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent implements OnInit {
  amounts: number[] = [];

  constructor(private _utilsService: UtilsService) {}

  ngOnInit(): void {
    lastValueFrom(this._utilsService.getTotOfRecords())
      .then((result) => {
        this.amounts = result;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
