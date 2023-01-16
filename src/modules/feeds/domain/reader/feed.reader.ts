import puppeteer, { Browser, Page } from 'puppeteer';
import { CssSelector } from './selectors/css.selector';

export abstract class FeedReader {
  private browser: Browser;
  private page: Page;
  protected constructor(
    private url: string,
    private selectors: CssSelector[],
  ) {}

  public async initializeReader() {
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await this.browser.newPage();
    await this.page.goto(this.url);
  }

  public getUrl() {
    return this.url;
  }

  public getSelectors() {
    return this.selectors;
  }

  public async read(): Promise<CssSelector[]> {
    return await this.page.evaluate(() => {
      for (const selector of this.selectors) {
        const item: Element = document.querySelector(selector.getCssQuery());
        selector.setValue(item.innerHTML);
      }
      return this.selectors;
    });
  }
}
