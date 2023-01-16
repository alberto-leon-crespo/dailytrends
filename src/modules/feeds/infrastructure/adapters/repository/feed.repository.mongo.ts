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
          id: '63c37f6148f1f6e938e81793',
          name: 'El Pais',
          url: 'https://elpais.com/',
          selectors: {
            title: {
              query: 'section[data-dtm-region="portada_apertura"] h2 a',
              attribute: 'innerText',
            },
            author: {
              query: 'section[data-dtm-region="portada_apertura"] div.c_a',
              attribute: 'innerText',
            },
            link: {
              query: 'section[data-dtm-region="portada_apertura"] h2 a',
              attribute: 'href',
            },
          },
        },
        {
          id: '63c37f6248f1f6e938e81795',
          name: 'El Mundo',
          url: 'https://www.elmundo.es/',
          selectors: {
            title: {
              query: 'article[ue-article-id] .ue-c-cover-content__headline',
              attribute: 'innerText',
            },
            author: {
              query: 'article[ue-article-id] .ue-c-cover-content__byline-name',
              attribute: 'innerText',
            },
            link: {
              query: 'article[ue-article-id] .ue-c-cover-content__link',
              attribute: 'href',
            },
          },
        },
      ];
      for (const feed of feeds) {
        await this.createFeed(feed as unknown as Feed);
      }
    }
  }
}
