import { RuckAppPage } from './app.po';

describe('ruck-app App', function() {
  let page: RuckAppPage;

  beforeEach(() => {
    page = new RuckAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
