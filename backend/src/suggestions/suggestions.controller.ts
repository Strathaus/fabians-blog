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
import { AuthenticationGuard } from '@src/guards/authentication.guard';
import { IHttpError } from '@src/models/http-error.interface';
import { MongoObjectIdPipe } from '@src/pipes/mongo-object-id.pipe';
import { CreateSuggestionDto } from '@src/suggestions/models/CreateSuggestionDto';
import { Suggestion } from '@src/suggestions/models/suggestion.model';
import { SuggestionsService } from '@src/suggestions/suggestions.service';

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
    description: 'Successfully fetched suggestions',
  })
  async getBestSuggestions(@Session() session, @Query('skip') skip: number) {
    return this._suggestionsService.getBestSuggestions({
      userId: session.user._id,
      skip,
    });
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Successfully fetched suggestion',
    type: Suggestion,
  })
  async getSuggestion(
    @Session() session,
    @Param('id', MongoObjectIdPipe) id: string,
  ) {
    return this._suggestionsService.getSuggestion(id);
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
    @Session() session,
    @Param('id', MongoObjectIdPipe) id,
    @Body() editSuggestionDto: CreateSuggestionDto,
  ) {
    return this._suggestionsService.editSuggestion(
      id,
      editSuggestionDto,
      session.user._id,
    );
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

  @Post(':id/like')
  @UseGuards(AuthenticationGuard)
  @ApiOkResponse({
    description: 'Suggestion was successfully liked.',
    type: Number,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    type: IHttpError,
  })
  async likeSuggestion(@Session() session, @Param('id', MongoObjectIdPipe) id) {
    return this._suggestionsService.likeSuggestionAndReturnLikes(
      id,
      session.user._id,
    );
  }

  @Delete(':id/like')
  @UseGuards(AuthenticationGuard)
  @ApiOkResponse({
    description: 'Like was successfully removed.',
    type: Number,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    type: IHttpError,
  })
  async removeLikeSuggestion(
    @Session() session,
    @Param('id', MongoObjectIdPipe) id,
  ) {
    return this._suggestionsService.removeLikeSuggestionAndReturnLikes(
      id,
      session.user._id,
    );
  }
}
