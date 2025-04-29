import { TestBed } from '@angular/core/testing';

import { GanDecrypterService } from './gan-decrypter.service';

describe('GanDecrypterService', () => {
  let service: GanDecrypterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GanDecrypterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
