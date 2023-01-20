import React, { Dispatch, SetStateAction } from 'react';
import { signUpUserFn } from '../apis/authAPI';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
//style
import Button from '../styles/Button';
import UserFormDiv from '../styles/Div';
import { Input } from '../styles/Input';
import Form from '../styles/Form';

//입력값 타입 지정
type SignUpInputs = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
};

function SignUpPage({
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
  const { register, handleSubmit, getValues } = useForm<SignUpInputs>();

  //  API Signup Mutation
  const { mutate: signUpUser } = useMutation((userData: SignUpInputs) =>
    signUpUserFn(userData),
  );
  const onSubmitHandler: SubmitHandler<SignUpInputs> = (values) => {
    signUpUser(values);
    //회원가입 요청 함수
    console.log('회원가입 시도');
    setIsLoginPage(true);
    setIsSignupPage(false);
  };

  return (
    <>
      <UserFormDiv>
        <h1>회원가입</h1>
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
            id="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요!',
              minLength: {
                value: 8,
                message: '8자리 이상 비밀번호를 사용하세요!',
              },
            })}
          />
          <label htmlFor="password">Password Check: </label>
          <Input
            type="password"
            id="password-check"
            {...register('password', {
              required: '비밀번호를 입력해주세요!',
              minLength: {
                value: 8,
                message: '8자리 이상 비밀번호를 사용하세요!',
              },
              validate: (value) => value === getValues('password'),
            })}
          />
          <label>NickName: </label>
          <Input
            type="text"
            id="nickname"
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
              minLength: {
                value: 3,
                message: '3자리 이상 입력해주세요!',
              },
            })}
          />
          <br />
          <Button type="submit">회원가입</Button>
        </Form>
      </UserFormDiv>
    </>
  );
}

export default SignUpPage;
