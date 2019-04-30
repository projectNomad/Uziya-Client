import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLeftAdminComponent } from './menu-left-admin.component';

describe('MenuLeftAdminComponent', () => {
  let component: MenuLeftAdminComponent;
  let fixture: ComponentFixture<MenuLeftAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLeftAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLeftAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
