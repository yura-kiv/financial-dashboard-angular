import { Component, Input } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-full-table',
  templateUrl: './app-full-table.component.html',
  styleUrls: ['./app-full-table.component.scss'],
})
export class AppFullTableComponent {
  @Input() filteredData$: Observable<Data[]>;

  constructor() {
    this.filteredData$ = new Observable<Data[]>();
  }
}
