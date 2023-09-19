import { TestBed } from '@angular/core/testing';

import { AlogoliaService } from './alogolia.service';

describe('AlogoliaService', () => {
  let service: AlogoliaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlogoliaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
