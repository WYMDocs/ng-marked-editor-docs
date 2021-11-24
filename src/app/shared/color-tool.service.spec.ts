import { TestBed } from '@angular/core/testing';

import { ColorToolService } from './color-tool.service';

describe('ColorToolService', () => {
  let service: ColorToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
