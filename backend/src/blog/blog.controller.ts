import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { IHttpError } from 'src/models/http-error.interface';
import { MongoObjectIdPipe } from 'src/pipes/mongo-object-id.pipe';
import { BlogService } from './blog.service';
import { BlogEntry } from './models/BlogEntry';
import { CreateBlogDto } from './models/CreateBlogDto';

@Controller('api/blog')
@ApiTags('blog')
export class BlogController {
  constructor(private readonly _blogService: BlogService) {}
  @Post()
  @UseGuards(AuthorizationGuard)
  @HttpCode(201)
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
  @ApiQuery({
    name: 'tags',
    type: String,
    description: 'Tags to filter for',
    example: 'Webdevelopment',
  })
  @ApiOkResponse({
    description: 'Successfully fetched blog entries',
  })
  async getLatestBlogEntries(
    @Query('skip') skip: number,
    @Query('tags') tags: string[],
  ) {
    return this._blogService.getLatestBlogs(skip, tags);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the blog Entry',
    example: '6175a3e1c787c16dfd6cc006',
  })
  @ApiOkResponse({
    description: 'Successfully fetched blog entry',
  })
  async getBlogEntry(@Param('id', MongoObjectIdPipe) id) {
    const blog = await this._blogService.getBlog(id);
    if (!blog) throw new NotFoundException();
    return blog;
  }

  @Put(':id')
  @UseGuards(AuthorizationGuard)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the blog Entry',
    example: '6175a3e1c787c16dfd6cc006',
  })
  @ApiOkResponse({
    description: 'Successfully edited blog entry',
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
    description: 'User does not have the right to edit blog entries',
    type: IHttpError,
  })
  async editBlogEntry(
    @Param('id', MongoObjectIdPipe) id,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    return this._blogService.editBlog(id, createBlogDto);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Blog entry was successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Blog entry could not be found.',
    type: IHttpError,
  })
  async deleteBlogEntry(@Param('id', MongoObjectIdPipe) id) {
    return this._blogService.deleteBlogEntry(id);
  }
}
