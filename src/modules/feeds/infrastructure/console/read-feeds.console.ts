import { Command, CommandRunner, Option } from 'nest-commander';
import { GetAllFeedsQuery } from '../../application/querys/get-all-feeds.query';
import { PostNewCommand } from '../../../news/application/commands/post-new.command';
import * as process from 'process';

@Command({ name: 'feeds:readAndSave', description: 'Read news from all feeds' })
export class ReadFeedsConsole extends CommandRunner {
  public constructor(
    private getAllFeedsQuery: GetAllFeedsQuery,
    private postNewCommand: PostNewCommand,
  ) {
    super();
  }
  public async run(): Promise<void> {
    const feeds = await this.getAllFeedsQuery.run();
    const feedsNews = [];
    const finalNews = [];
    for (const index in feeds) {
      const feed = feeds[index];
      await feed.initializeReader();
      feedsNews[feed.getId()] = await feed.read();
    }
    for (const feedId in feedsNews) {
      const news = feedsNews[feedId];
      for (const newData of news) {
        finalNews.push({
          ...newData,
          feed_id: feedId,
        });
      }
    }
    for (const newData of finalNews) {
      await this.postNewCommand.run(newData);
    }
    process.exit();
  }
}
