import { ApiProperty } from '@nestjs/swagger';

export class IHttpError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
