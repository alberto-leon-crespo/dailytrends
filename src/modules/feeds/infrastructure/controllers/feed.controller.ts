import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { GetAllFeedsQuery } from '../../application/querys/get-all-feeds.query';

@Controller('feeds')
export class FeedController {
  public constructor(private getAllFeedsUsecase: GetAllFeedsQuery) {}
  @Get()
  public async getFeeds(@Res() request): Promise<any> {
    const feeds = await this.getAllFeedsUsecase.run();
    return request.status(HttpStatus.OK).json(feeds);
  }
}
