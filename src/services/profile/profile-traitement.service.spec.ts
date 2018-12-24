import { TestBed } from '@angular/core/testing';

import { ProfileTraitementService } from './profile-traitement.service';

describe('ProfileTraitementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileTraitementService = TestBed.get(ProfileTraitementService);
    expect(service).toBeTruthy();
  });
});
