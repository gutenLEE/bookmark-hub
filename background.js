

async function getAuth() {
    console.log('getAuth()')
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try{
        getAuth();
    } catch(e) {
        console.log('error')
    }
    return true;
});
