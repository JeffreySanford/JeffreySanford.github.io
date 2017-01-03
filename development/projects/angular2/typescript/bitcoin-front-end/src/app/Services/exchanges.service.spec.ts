/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExchangesService } from './exchanges.service';

describe('ExchangesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExchangesService]
    });
  });

  it('should ...', inject([ExchangesService], (service: ExchangesService) => {
    expect(service).toBeTruthy();
  }));
});
