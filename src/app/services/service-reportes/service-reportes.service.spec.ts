import { TestBed } from '@angular/core/testing';

import { ServiceReportesService } from './service-reportes.service';

describe('ServiceReportesService', () => {
  let service: ServiceReportesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceReportesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
