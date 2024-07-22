import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Proyecto de Salud')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addTag('auth') // Puedes agregar más etiquetas según sea necesario
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' es la ruta base para acceder a Swagger

  await app.listen(3000);
}
bootstrap();
