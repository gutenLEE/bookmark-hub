

var tabId;
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let tab = tabs[0];
    console.log(tab.id)
    chrome.scripting.executeScript(
        {
            target: {tabId: tab.id, allFrames: true},
            files: ['scripts/oauth2.js'],
        },
        () => { 
            alert('??')
    });
})

