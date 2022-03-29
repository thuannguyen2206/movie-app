// @ts-nocheck

import React, { useRef } from "react";
import Modal, { ModalContent } from "../modal/Modal";

function TrailerModal(props) {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <>
      <Modal active={false} id={`modal_${item.id}`}>
        <ModalContent onClose={onClose}>
          <iframe
            src=""
            ref={iframeRef}
            width="100%"
            height="500px"
            title="trailer"
          ></iframe>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TrailerModal;
