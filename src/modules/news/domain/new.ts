export class New {
  private readonly _id?: string;
  private readonly _author: string;
  private readonly _title: string;
  private readonly _url: string;

  public constructor(id: string, author: string, title: string, url: string) {
    this._id = id;
    this._author = author;
    this._title = title;
    this._url = url;
  }

  getId(): string {
    return this._id;
  }

  getAuthor(): string {
    return this._author;
  }

  getTitle(): string {
    return this._title;
  }

  getUrl(): string {
    return this._url;
  }
}
