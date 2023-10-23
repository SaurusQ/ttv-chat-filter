
const tryClaimBonus = (base) => {
  const button = base.querySelector('button[aria-label="Claim Bonus"]')
    if (button) {
      button.click()
      console.log("Watch reward claimed!")
    }
}

const claimCallback = (mutations) => {
  mutations.forEach(mutation => {
    console.log("mutation:", mutation)
    tryClaimBonus(mutation.target)
  })
}

window.addEventListener("load", () => {
  const claimObserverOptions = {
    childList: true,
    subtree: true
  }
  const claimBase = document.querySelector('div[data-test-selector="chat-input-buttons-container"]')
  const claimObserver = new MutationObserver(claimCallback)
  if (!claimBase) {
    console.log("Cannot start auto claim!")
    return
  }
  claimObserver.observe(claimBase, claimObserverOptions)
  console.log("autoclaim enabled")
  tryClaimBonus(claimBase)
})
