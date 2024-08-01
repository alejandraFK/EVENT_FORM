import { TestBed } from '@angular/core/testing';

import { ResponseTypeService } from './response-type.service';

describe('ResponseTypeService', () => {
  let service: ResponseTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
