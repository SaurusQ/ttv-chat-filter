
document.getElementById('enableFilter').addEventListener('change', (event) => {
  const enabled = event.target.checked
  chrome.storage.sync.set({ enableFilter: enabled }, function() {
    console.log('Extension ' + (enabled ? 'enabled' : 'disabled'))
  })
  
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, {type: 'enableFilter', value: enabled})
        .catch(err => {})
    })
  })
})