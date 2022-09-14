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