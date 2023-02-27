'use strict';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Button from '../styles/Button';

//styeld
import '../styles/Modal.css';
function FaceCall() {
  const localVideo: any = useRef(HTMLMediaElement);
  const peer1Video: any = useRef();
  const [chats, setChats] = useState<Array<{ key: number; value: string }>>([]);
  const socket = io('http://localhost:8080', {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
  });

  function addChat(chat: string) {
    chats.push({ key: 1, value: chat });
    console.log(chats);
  }
  useEffect(() => {
    socket.on('welcome', () => {
      async function hello() {
        await addChat('어서와');
      }
      hello();
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  async function enterRoom(event: any) {
    socket.emit('join_room', 'myStudy', await getMedia);
  }
  async function getMedia(deviceId: any) {
    const initialContrains: object = {
      audip: true,
      video: { facingMode: 'user' },
    };
    const cameraConstraints: object = {
      audio: true,
      video: { deviceId: { excat: deviceId } },
    };
    try {
      const myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialContrains,
      );
      localVideo.current.srcObject = myStream;
      /* 스트림 사용 */
    } catch (e) {
      /* 오류 처리 */
    }
  }
  return (
    <>
      <h1>WebRTC</h1>
      <video
        ref={localVideo}
        id="local"
        autoPlay
        playsInline
        muted
        width={'400'}
        height={'400'}
      ></video>
      {/* <video ref={peer1Video} id="peer1" autoPlay playsInline muted></video> */}
      <Button onClick={enterRoom}>연결</Button>

      <div>
        <h1>Chat</h1>
        <ul>
          {chats.map((chat, index) => (
            <li key={index}>{chat.value}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FaceCall;
