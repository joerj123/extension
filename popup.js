chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: 'getIsShopify' }, (response) => {
      const titleEl = document.getElementById('title');
      const messageEl = document.getElementById('message');
  
      if (response && response.isShopify) {
        titleEl.innerText = 'This is a Shopify site';
        titleEl.className = 'positive';
        messageEl.innerText = 'The current website uses the Shopify platform.';
      } else {
        titleEl.innerText = 'This is not a Shopify site';
        titleEl.className = 'negative';
        messageEl.innerText = 'The current website does not use the Shopify platform.';
      }
    });
  });

// Listen for clicks on buttons
 
document.getElementById('saveButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.runtime.sendMessage({ action: 'saveSite', tabId: tabs[0].id });
  });
});

document.getElementById('viewSavedButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'viewSavedSites' });
});
