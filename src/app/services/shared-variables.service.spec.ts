import { TestBed, inject } from '@angular/core/testing';

import { SharedVariablesService } from './shared-variables.service';

describe('SharedVariablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedVariablesService]
    });
  });

  it('should be created', inject([SharedVariablesService], (service: SharedVariablesService) => {
    expect(service).toBeTruthy();
  }));
});
