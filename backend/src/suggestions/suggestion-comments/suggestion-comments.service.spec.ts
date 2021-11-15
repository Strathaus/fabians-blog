import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionCommentsService } from './suggestion-comments.service';

describe('SuggestionCommentsService', () => {
  let service: SuggestionCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestionCommentsService],
    }).compile();

    service = module.get<SuggestionCommentsService>(SuggestionCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
