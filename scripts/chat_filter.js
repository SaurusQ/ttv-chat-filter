
var chatObserver
var chatElement
const chatObserverOptions = {
  childList: true,
  subtree: true
}

const countWords = (str) => {
  const words = str.toLowerCase().split(" ")
  const wordCounts = {}
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (wordCounts[word]) {
      wordCounts[word]++
    } else {
      wordCounts[word] = 1
    }
  }
  // Return the word counts object
  return wordCounts
}

const calculateStats = (wordCounts) => {
  const counts = Object.values(wordCounts);
  const mean = counts.reduce((acc, val) => acc + val, 0) / counts.length;
  const std = Math.sqrt(
    counts.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / counts.length
  );
  return { mean, std };
}

const filterMsg = (msg) => {
  /*if(msg.length <= 4) return true
  msg = msg.toLowerCase()
  filterList = ["monkaw", "noted", "kekw", "kekwa", "based", "huh", "aware", "flushed", "gigachad", "nice", "ok", "corpa"]
  return filterList.includes(msg)*/
  
  const regex = /^\s*\S+(\s+\S+)?\s*[\S]?$/
  if (regex.test(msg)) return true

  const { mean, std } = calculateStats(countWords(msg))
  if( mean >= 3 ) return true
  //console.log(mean, std, "#" msg)

  return false
}

const chatCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      //console.log(mutation)
      for(const addedNode of mutation.addedNodes) {
        if (Object.prototype.toString.call(addedNode) !== '[object HTMLDivElement]') {
          //console.log("break")
          break
        }
        const messageSpan = addedNode.querySelector('span[data-a-target="chat-message-text"]');
        if (messageSpan) {
          const username = addedNode.querySelector('span[class="chat-author__display-name"]').textContent
          const msg = messageSpan.textContent
          //console.log("username", username)
          const verifiedElem = addedNode.querySelector('img[alt="Verified"]')
          if (verifiedElem) {
            console.log("Found verified user: " +  username + " : " +  msg)
            addedNode.style.backgroundColor = "red"
          }
          else if (enabled && filterMsg(messageSpan.textContent)) {
            console.log("Removed: " + username + ": " +  msg)
            addedNode.style.display = 'none';
            //chatInputDiv.appendChild(addedNode)
          }
        }
      }
    }
  }
}

var enabled = false
chrome.storage.sync.get({ enableFilter: false }, (items) => {
  enabled = items.enableFilter
  console.log("enable start: " + enabled)
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'enableFilter') {
    enabled = request.value;
    console.log('Filter ' + (enabled ? 'enabled' : 'disabled'));
  }
});

window.addEventListener("load", () => {
  //if (!enabled) return

  //const chatInput = document.querySelector('div[class$="chat-input"]')
  //const chatInputDiv = chatInput.querySelector('div')

  /*var popup = document.createElement('div');
  popup.id = 'myPopup';
  popup.style.position = 'fixed';
  popup.style.bottom = '0';
  popup.style.left = '0';
  popup.style.width = '200px';
  popup.style.height = '100px';
  popup.style.backgroundColor = 'white';
  popup.style.border = '1px solid black';
  popup.style.visibility = 'hidden'; // Initially hide the popup

  // Add content to the popup
  popup.innerHTML = 'Hello, world!'

  // Append the popup to the document's body
  document.body.appendChild(popup)

  // Show the popup
  popup.style.visibility = 'visible'*/

  chatElement = document.querySelector('div[data-test-selector="chat-scrollable-area__message-container"]')
  chatObserver = new MutationObserver(chatCallback)

  chatObserver.observe(chatElement, chatObserverOptions)
})
