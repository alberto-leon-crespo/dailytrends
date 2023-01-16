import { Module } from '@nestjs/common';
import { NewController } from './infrastructure/controllers/new.controller';
import { NewRepositoryMongo } from './infrastructure/adapters/repository/new.repository.mongo';
import {
  New as NewModel,
  NewSchema,
} from './infrastructure/adapters/schema/new.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostNewCommand } from './application/commands/post-new.command';
import { GetAllNewsQuery } from './application/querys/get-all-news.query';
import {
  Feed as FeedModel,
  FeedSchema,
} from '../feeds/infrastructure/adapters/schema/feed.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NewModel.name, schema: NewSchema },
      { name: FeedModel.name, schema: FeedSchema },
    ]),
  ],
  controllers: [NewController],
  providers: [NewModel, NewRepositoryMongo, PostNewCommand, GetAllNewsQuery],
  exports: [NewRepositoryMongo, MongooseModule, PostNewCommand],
})
export class NewsModule {}
