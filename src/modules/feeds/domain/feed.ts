import { FeedSelectors } from './feed.selectors';

export class Feed {
  private id?: string;
  private name: string;
  private url: string;
  private selectors: FeedSelectors;

  public constructor(
    id: string,
    name: string,
    url: string,
    selectors: FeedSelectors,
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.selectors = selectors;
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
