// Runs within the context of a webpage. 

(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, data } = obj;
        if (type === "PING") {
            console.log("contentScript PONG")
        } else {
            console.log("I didn't implement these features")
        }
    });
})();
