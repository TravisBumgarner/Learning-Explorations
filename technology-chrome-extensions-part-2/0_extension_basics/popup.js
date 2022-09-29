const timeElement = document.getElementById('time')
const currentTime = new Date().toLocaleDateString()
const nameElement = document.getElementById('name')

setInterval(() => {
    chrome.storage.local.get(['timer'], (res) => {
        const time = res.timer ?? 0
    
        timeElement.textContent = `The timer is ${time}`
    })
}, 1000)


chrome.storage.sync.get(["name"], (res) => {
    nameElement.textContent = `Your name is ${res.name}`
})
