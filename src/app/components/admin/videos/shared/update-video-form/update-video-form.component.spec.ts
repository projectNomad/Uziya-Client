import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVideoFormComponent } from './update-video-form.component';

describe('UpdateVideoFormComponent', () => {
  let component: UpdateVideoFormComponent;
  let fixture: ComponentFixture<UpdateVideoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVideoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
