

document.querySelector('.btn').addEventListener('click', () =>
    {   
        chrome.runtime.sendMessage({
            isSuccess: true
        });
    }
);