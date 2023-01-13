import { Module } from '@nestjs/common';
import { FeedController } from './infrastructure/controllers/feed.controller';
import FeedRepositoryMongo from './infrastructure/adapters/repository/feed.repository.mongo';
import { GetAllFeedsQuery } from './application/querys/get-all-feeds.query';

@Module({
  imports: [],
  controllers: [FeedController],
  providers: [FeedRepositoryMongo],
  exports: [FeedRepositoryMongo, GetAllFeedsQuery],
})
export class FeedsModule {}
