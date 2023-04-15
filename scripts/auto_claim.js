
const claimCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    console.log("MUTATION")
    console.log(mutation)
    /*if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      //console.log(mutation)
      for(const addedNode of mutation.addedNodes) {
        if (Object.prototype.toString.call(addedNode) !== '[object HTMLDivElement]') {
          //console.log("break")
          break
        }
        const messageSpan = addedNode.querySelector('span[data-a-target="chat-message-text"]');
        if (messageSpan && filterMsg(messageSpan.textContent)) {
          console.log("Removed: " + messageSpan.textContent)
          addedNode.style.display = 'none';
          //chatInputDiv.appendChild(addedNode)
        }
      }
    }*/
  }
}

window.addEventListener("load", () => {
  console.log("autoclaim start")
  const claimObserverOptions = {
    childList: true,
    subtree: true
  };
  const claimBase = document.querySelector('div[class="ScTransitionBase-sc-hx4quq-0 gSiBL tw-transition"]')
  console.log(claimBase)
  const claimObserver = new MutationObserver(claimCallback);
  console.log(claimObserver)
  claimObserver.observe(claimBase, claimObserverOptions)
})
