import {Base} from './base';

export class User extends Base {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  groups: string;
  gender: string;
  password: string;
  date_joined: string;
  url: string;
}
