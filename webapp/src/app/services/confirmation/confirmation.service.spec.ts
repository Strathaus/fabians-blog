import { TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../lib/material.module';

import { ConfirmationService } from './confirmation.service';

describe('ConfirmationService', () => {
  let service: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MaterialModule] });
    service = TestBed.inject(ConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
