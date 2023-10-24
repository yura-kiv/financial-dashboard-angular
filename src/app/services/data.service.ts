import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  of,
  switchMap,
} from 'rxjs';
import { Data } from '../models/data.model';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { filterDataByDateRange, filterOverdueLoans } from './data.helper';

type Filters = {
  page: number;
  pageSize: number;
  issuanceDate: DatePeriod;
  actualReturnDate: DatePeriod;
  overdue: boolean;
};

export interface DatePeriod {
  from: NgbDate | null;
  to: NgbDate | null;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl =
    'https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json';

  private _data$ = new BehaviorSubject<Data[]>([]);
  private _search$ = new Subject<void>();
  private _filteredData$ = new BehaviorSubject<Data[]>([]);
  private _itemsCount$ = new BehaviorSubject<number>(0);
  private _filters: Filters = {
    page: 1,
    pageSize: 10,
    issuanceDate: {
      from: null,
      to: null,
    },
    actualReturnDate: {
      from: null,
      to: null,
    },
    overdue: false,
  };

  private _set(patch: Partial<Filters>) {
    Object.assign(this._filters, patch);
    this._search$.next();
  }

  get filteredData$() {
    return this._filteredData$.asObservable();
  }

  get itemsCount$() {
    return this._itemsCount$.asObservable();
  }

  get fullData() {
    return this.http.get<Data[]>(this.apiUrl);
  }

  get page() {
    return this._filters.page;
  }

  get pageSize() {
    return this._filters.pageSize;
  }

  get overdue() {
    return this._filters.overdue;
  }

  set page(page: number) {
    this._set({ page });
  }

  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  set issuanceDate(issuanceDate: DatePeriod) {
    this._set({ issuanceDate });
  }

  set actualReturnDate(actualReturnDate: DatePeriod) {
    this._set({ actualReturnDate });
  }

  set overdue(overdue: boolean) {
    this._set({ overdue });
  }

  constructor(private http: HttpClient) {
    this.http.get<Data[]>(this.apiUrl).subscribe((data) => {
      this._data$.next(data);
      this._search$.next();
    });

    this._search$.pipe(switchMap(() => this._search())).subscribe((result) => {
      this._filteredData$.next(result.data);
      this._itemsCount$.next(result.itemsCount);
    });

    this._search$.next();
  }

  private _search(): Observable<{ data: Data[]; itemsCount: number }> {
    const { pageSize, page } = this._filters;

    let filteredData = filterDataByDateRange(
      this._data$.getValue(),
      'issuance_date',
      this._filters.issuanceDate.from,
      this._filters.issuanceDate.to
    );

    filteredData = filterDataByDateRange(
      filteredData,
      'actual_return_date',
      this._filters.actualReturnDate.from,
      this._filters.actualReturnDate.to
    );

    if (this.overdue) filteredData = filterOverdueLoans(filteredData);

    const itemsCount = filteredData.length;

    filteredData = filteredData.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );

    return of({ data: filteredData, itemsCount });
  }
}
