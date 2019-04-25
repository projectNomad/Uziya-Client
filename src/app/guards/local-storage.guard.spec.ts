import { TestBed, async, inject } from '@angular/core/testing';

import { LocalStorageGuard } from './local-storage.guard';

describe('LocalStorageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageGuard]
    });
  });

  it('should ...', inject([LocalStorageGuard], (guard: LocalStorageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
