import { TestBed } from '@angular/core/testing';

import { ServiceDifusionService } from './service-difusion.service';

describe('ServiceDifusionService', () => {
  let service: ServiceDifusionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDifusionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
