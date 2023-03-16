import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FaceCall from '../components/FaceCall';
import Chat from '../components/Chat';
import { io } from 'socket.io-client';
function MyStudy() {
  const { userId } = useParams();
  const [roomName, setRoomName] = useState<string>('123');
  // const socket = io('http://localhost:8080', {
  //   withCredentials: true,
  //   extraHeaders: {
  //     'my-custom-header': 'abcd',
  //   },
  // });
  // useEffect(() => {
  //   socket.emit('join_room', roomName);
  // }, []);

  return (
    <>
      <h1>{userId}님의 스터디 입니다.</h1>
      <h1>내 스터디들</h1>
      <div>
        <FaceCall roomName={roomName} />
        <Chat roomName={roomName} />
      </div>
    </>
  );
}

export default MyStudy;
