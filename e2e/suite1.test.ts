import { by, device, element, expect } from 'detox';

import { visualSnapshot } from './smartui';

describe('Test suite 1', () => {
  beforeAll(async () => {
    await device.relaunchApp();
  });

  it('should have welcome screen', async () => {
    await new Promise(resolve => setTimeout(resolve, 10000));
    await expect(element(by.id('welcome'))).toBeVisible();
    await visualSnapshot('welcome-screen');
  });

  it('should show hello screen after tap', async () => {
    await new Promise(resolve => setTimeout(resolve, 10000));
    await element(by.id('hello_button')).tap();
    await expect(element(by.text('Hello!!!'))).toBeVisible();
    await visualSnapshot('hello-screen');
  });
});
