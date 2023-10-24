import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Data } from '../models/data.model';

export function filterDataByDateRange(
  data: Data[],
  field: keyof Data,
  from: NgbDate | null,
  to: NgbDate | null
): Data[] {
  return data.filter((item) => {
    const fieldValue = new Date(item[field]);

    if (from && to) {
      const fromDate = new Date(from.year, from.month - 1, from.day);
      const toDate = new Date(to.year, to.month - 1, to.day);
      return fieldValue >= fromDate && fieldValue <= toDate;
    }

    if (from) {
      const fromDate = new Date(from.year, from.month - 1, from.day);
      return fieldValue >= fromDate;
    }

    if (to) {
      const toDate = new Date(to.year, to.month - 1, to.day);
      return fieldValue <= toDate;
    }

    return data;
  });
}

export function filterOverdueLoans(data: Data[]): Data[] {
  const today = new Date();
  const todayDate = new NgbDate(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  return data.filter((item) => {
    const returnDate = new Date(
      +item.return_date.split('-')[0],
      +item.return_date.split('-')[1] - 1,
      +item.return_date.split('-')[2]
    );
    const actualReturnDate = item.actual_return_date
      ? new Date(
          +item.actual_return_date.split('-')[0],
          +item.actual_return_date.split('-')[1] - 1,
          +item.actual_return_date.split('-')[2]
        )
      : null;

    return (
      (actualReturnDate && actualReturnDate > returnDate) || // actual_return_date > return_date
      (!actualReturnDate && returnDate < today) // return_date < сьогодні та actual_return_date пусте
    );
  });
}
