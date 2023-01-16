import puppeteer, { Browser, Page } from 'puppeteer';
import { CssSelector } from './selectors/css.selector';
import { FeedSelectors } from '../feed.selectors';

export abstract class FeedReader {
  private browser: Browser;
  private page: Page;
  private selectors: CssSelector[] = [];
  protected constructor(protected url: string, selectors: FeedSelectors) {
    for (const selectorName in selectors) {
      this.selectors.push(
        new CssSelector(
          selectors[selectorName].query,
          selectorName,
          selectors[selectorName].attributes,
        ),
      );
    }
  }

  public async initializeReader() {
    this.browser = await puppeteer.launch({ headless: false });
    this.page = await this.browser.newPage();
    await this.page.goto(this.url);
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
