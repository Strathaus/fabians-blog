import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { IHttpError } from 'src/models/http-error.interface';
import { BlogService } from './blog.service';
import { BlogEntry } from './models/BlogEntry';
import { CreateBlogDto } from './models/CreateBlogDto';

@Controller('api/blog')
@ApiTags('blog')
export class BlogController {
  constructor(private readonly _blogService: BlogService) {}
  @Post()
  @UseGuards(AuthorizationGuard)
  @ApiCreatedResponse({
    description: 'Blog entry was successfully created',
    type: BlogEntry,
  })
  @ApiBadRequestResponse({
    description: 'Request does not match the expected format.',
    type: IHttpError,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    type: IHttpError,
  })
  @ApiForbiddenResponse({
    description: 'User does not have the right to create blog entries',
    type: IHttpError,
  })
  async createBlogEntry(
    @Session() session,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    return this._blogService.createBlogEntry({
      ...createBlogDto,
      author: session.user._id,
    });
  }

  @Get()
  @ApiQuery({
    name: 'skip',
    type: Number,
    description:
      'Skip x entries after sorting by createdAt (for loading more blog entries)',
    example: 10,
  })
  async getLatestBlogEntries(@Query('skip') skip) {
    return this._blogService.getLatestBlogs(skip);
  }
}
