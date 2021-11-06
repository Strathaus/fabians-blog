import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { AuthenticationGuard } from '../guards/authentication.guard';
import { IHttpError } from '../models/http-error.interface';
import { MongoObjectIdPipe } from '../pipes/mongo-object-id.pipe';
import { CreateSuggestionDto } from './models/CreateSuggestionDto';
import { Suggestion } from './models/suggestion.model';
import { SuggestionsService } from './suggestions.service';

@Controller('api/suggestions')
@ApiTags('suggestions')
export class SuggestionsController {
  constructor(private readonly _suggestionsService: SuggestionsService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'Suggestion was successfully created',
    type: Suggestion,
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
    @Body() createSuggestionDto: CreateSuggestionDto,
  ) {
    return this._suggestionsService.createSuggestion({
      ...createSuggestionDto,
      author: session.user._id,
      likes: [session.user._id],
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
  @ApiOkResponse({
    description: 'Successfully fetched blog entries',
  })
  async getBestSuggestions(@Session() session, @Query('skip') skip: number) {
    return this._suggestionsService.getBestSuggestions({
      userId: session.user._id,
      skip,
    });
  }

  @Put(':id')
  @UseGuards(AuthenticationGuard)
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the suggestion',
    example: '6175a3e1c787c16dfd6cc006',
  })
  @ApiOkResponse({
    description: 'Successfully edited suggestion',
  })
  @ApiBadRequestResponse({
    description: 'Request does not match the expected format.',
    type: IHttpError,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    type: IHttpError,
  })
  async editSuggestion(
    @Param('id', MongoObjectIdPipe) id,
    @Body() createBlogDto: CreateSuggestionDto,
  ) {
    //return this._suggestionsService.editBlog(id, createBlogDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  @ApiNoContentResponse({
    description: 'Suggestion was successfully deleted.',
  })
  @ApiForbiddenResponse({
    description: 'You are not allowed to remove this suggestion.',
    type: IHttpError,
  })
  @ApiNotFoundResponse({
    description: 'Suggestion could not be found.',
    type: IHttpError,
  })
  async deleteSuggestion(
    @Session() session,
    @Param('id', MongoObjectIdPipe) id,
  ) {
    return this._suggestionsService.deleteSuggestion(id, session.user._id);
  }
}
