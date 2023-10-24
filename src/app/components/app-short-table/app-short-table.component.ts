import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

type DisplayedData = { month: string; information: string }[];

@Component({
  selector: 'app-short-table',
  templateUrl: './app-short-table.component.html',
  styleUrls: ['./app-short-table.component.scss'],
})
export class AppShortTableComponent {
  data: Data[] = [];
  metricData: DisplayedData = [];
  sortMethod:
    | 'averageLoanAmountByMonth'
    | 'totalLoanAmountByMonth'
    | 'countLoansByMonth'
    | 'countReturnedLoansByMonth' = 'averageLoanAmountByMonth';

  constructor(private dataService: DataService) {
    dataService.fullData.subscribe((data) => {
      this.data = data;
      this.updateMetricData(this.data);
    });
  }

  onSortMethodChange() {
    this.updateMetricData(this.data);
  }

  updateMetricData(data: Data[]) {
    switch (this.sortMethod) {
      case 'averageLoanAmountByMonth':
        this.metricData = this.calculateAverageLoanAmountByMonth(data);
        break;
      case 'totalLoanAmountByMonth':
        this.metricData = this.calculateTotalLoanAmountByMonth(data);
        break;
      case 'countLoansByMonth':
        this.metricData = this.calculateCountLoansByMonth(data);
        break;
      case 'countReturnedLoansByMonth':
        this.metricData = this.calculateCountReturnedLoansByMonth(data);
        break;
    }
  }

  calculateTotal(numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
  }

  calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) {
      return 0;
    }
    const total = this.calculateTotal(numbers);
    return total / numbers.length;
  }

  getMonthFromDate(date: string): string {
    const [year, month] = date.split('-');
    return `${year}-${month}`;
  }

  getLoansByMonths(data: Data[]): { [month: string]: number[] } {
    const loansByMonth: { [month: string]: number[] } = {};
    for (const item of data) {
      const month = this.getMonthFromDate(item.issuance_date);
      if (!loansByMonth[month]) {
        loansByMonth[month] = [];
      }
      loansByMonth[month].push(item.body);
    }
    return loansByMonth;
  }

  calculateAverageLoanAmountByMonth(data: Data[]): DisplayedData {
    const loansByMonth = this.getLoansByMonths(data);
    const result: DisplayedData = [];
    for (const month in loansByMonth) {
      if (loansByMonth.hasOwnProperty(month)) {
        const average = this.calculateAverage(loansByMonth[month]);
        result.push({ month, information: `Average: ${average}` });
      }
    }
    return result;
  }

  calculateTotalLoanAmountByMonth(data: Data[]): DisplayedData {
    const loansByMonth = this.getLoansByMonths(data);
    const result: { month: string; information: string }[] = [];
    for (const month in loansByMonth) {
      if (loansByMonth.hasOwnProperty(month)) {
        const total = this.calculateTotal(loansByMonth[month]);
        result.push({ month, information: `Total: ${total}` });
      }
    }
    return result;
  }

  calculateCountLoansByMonth(data: Data[]): DisplayedData {
    const loansByMonth = this.getLoansByMonths(data);
    const result: DisplayedData = [];
    for (const month in loansByMonth) {
      if (loansByMonth.hasOwnProperty(month)) {
        const count = loansByMonth[month].length;
        result.push({ month, information: `Count Loans: ${count}` });
      }
    }
    return result;
  }

  calculateCountReturnedLoansByMonth(data: Data[]): DisplayedData {
    const returnedLoansByMonth: { [month: string]: number[] } = {};
    for (const item of data) {
      if (item.actual_return_date) {
        const month = this.getMonthFromDate(item.issuance_date);
        if (!returnedLoansByMonth[month]) {
          returnedLoansByMonth[month] = [];
        }
        returnedLoansByMonth[month].push(1);
      }
    }
    const result: DisplayedData = [];
    for (const month in returnedLoansByMonth) {
      if (returnedLoansByMonth.hasOwnProperty(month)) {
        const count = returnedLoansByMonth[month].length;
        result.push({ month, information: `Count Returned Loans: ${count}` });
      }
    }
    return result;
  }
}
