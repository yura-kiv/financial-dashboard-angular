import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataRes } from '../models/data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl =
    'https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<DataRes[]> {
    return this.http.get<DataRes[]>(this.dataUrl);
  }
}
