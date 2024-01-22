export interface IPatientData {
  carePlans: IUserCarePlan[];
  observations: IUserObservationData[];
  user: IUserData;
}

export interface IUserData {
  birthDate: string;
  gender: string;
  hame: string;
  status: string;
  surname: string;
  telecom: string;
}

export interface IUserObservationData {
  code: string;
  observation: string;
}

export interface IUserCarePlan {
  careplan: string;
  code: string;
}
