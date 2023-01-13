import { Optional } from 'typescript-optional';
import { Feed } from '../../domain/feed';
import { FeedEntity } from '../adapters/entity/feed.entity';

export default class FeedMapper {
  public static toDomain(feedEntity: FeedEntity): Optional<Feed> {
    if (!feedEntity) {
      return Optional.empty<Feed>();
    }
    const feed = new Feed(feedEntity.id, feedEntity.name, feedEntity.url);
    return Optional.of(feed);
  }

  public static toDomains(feedEntities: FeedEntity[]): Feed[] {
    const feeds = new Array<Feed>();
    feedEntities.forEach((feedEntity) => {
      const feed = this.toDomain(feedEntity);
      feeds.push(feed.get());
    });
    return feeds;
  }
}
