// Runs within the context of a webpage. 

(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, data } = obj;
        if (type === "PING") {
            console.log("Received message from background.js")
        } else {
            console.log("I didn't implement these features")
        }
    });
})();

const superAwesomeButton = document.getElementById('super-awesome-button')
console.log("trying to click button from content script")
superAwesomeButton.click()
console.log("success!?")

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

docReady(() => {
    chrome.runtime.sendMessage({ Message: "hey" }, function (response) {
        console.log('response')
    })
})

// accept messages from background
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    alert("Contents Of Text File = " + request.fileData);
});