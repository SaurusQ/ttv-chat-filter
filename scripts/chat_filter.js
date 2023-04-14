
function filterMsg(msg) {
  /*if(msg.length <= 4) return true
  msg = msg.toLowerCase()
  filterList = ["monkaw", "noted", "kekw", "kekwa", "based", "huh", "aware", "flushed", "gigachad", "nice", "ok", "corpa"]
  return filterList.includes(msg)*/
  const regex = /^\s*\S+(\s+\S+)?\s*[\S]?$/
  return regex.test(msg)
}

window.onload = function() {
  const chatInput = document.querySelector('div[class$="chat-input"]')
  const chatInputDiv = chatInput.querySelector('div')

  const chatElement = document.querySelector('div[data-test-selector="chat-scrollable-area__message-container"]');
 
  const chatObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        //console.log(mutation)
        for(const addedNode of mutation.addedNodes) {
          if (Object.prototype.toString.call(addedNode) !== '[object HTMLDivElement]') {
            console.log("break")
            break
          }
          const messageSpan = addedNode.querySelector('span[data-a-target="chat-message-text"]');
          if (messageSpan && filterMsg(messageSpan.textContent)) {
            console.log("Removed: " + messageSpan.textContent)
            addedNode.style.display = 'none';
            //chatInputDiv.appendChild(addedNode)
          }
          
          
        }
      }
    }
  });
    
  const chatObserverOptions = {
    childList: true,
    subtree: true
  };
  chatObserver.observe(chatElement, chatObserverOptions);

};