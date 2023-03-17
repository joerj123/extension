// Sets the icon and tooltip based on the isShopify status
function setIconAndTooltip(tabId, isShopify) {
    if (isShopify) {
      chrome.action.setIcon({ path: { 48: 'icon_active.png' }, tabId });
      chrome.action.setTitle({ title: 'This is a Shopify site', tabId });
    } else {
      chrome.action.setIcon({ path: { 48: 'icon.png' }, tabId });
      chrome.action.setTitle({ title: 'This is not a Shopify site', tabId });
    }
  }
  
  // Injects the content script into the specified tab
  function injectContentScript(tabId) {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        files: ['contentScript.js'],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          chrome.tabs.sendMessage(tabId, { action: 'getIsShopify' }, (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
            } else {
              setIconAndTooltip(tabId, response.isShopify);
            }
          });
        }
      }
    );
  }
  
  // Handles the getIsShopify message from the popup
  function getIsShopify(tabId, sendResponse) {
    chrome.tabs.sendMessage(tabId, { action: 'getIsShopify' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        sendResponse(response);
        setIconAndTooltip(tabId, response.isShopify);
      }
    });
  
    return true; // Keep the message channel open for the sendResponse callback
  }
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      injectContentScript(tabId);
    }
  });
  
  chrome.tabs.onActivated.addListener(({ tabId }) => {
    injectContentScript(tabId);
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getIsShopify') {
      return getIsShopify(sender.tab.id, sendResponse);
    }
  });
  