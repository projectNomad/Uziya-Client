import {Base} from './base';
import {User} from './user';
import DateTimeFormat = Intl.DateTimeFormat;

export class Video extends Base {
  id: number;
  title: string;
  description: string;
  owner: User;
  duration: number;
  file: string;
  size: number;
  is_delete: Date;
  is_active: boolean;
  is_created: Date;
  genres: Genre[];
  is_path_file: string;
}

export class Genre extends Base {
  id: number;
  label: string;
  description: string;
}

export interface PagedResults<T> {
  count?: number;
  next?: Genre;
  previous?: Genre;
  results?: Genre[];
}

