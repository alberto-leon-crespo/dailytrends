import { Injectable } from '@nestjs/common';
import { Feed } from '../../domain/feed';
import { UsecaseInterface } from '../../../app/application/usecase.interface';
import { FeedRepositoryMongo } from '../../infrastructure/adapters/repository/feed.repository.mongo';
import { Optional } from 'typescript-optional';

@Injectable()
export class PostFeedCommand implements UsecaseInterface {
  public constructor(private feedRepository: FeedRepositoryMongo) {}

  public run(feed: Feed): Promise<Optional<Feed>> {
    return this.feedRepository.createFeed(feed);
  }
}
