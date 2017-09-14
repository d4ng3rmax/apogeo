import { ApogeoPage } from './app.po';

describe('apogeo App', () => {
  let page: ApogeoPage;

  beforeEach(() => {
    page = new ApogeoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
