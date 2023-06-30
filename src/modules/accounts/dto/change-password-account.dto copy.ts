import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordAccountDto {
  @ApiProperty({ example: '123123', description: 'Пароль' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должен быть строкой' })
  @Length(6, 32, { message: 'Должен быть от 6 до 32 символов' })
  readonly password: string;

  @ApiProperty({ example: '123123', description: 'Пароль' })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должен быть строкой' })
  @Length(6, 32, { message: 'Должен быть от 6 до 32 символов' })
  readonly newPassword: string;
}
