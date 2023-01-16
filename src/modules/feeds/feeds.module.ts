import { Module } from '@nestjs/common';
import { FeedController } from './infrastructure/controllers/feed.controller';
import { FeedRepositoryMongo } from './infrastructure/adapters/repository/feed.repository.mongo';
import {
  Feed as FeedModel,
  FeedSchema,
} from './infrastructure/adapters/schema/feed.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GetAllFeedsQuery } from './application/querys/get-all-feeds.query';
import { GetFeedByIdQuery } from './application/querys/get-feed-by-id.query';
import { PostFeedCommand } from './application/commands/post-feed.command';
import { DeleteFeedCommand } from './application/commands/delete-feed.command';
import { PutFeedCommand } from './application/commands/put-feed.command';
import { ReadFeedsConsole } from './infrastructure/console/read-feeds.console';
import { NewsModule } from '../news/news.module';
import { SeedFeedsConsole } from './infrastructure/console/seed-feeds.console';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FeedModel.name, schema: FeedSchema }]),
    NewsModule,
  ],
  controllers: [FeedController],
  providers: [
    FeedModel,
    FeedRepositoryMongo,
    GetAllFeedsQuery,
    GetFeedByIdQuery,
    PostFeedCommand,
    DeleteFeedCommand,
    PutFeedCommand,
    ReadFeedsConsole,
    SeedFeedsConsole,
  ],
  exports: [FeedRepositoryMongo, MongooseModule],
})
export class FeedsModule {}
