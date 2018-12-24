import { TestBed } from '@angular/core/testing';

import { GqlQueriesService } from './gql-queries.service';

describe('GqlQueriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GqlQueriesService = TestBed.get(GqlQueriesService);
    expect(service).toBeTruthy();
  });
});
