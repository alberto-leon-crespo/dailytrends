import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { GetAllFeedsQuery } from '../../application/querys/get-all-feeds.query';
import { GetFeedByIdQuery } from '../../application/querys/get-feed-by-id.query';
import { CreateFeedDto } from '../dtos/feed.dto';
import { PostFeedCommand } from '../../application/commands/post-feed.command';
import { Feed } from '../../domain/feed';

@Controller('feeds')
export class FeedController {
  public constructor(
    private getAllFeedsUsecase: GetAllFeedsQuery,
    private getFeedByIdQuery: GetFeedByIdQuery,
    private postFeedCommand: PostFeedCommand,
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

  @Post()
  public async createProduct(
    @Res() request,
    @Body() feed: CreateFeedDto,
  ): Promise<any> {
    const productCreated = await this.postFeedCommand.run(
      feed as unknown as Feed,
    );
    return request.status(HttpStatus.CREATED).json(productCreated);
  }
}
