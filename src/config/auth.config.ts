import { registerAs } from '@nestjs/config';
export default registerAs('auth', () => ({
  saltRounds: process.env.BCRYPT_SALT_ROUNDS,
}));
