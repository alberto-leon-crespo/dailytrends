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

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FeedModel.name, schema: FeedSchema }]),
  ],
  controllers: [FeedController],
  providers: [
    FeedModel,
    FeedRepositoryMongo,
    GetAllFeedsQuery,
    GetFeedByIdQuery,
  ],
  exports: [FeedRepositoryMongo, MongooseModule],
})
export class FeedsModule {}
