import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Optional } from 'typescript-optional';
import { FeedEntityRepository } from '../../../domain/ports/feed.repository';
import { Feed } from '../../../domain/feed';
import FeedMapper from '../../mapper/feed.mapper';
import { FeedEntity } from '../entity/feed.entity';

@Injectable()
export default class FeedRepositoryMongo implements FeedEntityRepository {
  constructor(
    @InjectModel('FeedEntity')
    private readonly feedModel: Model<FeedEntity>,
  ) {}

  public async getAll(): Promise<Feed[]> {
    const feeds = await this.feedModel.find();
    return FeedMapper.toDomains(feeds);
  }

  public async createFeed(feed: Feed): Promise<Optional<Feed>> {
    let feedCreated = new this.feedModel(feed);
    feedCreated = await feedCreated.save();
    return FeedMapper.toDomain(feedCreated);
  }

  public async getFeed(feedId: string): Promise<Optional<Feed>> {
    const feed = await this.feedModel.findById(feedId);
    return FeedMapper.toDomain(feed);
  }

  public async deleteFeed(feedId: string): Promise<Optional<Feed>> {
    const feedDeleted = await this.feedModel.findByIdAndDelete(feedId);
    return FeedMapper.toDomain(feedDeleted);
  }

  public async updateFeed(feedId: string, feed: Feed): Promise<Optional<Feed>> {
    const feedUpdated = await this.feedModel.findByIdAndUpdate(feedId, feed, {
      new: true,
    });
    return FeedMapper.toDomain(feedUpdated);
  }
}
