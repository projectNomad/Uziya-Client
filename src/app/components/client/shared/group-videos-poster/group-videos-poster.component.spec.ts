import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupVideosPosterComponent } from './group-videos-poster.component';

describe('GroupVideosPosterComponent', () => {
  let component: GroupVideosPosterComponent;
  let fixture: ComponentFixture<GroupVideosPosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupVideosPosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupVideosPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
