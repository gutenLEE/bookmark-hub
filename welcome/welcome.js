

document.querySelector('#type').addEventListener('change', (e) => {
    const valueSelected = e.target.value;
    if (valueSelected=='') {
        document.querySelector('#hook_button').disabled=true;
    } else {
        document.querySelector('#hook_button').disabled=false;
    }
})

document.querySelector('#hook_button').addEventListener('click', () => {
    chrome.storage.local.get('leethub_token', (data) => {
        const token = data.leethub_token;
        if (token === null || token === undefined) {
          /* Not authorized yet. */
          document.querySelector('#error').innerHTML = 
            'Authorization error - Grant LeetHub access to your GitHub account to continue (launch extension to proceed)'
        } else {
          chrome.storage.local.get('leethub_username', (data2) => {
            const username = data2.leethub_username;
              linkRepo(token, `${username}/${repositoryName()}`, false);
          });
        }
      });
})
