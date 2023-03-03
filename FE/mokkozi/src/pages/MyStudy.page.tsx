import React from 'react';
import { useParams } from 'react-router-dom';
import FaceCall from '../components/FaceCall';
import Chat from '../components/Chat';
function MyStudy() {
  const { userId } = useParams();
  return (
    <>
      <div>
        <h1>{userId}님의 스터디 입니다.</h1>
        <h1>내 스터디들</h1>
        <div>
          <FaceCall />
          {/* <Chat /> */}
        </div>
      </div>
    </>
  );
}

export default MyStudy;
