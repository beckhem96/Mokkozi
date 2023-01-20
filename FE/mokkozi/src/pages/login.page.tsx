import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { loginUserFn } from '../apis/authAPI';
import Button from '../styles/Button';
import UserFormDiv from '../styles/Div';
import Form from '../styles/Form';
import { Input } from '../styles/Input';
//입력값 타입 지정
type LoginInputs = {
  email: string;
  password: string;
};

function LogInPage({
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
  // useForm에서 쓸 메서드 지정
  const { register, handleSubmit } = useForm<LoginInputs>();

  //  API Login Mutation
  const { mutate: loginUser } = useMutation((userData: LoginInputs) =>
    loginUserFn(userData),
  );
  const onSubmitHandler: SubmitHandler<LoginInputs> = (values) => {
    //   // ? Executing the loginUser Mutation
    loginUser(values);
    console.log('로그인 제출은 됩니다');
  };
  const toSignUpPage = () => {
    setIsLoginPage(false);
    setIsSignupPage(true);
  };

  return (
    <>
      <UserFormDiv>
        <h1>로그인</h1>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <label htmlFor="email">ID: </label>
          <Input
            type="text"
            id="email"
            {...register('email', {
              required: '이메일을 작성해주세요!',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          />
          <br />
          <label htmlFor="password">Password: </label>
          <Input
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요!',
              minLength: {
                value: 8,
                message: '8자리 이상 비밀번호를 사용하세요!',
              },
            })}
          />
          <Button>로그인</Button>
        </Form>
        <br />
        <div>
          <Button onClick={toSignUpPage}>회원가입</Button>
        </div>
      </UserFormDiv>
    </>
  );
}

export default LogInPage;
