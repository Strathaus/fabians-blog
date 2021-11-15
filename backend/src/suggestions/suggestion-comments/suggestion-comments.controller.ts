import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticationGuard } from '../../guards/authentication.guard';
import { IHttpError } from '../../models/http-error.interface';
import { MongoObjectIdPipe } from '../../pipes/mongo-object-id.pipe';
import { CreateSuggestionCommentDto } from './models/CreateSuggestionCommentDto';
import { SuggestionComment } from './models/suggestion-comment.model';
import { SuggestionCommentsService } from './suggestion-comments.service';

@Controller('api/suggestions/:suggestionId/comments')
@ApiTags('suggestion-comments')
export class SuggestionCommentsController {
  constructor(
    private readonly _suggestionCommentsService: SuggestionCommentsService,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the suggestion',
    example: '6175a3e1c787c16dfd6cc006',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit number of comments fetched',
    example: 10,
  })
  @ApiQuery({
    name: 'skip',
    type: Number,
    description:
      'Skip x entries after sorting by createdAt (for loading more suggestions)',
    example: 10,
  })
  @ApiOkResponse({
    description: 'Comments were successfully fetched',
    type: SuggestionComment,
  })
  async getLatestSuggestions(
    @Session() session,
    @Param('suggestionId', MongoObjectIdPipe) suggestionId: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this._suggestionCommentsService.getLatestSuggestionComments(
      suggestionId,
      skip,
      limit,
    );
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'Comment was successfully created',
    type: SuggestionComment,
  })
  @ApiBadRequestResponse({
    description: 'Request does not match the expected format.',
    type: IHttpError,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    type: IHttpError,
  })
  async createSuggestion(
    @Session() session,
    @Param('suggestionId', MongoObjectIdPipe) suggestionId: string,
    @Body() createSuggestionCommentDto: CreateSuggestionCommentDto,
  ) {
    return this._suggestionCommentsService.postSuggestionComment(suggestionId, {
      ...createSuggestionCommentDto,
      author: session.user._id,
    });
  }
}
