import { Inject, Injectable } from '@nestjs/common';
// Change this line
import * as bcrypt from 'bcryptjs'; // ESM compatible import
import authConfig from 'src/config/auth.config';
import { ConfigType } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  async hashPassword(password: string) {
    const hashSalt = await bcrypt.genSalt(parseInt(this.config.saltRounds));
    return await bcrypt.hash(password, hashSalt);
  }
}
