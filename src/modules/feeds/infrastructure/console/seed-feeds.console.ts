import { Command, CommandRunner, Option } from 'nest-commander';
import * as process from 'process';
import { FeedRepositoryMongo } from '../adapters/repository/feed.repository.mongo';

@Command({
  name: 'feeds:seed',
  description: 'Seed Feeds collection with initial basic information',
})
export class SeedFeedsConsole extends CommandRunner {
  public constructor(private feedRepositoryMongo: FeedRepositoryMongo) {
    super();
  }
  public async run(): Promise<void> {
    const feeds = await this.feedRepositoryMongo.seedFeeds();
    process.exit();
  }
}
