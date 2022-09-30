import React, { FormEvent, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'

import { Body, Title } from 'sharedComponents'


const App = () => {
  const [selectedFile, setSelectedFile] = useState<File>();

  const changeHandler = ({ target }: { target: HTMLInputElement }) => {
    setSelectedFile(target.files[0]);
  };

  const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append('File', selectedFile);
    console.log(formData)
  };

  return (
    <>
      <form onSubmit={handleSubmission}>
        <Title>Hello World!</Title>
        <input type="file" name="file" onChange={changeHandler} />
        <button type="submit">Submit</button>

      </form>
      <div>
        <Title>Uploads</Title>
      </div>
    </>
  )
}

export default App
