import React, {useState} from "react";
import Modal from "./index.tsx";
import useModal from '../../helpers/useModal'

export default {
  title: "Components/Modal",
  component: Modal,
};

export const Classic = () => {
  
  const {isShowing, toggleModal} = useModal();

  return( 
   <>
   <button onClick={toggleModal}>
     Test Modal
   </button>

   <Modal
     isShowing={isShowing}
     hide={toggleModal}
   />
   </>
  )

};