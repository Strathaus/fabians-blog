import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class MongoObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value))
      throw new BadRequestException(
        'URL parameter "id" should be a valid ObjectId',
      );
    return value;
  }
}
