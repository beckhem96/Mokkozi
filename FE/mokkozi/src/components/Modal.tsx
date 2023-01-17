import React from 'react';
import ReactModal from 'react-modal';
import Login from '../pages/Login';

function Modal({ isOpen, onCancel }: { isOpen: boolean; onCancel: any }) {
  const handleClickCancel = () => {
    onCancel();
  };
  return (
    <ReactModal isOpen={isOpen}>
      <div>
        <button onClick={handleClickCancel}>취소</button>
        <Login />
      </div>
    </ReactModal>
  );
}

export default Modal;
