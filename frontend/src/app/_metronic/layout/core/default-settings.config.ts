import {DefaultLayoutConfig} from "./default-layout.config";

export interface ISettings{
  deal_statuses: [];
  deal_types: [];
  delivery_types: [];
  delivery_ways: [];
  job_types: [];
  pay_types: [];
  pickup_types: [];
  roles: [];
  user_statuses: [];
}

// export interface IRoles{
//   id:number;
//   name: string;
//   name_en: string;
//   description: string;
// }

export const DefaultSettings: ISettings = {
  deal_statuses: [],
  deal_types: [],
  delivery_types: [],
  delivery_ways: [],
  job_types: [],
  pay_types: [],
  pickup_types: [],
  roles: [],
  user_statuses: []
}
