

document.querySelector('#type').addEventListener('change', (e) => {
    const valueSelected = e.target.value;
    if (valueSelected=='') {
        document.querySelector('#hook_button').disabled=true;
    } else {
        document.querySelector('#hook_button').disabled=false;
    }
})

document.querySelector('#hook_button').addEventListener('click', () => {
  alert('click!!!')
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

const linkRepo = (token, name) => {
  const AUTHENTICATION_URL = `https://api.github.com/repos/${name}`;

  const xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4) {
      const res = JSON.parse(xhr.responseText);
      const bool = linkStatusCode(xhr.status, name);
      if (xhr.status === 200) {
        // BUG FIX
        if (!bool) {
          // unable to gain access to repo in commit mode. Must switch to hook mode.
          /* Set mode type to hook */
          chrome.storage.local.set({ mode_type: 'hook' }, () => {
            console.log(`Error linking ${name} to LeetHub`);
          });
          /* Set Repo Hook to NONE */
          chrome.storage.local.set({ leethub_hook: null }, () => {
            console.log('Defaulted repo hook to NONE');
          });

          /* Hide accordingly */
          document.getElementById('hook_mode').style.display =
            'inherit';
          document.getElementById('commit_mode').style.display =
            'none';
        } else {
          /* Change mode type to commit */
          /* Save repo url to chrome storage */
          chrome.storage.local.set(
            { mode_type: 'commit', repo: res.html_url },
            () => {
              $('#error').hide();
              $('#success').html(
                `Successfully linked <a target="blank" href="${res.html_url}">${name}</a> to LeetHub. Start <a href="http://leetcode.com">LeetCoding</a> now!`,
              );
              $('#success').show();
              $('#unlink').show();
            },
          );
          /* Set Repo Hook */
          chrome.storage.local.set(
            { leethub_hook: res.full_name },
            () => {
              console.log('Successfully set new repo hook');
              /* Get problems solved count */
              chrome.storage.local.get('stats', (psolved) => {
                const { stats } = psolved;
                if (stats && stats.solved) {
                  $('#p_solved').text(stats.solved);
                  $('#p_solved_easy').text(stats.easy);
                  $('#p_solved_medium').text(stats.medium);
                  $('#p_solved_hard').text(stats.hard);
                }
              });
            },
          );
          /* Hide accordingly */
          document.getElementById('hook_mode').style.display = 'none';
          document.getElementById('commit_mode').style.display =
            'inherit';
        }
      }
    } else {
      aler("레포 생성 요청 실패")
    }
  })

  xhr.open('GET', AUTHENTICATION_URL, true);
  xhr.setRequestHeader('Authorization', `token ${token}`);
  xhr.setRequestHeader('Accept', 'application/vnd.github.v3+json');
  xhr.send();
};


const linkStatusCode = (status, name) => {
  let bool = false;
  switch (status) {
    case 301:
      $('#success').hide();
      $('#error').html(
        `Error linking <a target="blank" href="${`https://github.com/${name}`}">${name}</a> to LeetHub. <br> This repository has been moved permenantly. Try creating a new one.`,
      );
      $('#error').show();
      break;

    case 403:
      $('#success').hide();
      $('#error').html(
        `Error linking <a target="blank" href="${`https://github.com/${name}`}">${name}</a> to LeetHub. <br> Forbidden action. Please make sure you have the right access to this repository.`,
      );
      $('#error').show();
      break;

    case 404:
      $('#success').hide();
      $('#error').html(
        `Error linking <a target="blank" href="${`https://github.com/${name}`}">${name}</a> to LeetHub. <br> Resource not found. Make sure you enter the right repository name.`,
      );
      $('#error').show();
      break;

    default:
      bool = true;
      break;
  }
  $('#unlink').show();
  return bool;
};