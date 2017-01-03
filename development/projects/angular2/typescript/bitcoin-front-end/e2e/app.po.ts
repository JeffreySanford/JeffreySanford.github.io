import { browser, element, by } from 'protractor';

export class MainPagePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('jeffrey-root h1')).getText();
  }
}
