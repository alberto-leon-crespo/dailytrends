// Modules
import { Module } from '@nestjs/common';
import { FeedsModule } from '../feeds/feeds.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// Configs
import databaseConfig from './infrastructure/config/database.config';
import app from './infrastructure/config/app.config';
// Services
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('database.uri'),
          dbName: configService.get<string>('database.database'),
        };
      },
      inject: [ConfigService],
    }),
    FeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
