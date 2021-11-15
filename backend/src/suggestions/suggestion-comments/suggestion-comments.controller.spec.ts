import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionCommentsController } from './suggestion-comments.controller';

describe('SuggestionCommentsController', () => {
  let controller: SuggestionCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestionCommentsController],
    }).compile();

    controller = module.get<SuggestionCommentsController>(SuggestionCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
