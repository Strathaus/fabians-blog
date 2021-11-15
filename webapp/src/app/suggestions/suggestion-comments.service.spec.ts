import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SuggestionCommentsService } from './suggestion-comments.service';

describe('SuggestionCommentsService', () => {
  let service: SuggestionCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SuggestionCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
