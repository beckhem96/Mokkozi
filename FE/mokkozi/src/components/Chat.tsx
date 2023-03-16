import React, { ChangeEvent, useEffect, useState } from 'react';
import ChatInput from '../styles/ChatInput';
import { io } from 'socket.io-client';
//styeld
import '../styles/Modal.css';
import Button from '../styles/Button';
function Chat(props: any) {
  const [chats, setChats] = useState<Array<{ key: number; value: string }>>([]);
  const [message, setMessage] = useState<string>('');
  const socket = io('http://localhost:8080', {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
  });

  useEffect(() => {
    socket.on('chat-message', (message) => {
      console.log('zz');
      console.log(message);
      addChat(message);
    });
    return () => {
      socket.off('chat-message');
    };
  }, []);
  /** 채팅 화면에 추가 할 수 있도록 배열에 넣어주는 함수 */
  function addChat(chat: string) {
    setChats((curChat) => [...curChat, { key: 1, value: chat }]);
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setMessage(e.target.value);
  }
  return (
    <>
      <h1>실시간 채팅</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          socket.emit('chat-message', message, props.roomName);
        }}
      >
        <ChatInput onChange={handleChange} />
        <Button>보내기</Button>
      </form>

      <ul>
        {chats.map((chat, index) => (
          <li key={index}>{chat.value}</li>
        ))}
      </ul>
    </>
  );
}

export default Chat;
