import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  let logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  
  const config = new DocumentBuilder()
      .setTitle('sso')
      .setDescription('app design for administrator and better experience user')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    
    logger.log("Inicio de la aplicacion");
    logger.warn(`Conexion a la base de datos`);
    logger.debug(`host: ${process.env.DB_HOST},
      port: ${+process.env.DB_PORT},
      database: ${process.env.DB_NAME},
      username: ${process.env.DB_USERNAME},
      password: ${process.env.DB_PASSWORD}`);
      logger.verbose("Variables de la conexion, se deben de quitar en producción");
      logger.error("----------------------------------------------------------");
      await app.listen(3000);
    }


bootstrap();
