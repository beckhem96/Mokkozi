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
  const [dataChannel, setDataChannel] = useState();
  const [myPeerConnection, setMyPeerConnection] = useState();
  const [roomName, setRoomName] = useState('');
  const socket = io('http://localhost:8080', {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
  });
  /** 채팅 화면에 추가 할 수 있도록 배열에 넣어주는 함수 */
  function addChat(chat: string) {
    setChats((curChat) => [...curChat, { key: 1, value: chat }]);
    console.log(chats);
  }
  useEffect(() => {
    socket.on('welcome', () => {
      addChat('어서와');
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  async function initCall(event: React.ChangeEvent) {
    socket.emit('join_room', 'myStudy', await getMedia, await makeconnection);
    setRoomName('test');
  }
  function makeConnection() {
    const myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
          ],
        },
      ],
    });
    myPeerConnection.addEventListener('icecandidate', handleIce);
    myPeerConnection.addEventListener('addstream', handleAddStream);
    myStream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream));
  }
  function handleIce(data: { candidate: any }) {
    console.log('캔디 보냄');
    socket.emit('ice', data.candidate, roomName);
  }

  function handleAddStream(data) {
    const peerFace = document.getElementById('peerFace');
    peerFace.srcObject = data.stream;
  }

  /** 유저의 미디어 정보를 불러오는 함수 */
  async function getMedia(deviceId: string) {
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
      <Button onClick={initCall}>연결</Button>

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
