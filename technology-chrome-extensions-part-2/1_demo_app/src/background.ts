// chrome.alarms.create({
//     periodInMinutes: 1/60,
// })

// chrome.alarms.onAlarm.addListener((alarm) => {
//     console.log(alarm)
//     chrome.storage.local.get(["timer"], (res) => {
//         const time = res.timer ?? 0
//         chrome.storage.local.set({
//             timer: time + 1
//         })
//         chrome.action.setBadgeText({text: `${time + 1}`})
//     })

//     // this.registration.showNotification("test", {
//     //     body: "hello" // this doesn't work. hmm
//     // })
// })