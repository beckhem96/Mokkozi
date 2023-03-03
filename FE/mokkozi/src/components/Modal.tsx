import React, { useState, createContext } from 'react';
import ReactModal from 'react-modal';
import Login from '../pages/Login';
import SignUp from '../pages/SingUp';
import Button from '../styles/Button';
function Modal({ isOpen, onCancel }: { isOpen: boolean; onCancel: any }) {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const [isSignupPage, setIsSignupPage] = useState<boolean>(false);
  const handleClickCancel = () => {
    onCancel();
  };
  // const toSignUpPage = (isLogin: boolean, isSignup: boolean) => {
  //   setIsLoginPage(isLogin);
  //   setIsSingupPage(isSignup);
  //   console.log('바뀌냐');
  // };
  return (
    <ReactModal isOpen={isOpen}>
      <div>
        <Button onClick={handleClickCancel}>취소</Button>
        {isLoginPage && !isSignupPage && (
          <Login
            isLoginPage={isLoginPage}
            setIsLoginPage={setIsLoginPage}
            isSignupPage={isSignupPage}
            setIsSignupPage={setIsSignupPage}
          />
        )}
        {isSignupPage && !isLoginPage && <SignUp />}
      </div>
    </ReactModal>
  );
}

export default Modal;
