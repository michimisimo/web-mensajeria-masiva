import { TestBed } from '@angular/core/testing';

import { ServiceEnvioService } from './service-envio.service';

describe('ServiceEnvioService', () => {
  let service: ServiceEnvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEnvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
