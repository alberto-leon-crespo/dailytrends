import { Injectable } from '@nestjs/common';
import { Feed } from '../../domain/feed';
import { UsecaseInterface } from '../../../app/application/usecase.interface';
import { FeedRepositoryMongo } from '../../infrastructure/adapters/repository/feed.repository.mongo';

@Injectable()
export class GetAllFeedsQuery implements UsecaseInterface {
  public constructor(private feedRepository: FeedRepositoryMongo) {}

  public run(): Promise<Feed[]> {
    return this.feedRepository.getAll();
  }
}
