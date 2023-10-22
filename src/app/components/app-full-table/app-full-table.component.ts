import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DataRes } from 'src/app/models/data.model';

@Component({
  selector: 'app-full-table',
  templateUrl: './app-full-table.component.html',
  styleUrls: ['./app-full-table.component.scss'],
})
export class AppFullTableComponent implements OnChanges {
  @Input() data: DataRes[] = [];
  page = 1;
  pageSize = 10;
  collectionSize = this.data.length;
  filteredData: DataRes[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.collectionSize = this.data.length;
    this.refreshData();
  }

  refreshData() {
    this.filteredData = this.data
      .map((item, i) => ({ ...item }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}
