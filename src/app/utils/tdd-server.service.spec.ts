import { TestBed } from '@angular/core/testing';

import { TestDrivenDevelopmentServerService } from './test-driven-development-server.service';

describe('TestDrivenDevelopmentServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestDrivenDevelopmentServerService = TestBed.get(TestDrivenDevelopmentServerService);
    expect(service).toBeTruthy();
  });
});
