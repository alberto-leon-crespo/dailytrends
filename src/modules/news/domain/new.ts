export class New {
  private id?: string;
  private author: string;
  private title: string;
  private url: string;

  public constructor(id: string, author: string, title: string, url: string) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.url = url;
  }

  getId(): string {
    return this.id;
  }

  getAuthor(): string {
    return this.author;
  }

  getTitle(): string {
    return this.title;
  }

  getUrl(): string {
    return this.url;
  }
}
