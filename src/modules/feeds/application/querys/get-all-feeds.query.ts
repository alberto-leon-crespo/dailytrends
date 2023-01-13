import { Injectable, Inject } from '@nestjs/common';
import { Feed } from '../../domain/feed';
import { FeedEntityRepository } from '../../domain/ports/feed.repository';
import { UsecaseInterface } from '../../../app/application/usecase.interface';

@Injectable()
export class GetAllFeedsQuery implements UsecaseInterface {
  public constructor(
    @Inject('FeedEntityRepository')
    private feedEntityRepository: FeedEntityRepository,
  ) {}

  public run(): Promise<Feed[]> {
    return this.feedEntityRepository.getAll();
  }
}
