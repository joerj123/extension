
// Function to remove a saved site
function removeSite(index) {
    chrome.storage.sync.get('savedSites', (data) => {
      const savedSites = data.savedSites || [];
      savedSites.splice(index, 1);
      chrome.storage.sync.set({ savedSites }, () => {
        console.log('Site removed');
        displaySavedSites();
      });
    });
  }

  // Function to display saved sites
  function displaySavedSites() {
    const savedSitesList = document.getElementById('savedSitesList');
    savedSitesList.innerHTML = '';
  
    chrome.storage.sync.get('savedSites', (data) => {
      const savedSites = data.savedSites || [];
  
      savedSites.forEach((site, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = site.url;
  
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeSite(index));
  
        listItem.appendChild(removeButton);
        savedSitesList.appendChild(listItem);
      });
    });
  }
  
  displaySavedSites();
  