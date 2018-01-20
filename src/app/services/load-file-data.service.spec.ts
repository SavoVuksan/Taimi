import { TestBed, inject } from '@angular/core/testing';

import { LoadFileDataService } from './load-file-data.service';

describe('LoadFileDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadFileDataService]
    });
  });

  it('should be created', inject([LoadFileDataService], (service: LoadFileDataService) => {
    expect(service).toBeTruthy();
  }));
});
