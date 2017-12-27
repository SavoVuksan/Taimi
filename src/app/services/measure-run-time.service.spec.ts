import { TestBed, inject } from '@angular/core/testing';

import { MeasureRunTimeService } from './measure-run-time.service';

describe('MeasureRunTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasureRunTimeService]
    });
  });

  it('should be created', inject([MeasureRunTimeService], (service: MeasureRunTimeService) => {
    expect(service).toBeTruthy();
  }));
});
