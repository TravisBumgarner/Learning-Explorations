const recordButton = document.getElementById('record')

recordButton.addEventListener('click', () => {
  alert('hi')
})

// const handleStream = () => {
    
// }

// recordButton.addEventListener('click', () => {
//     chrome.tabCapture.capture({
//         video: true, audio: true,
//         videoConstraints: {
//           mandatory: {
//             minWidth: 16,
//             minHeight: 9,
//             maxWidth: 854,
//             maxHeight: 480,
//             maxFrameRate: 60,  // 0 ~ 60
//           },
//         },
//       },
// })

console.log('hi')



// var receiver = null;
// function playCapturedStream(stream) {
//   if (!stream) {
//     console.error('error: ' + chrome.runtime.lastError.message);
//     return;
//   }
//   if (receiver != null) {
//     receiver.close();
//   }
//   receiver = window.open('receiver.html');
//   receiver.currentStream = stream;
// }

// function testCapture() {
//   chrome.tabCapture.capture({
//     video: true, audio: true,
//     videoConstraints: {
//       mandatory: {
//         minWidth: 16,
//         minHeight: 9,
//         maxWidth: 854,
//         maxHeight: 480,
//         maxFrameRate: 60,  // 0 ~ 60
//       },
//     },
//   },
//   playCapturedStream);
// }

// chrome.browserAction.onClicked.addListener(function(tab) {
//   testCapture();
// });
