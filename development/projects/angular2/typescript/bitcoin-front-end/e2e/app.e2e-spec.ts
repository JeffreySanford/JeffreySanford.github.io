import { MainPagePage } from './app.po';

describe('main-page App', function() {
  let page: MainPagePage;

  beforeEach(() => {
    page = new MainPagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('jeffrey works!');
  });
});
