import { AppPage } from './app.po';
const absolutePath = require('path').resolve('./e2e/test.mp4');
import { reset } from '../server/';

describe('uploader App', () => {
  let page: AppPage;
  page = new AppPage();

  it('should have input type=file', () => {
    page.navigateTo('/directive-way');
    expect(page.getFileInput().isPresent()).toBe(true);
  });
  it('should have table', () => {
    expect(page.getTable().isPresent()).toBe(true);
    expect(page.getPreText()).toEqual('null');
  });
  it('should upload a file (Directive)', () => {
    reset();
    page.getFileInput().sendKeys(absolutePath);
    expect(page.waitForComplete()).toEqual('complete');
    reset();
  });

  it('should upload a file (Mixed)', () => {
    page.navigateTo('/service-way');
    page.getFileInput().sendKeys(absolutePath);
    expect(page.waitForComplete()).toEqual('complete');
    reset();
  });

  it('should upload a file (Service)', () => {
    page.navigateTo('/service-code-way');
    page.getFileInput().sendKeys(absolutePath);
    expect(page.waitForComplete()).toEqual('complete');
    reset();
  });

  it('should upload a file (onPush)', () => {
    page.navigateTo('/on-push');
    page.getFileInput().sendKeys(absolutePath);
    expect(page.waitForCompleteTable()).toEqual('complete');
    reset();
  });
});
