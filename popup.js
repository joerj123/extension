// Get the save button element
const saveButton = document.getElementById('saveButton');

// Get the message element
const messageEl = document.getElementById('message');

// Hide the save button and message element by default
saveButton.style.display = 'none';

// Get the active tab and send a message to check if it's a Shopify site
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, { action: 'getIsShopify' }, (response) => {
    if (response && response.isShopify) {
      // Show the save button and message element if it's a Shopify site
      saveButton.style.display = 'block';

      messageEl.innerText = 'This is a Shopify site.';

      // When the save button is clicked, send a message to save the site
      saveButton.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.runtime.sendMessage({ action: 'saveSite', tabId: tabs[0].id }, () => {
            messageEl.innerText = 'Site saved.';
          });
        });
      });
    } else {
      messageEl.innerText = 'This is not a Shopify site.';
    }
  });
});

// Get the view saved button element and add a click event listener to it
const viewSavedButton = document.getElementById('viewSavedButton');
viewSavedButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'viewSavedSites' });
});
