import { TestBed } from '@angular/core/testing';

import { CalculadoraserviceService } from './calculadoraservice.service';

describe('CalculadoraserviceService', () => {
  let service: CalculadoraserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculadoraserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
