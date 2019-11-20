import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordErrorsListComponent } from './password-errors-list.component';

describe('PasswordErrorsListComponent', () => {
  let component: PasswordErrorsListComponent;
  let fixture: ComponentFixture<PasswordErrorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordErrorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordErrorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
