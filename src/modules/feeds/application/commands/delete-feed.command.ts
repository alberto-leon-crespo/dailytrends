import { Injectable } from '@nestjs/common';
import { Feed } from '../../domain/feed';
import { UsecaseInterface } from '../../../app/application/usecase.interface';
import { FeedRepositoryMongo } from '../../infrastructure/adapters/repository/feed.repository.mongo';
import { Optional } from 'typescript-optional';

@Injectable()
export class DeleteFeedCommand implements UsecaseInterface {
  public constructor(private feedRepository: FeedRepositoryMongo) {}

  public run(id: string): Promise<Optional<Feed>> {
    return this.feedRepository.deleteFeed(id);
  }
}
