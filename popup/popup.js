
let action = false;

document.querySelector('#authenticate').addEventListener('click', () =>
    {   
        oAuth2.begin();
    }
);

document.querySelector('#welcome_url').setAttribute(
    'href',
    chrome.runtime.getURL('welcome.html')
);


chrome.storage.local.get('leethub_token', (data) => {
    const token = data.leethub_token;
    if (token === null || token === undefined) {
      action = true;
      document.querySelector('#auth_mode').style.display='block'
    } 
});

