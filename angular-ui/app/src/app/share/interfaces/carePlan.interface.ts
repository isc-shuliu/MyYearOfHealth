export interface ICarePlanData {
  entry: ICarePlan[];
}

export interface ICarePlan {
  resource: {
    activity: IActivity[];
    category: {
      coding: { code: string; display: string; system: string }[];
      text: string;
    }[];
    id: string;
    period: {
      start: string;
    };
  };
}

interface IActivity {
  detail: IDetailsPlanItem[];
}

export interface IDetailsPlanItem {
  code: ICodeCarePlan;
  location: {
    display: string;
  };
  status: string;
}

export interface ICustomItem {
  id: number;
  item: string;
}

interface ICodeCarePlan {
  coding: { code: string; display: string; system: string }[];
  text: string;
}
