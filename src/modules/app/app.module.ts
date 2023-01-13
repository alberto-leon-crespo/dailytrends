import { Module } from '@nestjs/common';
import { FeedsModule } from '../feeds/feeds.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Configs
import databaseConfig from './infrastructure/config/database.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    FeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
