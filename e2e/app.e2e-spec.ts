import { FlickrGalleryPage } from './app.po';

describe('flickr-gallery App', () => {
  let page: FlickrGalleryPage;

  beforeEach(() => {
    page = new FlickrGalleryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
