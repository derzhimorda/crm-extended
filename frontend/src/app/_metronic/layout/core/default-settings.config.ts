import {DefaultLayoutConfig} from "./default-layout.config";

export interface ISettings{
  roles: IRoles;
}

export interface IRoles{
  id:number;
  name: string;
  name_en: string;
  description: string;
}

export const DefaultSettings: ISettings = {
  roles: {
    id: 0,
    name: '',
    name_en: '',
    description: ''
  }
}
