import * as React from 'react'

import { Body, Title } from 'sharedComponents'

const App = () => {
  const [file, setFile] = React.useState<File>()

  const onFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFile(event.currentTarget.files[0])
  }

  const download = async () => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${Math.random()}.png`;
    link.target = '_blank';
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Body>
      <Title>Hello World!</Title>
      <input type="file" onChange={onFileChange}></input>
      <button disabled={!file} onClick={download}>Download</button>
    </Body>
  )
}

export default App
