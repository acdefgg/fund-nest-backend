import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = {
    protocol: process.env.WEBSERVER_PROTOCOL || 'http',
    host: process.env.WEBSERVER_HOST || 'localhost',
    port: process.env.WEBSERVER_PORT || 3001,
  };

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });

  const documentationConfig = new DocumentBuilder()
    .setTitle('Fund API')
    .setDescription('REST API для веб-приложения')
    .setVersion('1.0.0')
    .build();
  const documentation = SwaggerModule.createDocument(app, documentationConfig);
  SwaggerModule.setup('/docs', app, documentation);

  await app.listen(config.port, () => {
    console.log(
      `Server started on ${config.protocol}://${config.host}:${config.port}`,
    );
    console.log(
      `Documentation started on ${config.protocol}://${config.host}:${config.port}/docs`,
    );
  });
}
bootstrap();
