import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { GetAllFeedsQuery } from '../../application/querys/get-all-feeds.query';
import { GetFeedByIdQuery } from '../../application/querys/get-feed-by-id.query';

@Controller('feeds')
export class FeedController {
  public constructor(
    private getAllFeedsUsecase: GetAllFeedsQuery,
    private getFeedByIdQuery: GetFeedByIdQuery,
  ) {}
  @Get()
  public async getFeeds(@Res() request): Promise<any> {
    const feeds = await this.getAllFeedsUsecase.run();
    return request.status(HttpStatus.OK).json(feeds);
  }

  @Get('/:id')
  public async getFeedById(
    @Res() request,
    @Param('id') id: string,
  ): Promise<any> {
    const feed = await this.getFeedByIdQuery.run(id);
    return request.status(HttpStatus.OK).json(feed);
  }
}
