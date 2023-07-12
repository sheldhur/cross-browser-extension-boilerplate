import { config } from '@common/config';

console.log(`Service worker`, config);

chrome.storage.local.onChanged.addListener((changes) => {
  console.log('Storage changed', changes);
})
