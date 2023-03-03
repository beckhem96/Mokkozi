import React from 'react';
import Button from '../styles/Button';
function signUp(props: any) {
  const signUpFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //회원가입 요청 함수
    console.log('회원가입 시도');
  };
  // const handleSingupClick = () => {

  // };
  return (
    <>
      <div>
        <h1>로그인</h1>
        <form onSubmit={signUpFunc}>
          <label htmlFor="id">ID: </label>
          <input type="text" id="id" />
          <br />
          <label htmlFor="password">Password: </label>
          <input type="password" />
          <label>NickName: </label>
          <input type="text" id="nickname" />
          <br />
          <Button type="submit">회원가입</Button>
        </form>
      </div>
    </>
  );
}

export default signUp;
