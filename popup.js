document.getElementById('saveButton').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    chrome.storage.sync.set({ apiKey }, () => {
        alert('API Key saved!');
    });
});

// Load the saved API key when the popup is opened
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('apiKey', (data) => {
        if (data.apiKey) {
            document.getElementById('apiKey').value = data.apiKey;
        }
    });
});
