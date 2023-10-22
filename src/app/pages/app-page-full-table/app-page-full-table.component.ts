import { Component } from '@angular/core';
import { DataRes } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-page-full-table',
  templateUrl: './app-page-full-table.component.html',
  styleUrls: ['./app-page-full-table.component.scss'],
})
export class AppPageFullTableComponent {
  data: DataRes[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
