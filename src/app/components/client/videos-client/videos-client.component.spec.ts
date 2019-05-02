import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosClientComponent } from './videos-client.component';

describe('VideosClientComponent', () => {
  let component: VideosClientComponent;
  let fixture: ComponentFixture<VideosClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
