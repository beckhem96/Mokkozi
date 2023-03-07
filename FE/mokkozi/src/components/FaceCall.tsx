'use strict';
import React, { createElement, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Button from '../styles/Button';

//styeld
import '../styles/Modal.css';
function FaceCall() {
  const localVideo: any = useRef(HTMLMediaElement);
  const peerVideo: any = useRef(HTMLMediaElement);
  const [chats, setChats] = useState<Array<{ key: number; value: string }>>([]);
  const [roomName, setRoomName] = useState('');
  let myDataChannel;
  let myPeerConnection: any;
  let myStream: any;
  const socket = io('http://localhost:8080', {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
  });
  /** 채팅 화면에 추가 할 수 있도록 배열에 넣어주는 함수 */
  function addChat(chat: string) {
    setChats((curChat) => [...curChat, { key: 1, value: chat }]);
  }
  useEffect(() => {
    socket.on('welcome', async () => {
      myDataChannel = myPeerConnection.createDataChannel('chat');
      myDataChannel.onmessage = (event: any) => {
        console.log(event.data);
        console.log('ss');
      };
      console.log('made data channel');
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      sendEmit('offer', offer, roomName);
      console.log('sent offer');
      addChat('어서와');
    });
    socket.on('answer', (answer) => {
      console.log('received answer');
      myPeerConnection.setRemoteDescription(answer);
    });
    socket.on('offer', async (offer) => {
      myPeerConnection.addEventListener('datachannel', (event: any) => {
        myDataChannel = event.channel;
        myDataChannel.addEventListener('message', console.log);
      });
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit('answer', answer, roomName);
    });
    socket.on('ice', (ice) => {
      myPeerConnection.addIceCandidate(ice);
    });
    return () => {
      socket.off('welcome');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice');
    };
  }, []);

  async function initConnection() {
    setRoomName('myStudy');
    await initCall();
    socket.emit('join_room', roomName);
  }

  function sendEmit(message: string, data: any, roomName: string) {
    socket.emit(message, data, roomName);
  }

  async function initCall() {
    await getMedia(null);
    makeConnection();
  }
  /** RTC 연결하는 함수 */
  function makeConnection() {
    myPeerConnection = new RTCPeerConnection({
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
      .forEach((track: any) => myPeerConnection.addTrack(track, myStream));
  }
  function handleIce(data: { candidate: any }) {
    sendEmit('ice', data.candidate, roomName);
  }

  function handleAddStream(data: any) {
    peerVideo.current.srcObject = data.stream;
  }

  /** 유저의 미디어 정보를 불러오는 함수 */
  async function getMedia(deviceId: string | null) {
    const initialContrains: object = {
      audip: true,
      video: { facingMode: 'user' },
    };
    const cameraConstraints: object = {
      audio: true,
      video: { deviceId: { excat: deviceId } },
    };
    try {
      myStream = await navigator.mediaDevices.getUserMedia(
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
      <video
        ref={peerVideo}
        id="peer"
        autoPlay
        playsInline
        muted
        width={'400'}
        height={'400'}
      ></video>
      {/* <video ref={peer1Video} id="peer1" autoPlay playsInline muted></video> */}
      <Button onClick={initConnection}>연결</Button>

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
