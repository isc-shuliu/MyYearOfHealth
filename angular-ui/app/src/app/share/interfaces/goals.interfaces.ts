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

export interface ICustomGoal {
  userId: number;
  name: string;
  isActive: boolean;
}

export interface IGoalsForPeriod {
  dayOfMonth: number;
  completedGoals: number;
  totalActiveGoals: number;
}
