import { Module } from '@nestjs/common';
import { FeedController } from './infrastructure/controllers/feed.controller';
import { FeedRepositoryMongo } from './infrastructure/adapters/repository/feed.repository.mongo';
import {
  Feed as FeedModel,
  FeedSchema,
} from './infrastructure/adapters/schema/feed.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GetAllFeedsQuery } from './application/querys/get-all-feeds.query';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: FeedModel.name, schema: FeedSchema }]),
  ],
  controllers: [FeedController],
  providers: [FeedModel, FeedRepositoryMongo, GetAllFeedsQuery],
  exports: [FeedRepositoryMongo, MongooseModule],
})
export class FeedsModule {}
