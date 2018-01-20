import { TestBed, inject } from '@angular/core/testing';

import { WriteFileDataService } from './write-file-data.service';

describe('WriteFileDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WriteFileDataService]
    });
  });

  it('should be created', inject([WriteFileDataService], (service: WriteFileDataService) => {
    expect(service).toBeTruthy();
  }));
});
