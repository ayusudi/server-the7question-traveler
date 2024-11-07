import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('The 7 Question Traveler')
    .setDescription(
      'Aims to raise awareness among travelers going to the Asia-Pacific (APAC) region, focusing on understanding safety, visa requirements, red-light districts, weather, recommended souvenirs, and local food.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
