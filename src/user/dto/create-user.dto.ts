import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  @Length(8, 20)
  // @Matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //   {
  //     message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  //   }
  // )
  password: string;

  @IsString()
  @Length(1, 50)
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Matches(/^\+?[1-9]\d{9,14}$/, {
    message: 'Phone number must be a valid international format',
  })
  phoneNumber: string;
}
