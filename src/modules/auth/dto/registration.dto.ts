import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { CreateAccountDto } from 'src/modules/accounts/dto/create-account.dto';

export class RegistrationDto extends CreateAccountDto {
  @ApiProperty({
    example: 'APOsdjpqdj109djq0pwodqp',
    description: 'Регистрационный код',
  })
  @IsNotEmpty({ message: 'Должно быть заполнено' })
  @IsString({ message: 'Должен быть строкой' })
  @Length(24, 24, { message: 'Должен быть длиной 24 символа' })
  readonly code: string;
}
