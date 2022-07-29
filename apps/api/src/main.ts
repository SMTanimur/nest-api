/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as MongoDBStore from 'connect-mongodb-session';
import session = require('express-session');
import passport = require('passport');
import { AppModule } from './app/app.module';
import { ServerConfig } from './app/config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const MongoStore = MongoDBStore(session);

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Zajed - Social Media Platform')
    .setDescription('The Zajed API description')
    .setVersion('1.0')
    .addServer('http://localhost:3333/api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Express session configuration
  app.use(
    session({
      secret: ServerConfig.NX_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 7 days
      },
      store: new MongoStore({
        uri: ServerConfig.NX_MONGODB_URI,
        collection: 'sessions',
        expires: 30 * 24 * 60 * 60 * 1000, // 7 days
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
   app.useGlobalPipes( new ValidationPipe({whitelist:true}))
  app.setGlobalPrefix(globalPrefix);
  const port = ServerConfig.NX_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
