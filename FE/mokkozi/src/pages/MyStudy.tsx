import React from 'react';
import { useParams } from 'react-router-dom';
function MyStudy() {
  const { userId } = useParams();
  return (
    <>
      <div>
        <h1>{userId}님의 스터디 입니다.</h1>
        <h1>내 스터디들</h1>
      </div>
    </>
  );
}

export default MyStudy;
