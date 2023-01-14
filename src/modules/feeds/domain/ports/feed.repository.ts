import { Feed } from '../feed';
import { Optional } from 'typescript-optional';

export interface FeedRepository {
  getAll(): Promise<Feed[]>;

  /**
   * Returns feed filtered by id
   * @returns a `Feed` object containing the data.
   * @param id string
   */
  getFeed(id: string): Promise<Optional<Feed>>;

  createFeed(feed: Feed): Promise<Optional<Feed>>;

  deleteFeed(feedId: string): Promise<Optional<Feed>>;

  updateFeed(productId: string, product: Feed): Promise<Optional<Feed>>;
}
