import * as React from 'react'
import sanitizeSVG from '@mattkrick/sanitize-svg'

function App() {
  const [file, setFile] = React.useState<File>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      return;
    }

    const cleanImage = await sanitizeSVG(file)
    if (!cleanImage) {
      alert('Howdy, hacker')
    } else {
      alert('uploaded')
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default App;