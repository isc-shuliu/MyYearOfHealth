export interface ICarePlanData {
  entry: ICarePlan[];
}

export interface ICarePlan {
  resource: {
    activity: IActivity[];
    period: {
      start: string;
    };
  };
}

interface IActivity {
  detail: IDetailsPlanItem[];
}

export interface IDetailsPlanItem {
  code: {
    coding: { code: string; display: string; system: string }[];
    text: string;
  };
  location: {
    display: string;
  };
  status: string;
}
