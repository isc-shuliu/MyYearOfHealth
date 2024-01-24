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
  id: number;
}

export interface IBodyToCreateCustomGoal {
  name: string;
  isActive: boolean;
  userId: number;
}

export interface IBodyToCreateListGoals {
  name: string;
  isActive: boolean;
  goalId: number;
}

export interface IGoalsForPeriod {
  dayOfMonth: number;
  completedGoals: number;
  totalActiveGoals: number;
}
