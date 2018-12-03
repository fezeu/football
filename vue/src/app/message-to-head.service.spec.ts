import { TestBed } from '@angular/core/testing';

import { MessageToHeadService } from './message-to-head.service';

describe('MessageToHeadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageToHeadService = TestBed.get(MessageToHeadService);
    expect(service).toBeTruthy();
  });
});
