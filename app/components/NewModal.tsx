"use client";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

const NewModal = ({ children }) => {
  const modalRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (modalRef?.current?.open) {
      modalRef?.current?.showModal();
    }
  }, [input]);

  const onModalHide = () => {
    router.back();
  };

  return createPortal(
    <dialog onClose={onModalHide} ref={modalRef} className="boarder-teal-600">
      <span onClick={onModalHide}>X</span>
      {children}
    </dialog>,
    document.getElementById("modal-root-id")
  );
};

export default NewModal;
