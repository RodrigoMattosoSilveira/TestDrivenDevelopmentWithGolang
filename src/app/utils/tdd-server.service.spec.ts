import { TestBed } from '@angular/core/testing';

import { TddServerService } from './tdd-server.service';

describe('TestDrivenDevelopmentServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TddServerService = TestBed.get(TddServerService);
    expect(service).toBeTruthy();
  });
});
