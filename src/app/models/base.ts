import {Genre} from './video.model';

/**
 * Base model with default methods for all the application's models
 */

export class Base {

  constructor(data = {}) {
    for (const name in data) {
      if (data.hasOwnProperty(name)) {
        this[name] = data[name];
      }
    }
  }

  getProperties() {
    const props: { [key: string]: any } = {};
    for (const name in this) {
      if (this.hasOwnProperty(name)) {
        props[name] = this[name];
      }
    }
    return props;
  }
}

export class PagedResults<T> {
  count?: any;
  next?: any;
  previous?: any;
  results?: any;
}
