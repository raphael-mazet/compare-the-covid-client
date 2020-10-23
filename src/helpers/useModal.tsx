import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [modalText, setText] = useState<String>('xxx');

  function toggleModal(arg:String) {
    setText(arg)
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggleModal,
    modalText,
  }
};

export default useModal;