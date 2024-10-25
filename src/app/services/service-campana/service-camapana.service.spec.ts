import { TestBed } from '@angular/core/testing';

import { ServiceCamapanaService } from './service-camapana.service';

describe('ServiceCamapanaService', () => {
  let service: ServiceCamapanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCamapanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
