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
    await this.browser.close();
    const news = [];
    for (const selectorId in this.selectors) {
      const selector = this.selectors[selectorId];
      const newsLength = selector.getValue().length;
      for (let i = 0; i <= newsLength - 1; i++) {
        if (news[i]) {
          if (news[i] && news[i][selector.getFieldName()]) {
            news[i][selector.getFieldName()] = selector.getValue()[i];
          } else if (news[i] && !news[i][selector.getFieldName()]) {
            news[i][selector.getFieldName()] = {};
            news[i][selector.getFieldName()] = selector.getValue()[i];
          }
        } else {
          news[i] = {};
          news[i][selector.getFieldName()] = {};
          news[i][selector.getFieldName()] = selector.getValue()[i];
        }
      }
    }
    return news;
  }
}
