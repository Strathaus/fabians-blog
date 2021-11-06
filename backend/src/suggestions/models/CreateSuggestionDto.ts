import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSuggestionDto {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  })
  @IsString()
  description: string;
}
