import { InmobiliarioPage } from './app.po';

describe('inmobiliario App', function() {
  let page: InmobiliarioPage;

  beforeEach(() => {
    page = new InmobiliarioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
