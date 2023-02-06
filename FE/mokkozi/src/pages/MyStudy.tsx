import React from 'react';
import { useParams } from 'react-router-dom';
import FaceCall from '../components/FaceCall';

function MyStudy() {
  const { userId } = useParams();
  return (
    <>
      <div>
        <h1>{userId}님의 스터디 입니다.</h1>
        <h1>내 스터디들</h1>
        <FaceCall />
      </div>
    </>
  );
}

export default MyStudy;
