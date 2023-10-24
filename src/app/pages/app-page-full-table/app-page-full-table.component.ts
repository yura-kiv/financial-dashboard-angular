import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService, DatePeriod } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-full-table',
  templateUrl: './app-page-full-table.component.html',
  styleUrls: ['./app-page-full-table.component.scss'],
})
export class AppPageFullTableComponent {
  filteredData$: Observable<Data[]>;
  itemsCount$: Observable<number>;

  constructor(public dataService: DataService) {
    this.filteredData$ = dataService.filteredData$;
    this.itemsCount$ = dataService.itemsCount$;
  }

  setOverdue(overdue: boolean) {
    this.dataService.overdue = overdue;
  }

  onIssuanceDatesSubmit(data: DatePeriod) {
    this.dataService.issuanceDate = data;
  }

  onActualReturnDatesSubmit(data: DatePeriod) {
    this.dataService.actualReturnDate = data;
  }
}
