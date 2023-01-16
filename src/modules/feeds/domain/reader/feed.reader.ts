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
          selectors[selectorName].attribute,
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
    const list: any = {};
    for (const index in this.selectors) {
      const selectorQuery = this.selectors[index].getCssQuery();
      const fieldName = this.selectors[index].getFieldName();
      const fieldAttribute = this.selectors[index].getAttribute();
      list[fieldName] = await this.page.evaluate(
        (selectorQuery, fieldAttribute) => {
          return Array.from(
            document.querySelectorAll(selectorQuery),
            (ele: HTMLElement) => ele[fieldAttribute],
          );
        },
        selectorQuery,
        fieldAttribute,
      );
      this.selectors[index].setValue(list[fieldName]);
    }
    console.log(list);
    await this.browser.close();
    return this.selectors;
  }
}
