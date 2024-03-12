import { TestBed } from '@angular/core/testing';

import { RefrescoserviceService } from './refrescoservice.service';

describe('RefrescoserviceService', () => {
  let service: RefrescoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefrescoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
