import React, { useRef } from 'react';

import Button from '../styles/Button';

//styeld
import '../styles/Modal.css';
function FaceCall() {
  const localVideo: any = useRef();
  function gotStream(stream: any) {
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', { audio: true, video: true });
    console.log(`Using video device: ${videoTracks[0].label}`);
    console.log('Received local stream');
    localVideo.srcObject = stream;
  }
  async function getMedia(e: any) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      gotStream(stream);
      console.log('스트림 연결');
      /* 스트림 사용 */
    } catch (e) {
      console.log(e, '안됨');
      /* 오류 처리 */
    }
  }
  return (
    <>
      <h1>WebRTC</h1>
      <video id="local" ref={localVideo} autoPlay></video>
      <Button onClick={getMedia}>연결</Button>
    </>
  );
}

export default FaceCall;
