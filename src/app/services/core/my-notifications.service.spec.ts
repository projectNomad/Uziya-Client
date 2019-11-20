import { TestBed } from '@angular/core/testing';

import { MyNotificationsService } from './my-notifications.service';

describe('MyNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyNotificationsService = TestBed.get(MyNotificationsService);
    expect(service).toBeTruthy();
  });
});
