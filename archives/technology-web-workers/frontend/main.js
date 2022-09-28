if (!window.Worker) throw new Error("Panic!")

const myWorker = new Worker("worker.js");

myWorker.postMessage({type: "PING"});


const record = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
    const data = []
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = (event) => {
        data.push(event.data)
    }
    mediaRecorder.start()
    mediaRecorder.onstop = (event) => {
        const recording = new Blob(data, {
            type: data[0].type
        })
        myWorker.postMessage({recording, type: "NEW_VIDEO"})
    }
}

const button = document.querySelector('#record');
button.addEventListener('click', record)

const result = document.querySelector('.result');


button.onclick = function () {
    myWorker.postMessage("recording started");
    console.log('Message posted to worker');
}

myWorker.onmessage = function (e) {
    result.textContent = e.data;
    console.log('Message received from worker', e.data);
}





let data = new FormData()
    
data.append('name', 'main.js')
// data.append('file', e.data.recording)

let config = {
  header : {
    'Content-Type' : 'multipart/form-data'
  }
}

axios.post('http://localhost:5001/upload', data, config).then(response => {
  console.log('response', response)
}).catch(error => {
  console.log('error', error)
})