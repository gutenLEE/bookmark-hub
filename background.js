function handleMessage(request){
    const urlOnboarding = chrome.runtime.getURL('welcome/welcome.html');
    chrome.tabs.create({ url: urlOnboarding, active: true }); // creates new tab
}

chrome.runtime.onMessage.addListener(handleMessage);