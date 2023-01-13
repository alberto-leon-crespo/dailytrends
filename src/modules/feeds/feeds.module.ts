import { Module } from '@nestjs/common';
import { FeedController } from './infrastructure/controllers/feed.controller';

@Module({
  imports: [],
  controllers: [FeedController],
  providers: [],
})
export class FeedsModule {}
