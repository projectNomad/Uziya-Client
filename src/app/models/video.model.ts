import {Base} from './base';
import {User} from './user';

export class Video extends Base {
  id: number;
  title: string;
  description: string;
  owner: User;
  duration: number;
  file: string;
  size: number;
  is_delete: boolean;
  is_active: boolean;
  is_created: Date;
  genres: Genre[];
  hostPathFile: string;
  durationToHMS: string;
}

export class Genre extends Base {
  id: number;
  label: string;
  description: string;
}

