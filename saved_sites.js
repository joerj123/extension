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
    const savedSitesTable = document.getElementById('savedSitesTable');
    const tbody = savedSitesTable.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
  
    chrome.storage.sync.get('savedSites', (data) => {
      const savedSites = data.savedSites || [];
  
      savedSites.forEach((site, index) => {
        const row = document.createElement('tr');
  
        const titleCell = document.createElement('td');
        titleCell.textContent = site.title;
        row.appendChild(titleCell);
  
        const url = new URL(site.url);
        const domainCell = document.createElement('td');
        domainCell.textContent = url.hostname;
        row.appendChild(domainCell);
  
        const linkCell = document.createElement('td');
        const link = document.createElement('a');
        link.href = site.url;
        link.textContent = site.url;
        link.target = '_blank';
        linkCell.appendChild(link);
        row.appendChild(linkCell);
  
        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeSite(index));
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);
  
        tbody.appendChild(row);
      });
    });
  }
  
  // Display the saved sites on page load
  displaySavedSites();
  
  // Add click event listener to the download CSV button
  const downloadCsvButton = document.getElementById('downloadCsvButton');
  downloadCsvButton.addEventListener('click', () => {
    chrome.storage.sync.get('savedSites', (data) => {
      const savedSites = data.savedSites || [];
  
      // Create a CSV file as a string
      let csv = 'Title,Domain,Link\n';
      savedSites.forEach((site) => {
        csv += `${site.title},${new URL(site.url).hostname},${site.url}\n`;
      });
  
      // Create a temporary link element and click it to download the CSV file
      const link = document.createElement('a');
      link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      link.download = 'saved_sites.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
  