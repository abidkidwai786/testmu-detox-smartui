import { by, device, element, expect } from 'detox';

import { visualSnapshot } from './smartui';

describe('Example (goodbye)', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show goodbye screen after tap', async () => {
    await new Promise(resolve => setTimeout(resolve, 10000));
    await element(by.id('goodbye_button')).tap();
    await expect(element(by.text('Goodbye, World!!!'))).toBeVisible();
    await visualSnapshot('goodbye-screen');
  });
});
