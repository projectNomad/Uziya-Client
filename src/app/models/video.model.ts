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
  is_deleted: Date;
  is_active: boolean;
  is_actived: Date;
  is_created: Date;
  genres: Genre[];
  is_path_file: string;
}

export class Genre extends Base {
  id: number;
  label: string;
  description: string;
}

