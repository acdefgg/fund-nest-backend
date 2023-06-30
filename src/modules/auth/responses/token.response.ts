import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty({
    example: 'asdq290jd1pdosadlasdq',
    description: 'Авторизационный токен',
  })
  token: string;
}
