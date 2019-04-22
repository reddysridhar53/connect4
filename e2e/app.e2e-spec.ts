import { Connect4Page } from './app.po';

describe('connect4 App', () => {
  let page: Connect4Page;

  beforeEach(() => {
    page = new Connect4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
