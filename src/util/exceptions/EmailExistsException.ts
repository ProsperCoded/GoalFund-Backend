import { HttpException, HttpStatus } from '@nestjs/common';
import { USER_ALREADY_EXISTS } from '../../config/exceptions.config';

export class UserExistsException extends HttpException {
  constructor() {
    super(USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
  }
}
