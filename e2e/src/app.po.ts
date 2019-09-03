import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root span a')).getText() as Promise<string>;
  }

  getAuthorName() {
    return element(by.css('body app-root mat-toolbar span a span')).getText() as Promise<string>;
  }
}
