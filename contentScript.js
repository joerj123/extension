chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getIsShopify') {
    const cdnRegex = /cdn\.shopify\.com/gi;
    const matches = document.documentElement.innerHTML.match(cdnRegex);
    const isShopify = matches && matches.length >= 20;
    const result = isShopify || document.documentElement.innerHTML.includes('Shopify.theme');
    sendResponse({ isShopify: result });
  }
});
