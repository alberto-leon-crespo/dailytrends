import { FeedSelectors } from './feed.selectors';
import { FeedReader } from './reader/feed.reader';

export class Feed extends FeedReader {
  private id?: string;
  private name: string;
  protected url: string;

  public constructor(
    id: string,
    name: string,
    url: string,
    selectors: FeedSelectors,
  ) {
    super(url, selectors);
    this.id = id;
    this.name = name;
    this.url = url;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  public getUrl(): string {
    return this.url;
  }
}
