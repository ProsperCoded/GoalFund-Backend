import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE_SYMBOL } from 'src/config/constants.config';
import { DrizzleDB, UserEntity } from 'src/types/db.types';
import { user as userSchema } from 'src/drizzle/schema/user.schema';
import { eq } from 'drizzle-orm';
import { AuthService } from 'src/auth/auth.service';
import { UserExistsException } from 'src/util/exceptions/EmailExistsException';
import { logger } from 'src/user/user.module';
import { UserNotFoundException } from 'src/util/exceptions/UserNotFoundException';

export const USER_EXCLUDE_FIELDS = ['password'];

@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE_SYMBOL) private db: DrizzleDB,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.findByEmail(createUserDto.email);
    if (exists) {
      throw new UserExistsException();
    }
    const password = createUserDto.password;
    createUserDto.password = await this.authService.hashPassword(password);
    const users = await this.db
      .insert(userSchema)
      .values([createUserDto])
      .returning();
    logger.debug('User created successfully');
    return users[0];
  }

  async findAll() {
    const users = await this.db.query.user.findMany({
      columns: {
        password: false,
      },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.db
      .update(userSchema)
      .set(updateUserDto)
      .where(eq(userSchema.id, id))
      .returning();
    logger.debug('User updated successfully');
    return updatedUser[0];
  }

  async remove(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    const deletedUser = await this.db
      .delete(userSchema)
      .where(eq(userSchema.id, id))
      .returning();
    return deletedUser[0];
  }

  async findById(id: string) {
    const user = await this.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    return user;
  }
}
