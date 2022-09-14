importScripts('https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js')

let data = new FormData()
    
data.append('name', 'worker.js')
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

onmessage = function(e) {
    switch(e.data.type){
        case "PING": {
          postMessage("pong")
          break
        }
        case "NEW_VIDEO": {
            console.log('new video received')
            console.log(e.data.recording)

            let data = new FormData()
    
            data.append('name', 'image')
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

            break
        }
        default: {
            console.log("unknown event received")
            console.log(e.data)
            break
        }
    } 
    postMessage('data received');
  }