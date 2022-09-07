import React from 'react'
import styled from 'styled-components'
import Webcam from 'react-webcam'
import { v4 as uuidv4 } from 'uuid'

import { context } from './Context'

const WebcamWrapper = styled.div`
    position: fixed;
    z-index: 999;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
`

type Device = {
    deviceId: string //"4b02c19f31c7f98ca7263b096b452a6c56c24889a9a4314a02906f3fa2ddef0c"
    groupId: string //"42d8ede4997606209b87312c017ec8013bf1f848784dffcaac51555616f8892a"
    kind: string //"videoinput"
    label: string //"FaceTime HD Camera"
}

const FakeWork = styled.div`
    width: 500px;
    height: 500px;
    overflow: scroll;
`

const YoutubeEmbed = () => (
    <div className="video-responsive">
      <iframe
        width="500"
        height="480"
        src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );

const Workspace = () => {
    const {dispatch} = React.useContext(context)

    const [selectedDeviceIds, setSelectedDeviceIds] = React.useState<string[]>([]);
    const [devices, setDevices] = React.useState<Device[]>([]);

    const handleDevices = React.useCallback(
        (mediaDevices: any) =>
          setDevices(mediaDevices.filter(({ kind }: any) => kind === "videoinput")),
        [setDevices]
      );
    
      console.log(devices)
    
      React.useEffect(
        () => {
          navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
      );

    const record = async () => {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        const data: Blob[] = []
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.ondataavailable = (event) => {
            data.push(event.data)
        }
        mediaRecorder.start()
        mediaRecorder.onstop = (event) => {
            const url = URL.createObjectURL(new Blob(data, {
                type: data[0].type
            }))
            console.log(url)
            dispatch({type:"ADD_VIDEO", payload: {src: url, filename: `${uuidv4()}.webm`}})
        }
    }

    return (
        <div>
            <h1>Workspace</h1>
            <div>
                <label>Select Webcams to Add</label>
                {devices.map(device => <button onClick={() => setSelectedDeviceIds(prev => ([...prev, device.deviceId]))} key={device.deviceId}>{device.label}</button>)}
            </div>
            <button onClick={record}>Record</button>
            <FakeWork>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida, lectus non consequat feugiat, ligula eros sodales urna, ut interdum metus arcu vel risus. Phasellus ut magna sem. Proin varius libero vitae mattis auctor. Sed accumsan pharetra consectetur. Nullam lobortis risus vel ex tristique laoreet. Curabitur vel pellentesque dolor, in euismod neque. Vestibulum consequat a turpis ut dapibus. Suspendisse justo orci, tincidunt vel augue non, feugiat interdum diam. Mauris interdum, mauris ultrices luctus tristique, ante ante porta est, at hendrerit metus nunc eget dolor. Pellentesque in metus vitae arcu pharetra rhoncus in eu enim. Cras eget mattis eros.</p>
                <p>Phasellus at sapien sed mi placerat condimentum. Suspendisse odio augue, tincidunt vel faucibus sed, feugiat vel magna. Integer a libero molestie, sagittis nisl vel, efficitur turpis. Vestibulum maximus pellentesque ultrices. Donec ut pretium quam. Vestibulum vel tellus at nisl tristique commodo quis ac tortor. Morbi tristique faucibus eros viverra viverra. Ut tincidunt urna eu sem auctor, a varius nunc sagittis. Ut consequat viverra nisl, in laoreet urna imperdiet at.</p>
                <p>Quisque lacinia ut justo ut cursus. Proin sagittis, orci id consequat facilisis, augue libero consectetur magna, ac tristique ante leo nec urna. Vestibulum a aliquet quam. Aenean sit amet nisi mattis, vestibulum lorem non, hendrerit sem. Ut sed porttitor elit, nec congue arcu. Quisque pellentesque tellus risus, sed aliquet risus tempor in. Donec fringilla neque at tristique semper. Proin dapibus neque quis nulla egestas, eu sodales enim dictum. Nulla ultricies at dui in euismod. Duis semper nulla pharetra justo tincidunt eleifend. Etiam et condimentum ex, sit amet ullamcorper nibh. Curabitur luctus vel purus ac pulvinar.</p>
                <p>Donec et semper elit. Integer leo mauris, tristique a sapien rutrum, malesuada aliquam mi. Etiam vel urna in neque finibus maximus sit amet eget leo. Aliquam tortor odio, euismod quis nunc sed, laoreet tempus sapien. Donec condimentum convallis rutrum. Maecenas eu nibh massa. Proin mollis ligula eget tempus scelerisque. Nam ut lectus fringilla, tempus ex id, commodo mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer at bibendum orci. Suspendisse et aliquam dolor. Quisque suscipit, tellus vel pulvinar sollicitudin, mauris nunc consectetur tellus, ac lobortis arcu tellus non odio.</p>
                <p>Vivamus lobortis elit vitae quam luctus vestibulum. Fusce vel nulla purus. Praesent aliquam, augue quis malesuada cursus, arcu turpis scelerisque purus, id sagittis diam urna sed odio. Donec eleifend erat vitae porttitor pulvinar. Nulla vel fermentum nunc. Aenean facilisis odio sit amet dolor venenatis hendrerit. Mauris purus massa, malesuada sed mi a, aliquam ullamcorper justo. Sed ac nulla dui.</p>
                <YoutubeEmbed />
            </FakeWork>
            <WebcamWrapper>
            {selectedDeviceIds.map(deviceId => <Webcam key={deviceId} width={200} audio={false} videoConstraints={{ deviceId }} />)}
            </WebcamWrapper>

        </div>
    )
}

export default Workspace