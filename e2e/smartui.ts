import * as fs from 'fs';
import * as path from 'path';

import { device } from 'detox';

/**
 * SmartUI visual-check helper for Detox.
 *
 * Captures a named screenshot via Detox's native `device.takeScreenshot` and
 * copies it into a deterministic folder (`smartui-screenshots/` at the repo
 * root) so the SmartUI CLI can upload the whole folder in one post-test step:
 *
 *     npx smartui upload ./smartui-screenshots
 *
 * Capture only happens when VISUAL is set, so normal Detox runs are untouched.
 * SmartUI uploads carry no device metadata, so when SMARTUI_DEVICE_TAG is set
 * the tag is appended to each file name (e.g. `welcome-pixel7-android13.png`),
 * keeping baselines separate per device model.
 */

const OUT_DIR = path.resolve(process.cwd(), 'smartui-screenshots');
const DEVICE_TAG = process.env.SMARTUI_DEVICE_TAG || '';
const ENABLED = Boolean(process.env.VISUAL);

export async function visualSnapshot(name: string): Promise<void> {
  if (!ENABLED) {
    return;
  }

  // Detox returns the temp path of the captured screenshot. It is valid for the
  // duration of the test, so copy it out immediately regardless of the
  // artifacts plugin's keep/discard policy.
  const tempPath = await device.takeScreenshot(name);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const fileName = DEVICE_TAG ? `${name}-${DEVICE_TAG}.png` : `${name}.png`;
  fs.copyFileSync(tempPath, path.join(OUT_DIR, fileName));
}
