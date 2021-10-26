import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TagsService } from './tags.service';

@Controller('api/tags')
@ApiTags('tag')
export class TagsController {
  constructor(private readonly _tagService: TagsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Successfully fetched tags',
  })
  @ApiQuery({
    name: 'q',
    description: 'Query to fetch tags',
    required: false,
  })
  async getTags(@Query('q') q: string) {
    return this._tagService.getTags(q);
  }
}
