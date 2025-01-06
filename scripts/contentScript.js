chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getTabInfo') {
        const url = window.location.href;
        const icon = document.querySelector('link[rel~="icon"]').href || '';
        sendResponse({ url: url, icon: icon });
    }
});
