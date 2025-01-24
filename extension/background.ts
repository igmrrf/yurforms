chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_USER_ID') {
    chrome.storage.local.get(['userId'], (result) => {
      sendResponse({ userId: result.userId })
    })
    return true
  }
})

chrome.runtime.onInstalled.addListener(() => {
  // Generate or retrieve user ID on installation
  chrome.storage.local.get(['userId'], (result) => {
    if (!result.userId) {
      const userId = crypto.randomUUID()
      chrome.storage.local.set({ userId })
    }
  })
})