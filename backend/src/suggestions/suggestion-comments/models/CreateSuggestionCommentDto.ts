import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateSuggestionCommentDto {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  })
  @IsString()
  text: string;

  @ApiProperty({
    example: 'xxxxaidiaj-adsoasndoas-adsdinsad',
  })
  @IsMongoId()
  @IsOptional()
  responseTo: string;
}
