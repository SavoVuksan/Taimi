import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekTimeComponent } from './week-time.component';

describe('WeekTimeComponent', () => {
  let component: WeekTimeComponent;
  let fixture: ComponentFixture<WeekTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
