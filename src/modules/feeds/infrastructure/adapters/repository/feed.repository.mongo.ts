import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Optional } from 'typescript-optional';
import { FeedRepository } from '../../../domain/ports/feed.repository';
import { Feed } from '../../../domain/feed';
import FeedMapper from '../../mapper/feed.mapper';
import { Feed as FeedDefinition, FeedDocument } from '../schema/feed.schema';

@Injectable()
export class FeedRepositoryMongo implements FeedRepository {
  constructor(
    @InjectModel(FeedDefinition.name) private feedModel: Model<FeedDocument>,
  ) {
    (async () => await this.seedFeeds())();
  }

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

  public async seedFeeds() {
    const feeds = await this.feedModel.find();
    if (feeds.length < 1) {
      const feeds = [
        {
          id: '63c31203db86502ee44a34d0',
          name: 'El Pais',
          url: 'https://elpais.com/',
        },
        {
          id: '63c31219db86502ee44a34d2',
          name: 'El Mundo',
          url: 'https://www.elmundo.es/',
        },
      ];
      for (const feed of feeds) {
        await this.createFeed(feed as unknown as Feed);
      }
    }
  }
}
