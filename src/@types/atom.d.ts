export interface IFilterAtom {
  search: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  sortBy: string;
  order: string;
}

export interface IUserAtom {
  name: string;
  email: string;
}