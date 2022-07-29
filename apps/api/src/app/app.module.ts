import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerConfig } from './config/server.config';
import { authModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    UsersModule,
    authModule,
    MongooseModule.forRoot(ServerConfig.NX_MONGODB_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
