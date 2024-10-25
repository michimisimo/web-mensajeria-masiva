import { TestBed } from '@angular/core/testing';

import { ApiGestCamapanaService } from './api-gest-camapana.service';

describe('ApiGestCamapanaService', () => {
  let service: ApiGestCamapanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGestCamapanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
