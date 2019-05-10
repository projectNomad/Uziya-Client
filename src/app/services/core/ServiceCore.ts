import { HttpParams } from '@angular/common/http';

export default class ServiceCore {

  /**
   * convert object to HttpParams object
   * @param {Object} obj
   * @returns {HttpParams}
   */
  toHttpParams(obj: object): HttpParams {
    return Object.getOwnPropertyNames(obj).reduce(
      (p, key) => p.set(key, obj[key]),
      new HttpParams()
    );
  }
}
