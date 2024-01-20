export interface IDailyGoal {
  userId: string;
  goals: string[];
  date: string;
}

export interface IGoalsPeriod {
  userId: string;
  dateFrom: string;
  dateTo: string;
}
