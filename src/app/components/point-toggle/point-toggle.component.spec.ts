import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointToggleComponent } from './point-toggle.component';

describe('PointToggleComponent', () => {
  let component: PointToggleComponent;
  let fixture: ComponentFixture<PointToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
