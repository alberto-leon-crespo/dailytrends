import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { GetAllFeedsQuery } from '../../application/querys/get-all-feeds.query';
import { GetFeedByIdQuery } from '../../application/querys/get-feed-by-id.query';
import { CreateFeedDto } from '../dtos/create-feed.dto';
import { PostFeedCommand } from '../../application/commands/post-feed.command';
import { Feed } from '../../domain/feed';
import { DeleteFeedCommand } from '../../application/commands/delete-feed.command';
import { UpdateFeedDto } from '../dtos/update-feed.dto';
import { PutFeedCommand } from '../../application/commands/put-feed.command';

@Controller('feeds')
export class FeedController {
  public constructor(
    private getAllFeedsUsecase: GetAllFeedsQuery,
    private getFeedByIdQuery: GetFeedByIdQuery,
    private postFeedCommand: PostFeedCommand,
    private deleteFeedCommand: DeleteFeedCommand,
    private putFeedCommand: PutFeedCommand,
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
  public async createFeed(
    @Res() request,
    @Body() feed: CreateFeedDto,
  ): Promise<any> {
    const feedCreated = await this.postFeedCommand.run(feed as unknown as Feed);
    return request.status(HttpStatus.CREATED).json(feedCreated);
  }

  @Delete('/:id')
  public async deleteFeed(
    @Res() request,
    @Param('id') id: string,
  ): Promise<any> {
    const feed = await this.deleteFeedCommand.run(id);
    return request.status(HttpStatus.NO_CONTENT).json(feed);
  }

  @Put('/:id')
  public async updateFeed(
    @Res() request,
    @Param('id') id: string,
    @Body() feed: UpdateFeedDto,
  ): Promise<any> {
    const feedUpdated = await this.putFeedCommand.run(
      id,
      feed as unknown as Feed,
    );
    return request.status(HttpStatus.OK).json(feedUpdated);
  }
}
