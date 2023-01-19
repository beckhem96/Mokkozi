import axios from 'axios';
import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from 'react-query';
import { apis } from '../apis/api';

import Button from '../styles/Button';

function logIn({
  isLoginPage,
  setIsLoginPage,
  isSignupPage,
  setIsSignupPage,
}: {
  isLoginPage: boolean;
  setIsLoginPage: Dispatch<SetStateAction<boolean>>;
  isSignupPage: boolean;
  setIsSignupPage: Dispatch<SetStateAction<boolean>>;
}) {
  const { isLoading, data } = useQuery('login', apis.login);
  const logInFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('로그인 시도');
  };
  const toSignUpPage = () => {
    setIsLoginPage(false);
    setIsSignupPage(true);
  };

  return (
    <>
      <div>
        <h1>로그인</h1>
        <form onSubmit={logInFunc}>
          <label htmlFor="id">ID: </label>
          <input type="text" id="id" />
          <br />
          <label htmlFor="password">Password: </label>
          <input type="password" />
          <br />
          <Button type="submit">로그인</Button>
        </form>
        <Button onClick={toSignUpPage}>회원가입</Button>
      </div>
    </>
  );
}

export default logIn;
