import { TestBed, inject } from '@angular/core/testing';

import { TrackProgramsService } from './track-programs.service';

describe('TrackProgramsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackProgramsService]
    });
  });

  it('should be created', inject([TrackProgramsService], (service: TrackProgramsService) => {
    expect(service).toBeTruthy();
  }));
});
