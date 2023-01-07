const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${foobar.chrome()}), Node.js (v${foobar.node()}), and Electron (v${foobar.electron()})`

const func = async () => {
    const response = await window.foobar.ping()
    console.log(response) // prints out 'pong'
}

func()