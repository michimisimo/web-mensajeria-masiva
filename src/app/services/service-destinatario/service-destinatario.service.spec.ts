import { TestBed } from '@angular/core/testing';

import { ServiceDestinatarioService } from './service-destinatario';

describe('ApiListDestService', () => {
  let service: ServiceDestinatarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDestinatarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
