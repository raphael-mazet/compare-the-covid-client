import React, {useState} from "react";
import Modal from "./index.tsx";
import useModal from '../../helpers/useModal'

export default {
  title: "Components/Modal",
  component: Modal,
};

export const Classic = () => {
  
  const {isShowing, toggleModal, modalText} = useModal();

  return( 
   <>
   <button onClick={toggleModal('some text for the modal')}>
     Test Modal
   </button>

   <Modal
     isShowing={isShowing}
     hide={toggleModal}
     text={modalText}
   />
   </>
  )

};