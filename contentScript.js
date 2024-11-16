document.getElementById('read-content').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        function printBody() {
            const body = document.body.innerText;
            console.log(body);
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: printBody,
        }).then(() => console.log('Injected a function!'));
    });
});