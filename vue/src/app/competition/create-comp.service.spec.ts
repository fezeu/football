import { TestBed } from '@angular/core/testing';

import { CreateCompService } from './create-comp.service';

describe('CreateCompService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateCompService = TestBed.get(CreateCompService);
    expect(service).toBeTruthy();
  });
});
