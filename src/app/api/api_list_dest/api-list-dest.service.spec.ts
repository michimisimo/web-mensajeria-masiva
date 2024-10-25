import { TestBed } from '@angular/core/testing';

import { ApiListDestService } from './api-list-dest.service';

describe('ApiListDestService', () => {
  let service: ApiListDestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiListDestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
