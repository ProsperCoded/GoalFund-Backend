import { HttpException, HttpStatus } from '@nestjs/common';
import { USER_NOT_FOUND } from '../../config/exceptions.config';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
