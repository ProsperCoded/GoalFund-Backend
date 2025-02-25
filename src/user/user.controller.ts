import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppResponse } from 'src/types/config.types';
import { UserEntity } from 'src/types/db.types';

type UserResponseType = Promise<AppResponse<UserEntity>>;
type UsersResponseType = Promise<AppResponse<UserEntity[]>>;
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): UserResponseType {
    const user = await this.userService.create(createUserDto);
    return {
      message: 'User created successfully',
      data: user,
      status: 201,
      error: null,
    };
  }

  @Get()
  async findAll(): UsersResponseType {
    const users = (await this.userService.findAll()) as UserEntity[];
    return {
      message: 'Users fetched successfully',
      data: users,
      status: 200,
      error: null,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): UserResponseType {
    const user = await this.userService.findOne(id);
    return {
      message: 'User fetched successfully',
      data: user,
      status: 200,
      error: null,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserResponseType {
    const user = await this.userService.update(id, updateUserDto);
    return {
      message: 'User updated successfully',
      data: user,
      status: 200,
      error: null,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): UserResponseType {
    const user = await this.userService.remove(id);
    return {
      message: 'User deleted successfully',
      data: user,
      status: 200,
      error: null,
    };
  }
}
