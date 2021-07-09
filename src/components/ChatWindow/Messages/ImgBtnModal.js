import React from "react";
import { useModalState } from "../../../misc/custom-hooks";
import { Modal } from "rsuite";

const ImgBtnModal = ({ src, name }) => {
  const [isOpen, open, close] = useModalState(false);
  return (
    <>
      <input
        src={src}
        type="image"
        alt="file"
        onClick={open}
        className="mw-100 mh-100 w-auto"
      />

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={src} alt="file" height="100%" width="100%" />
        </Modal.Body>

        <Modal.Footer>
          <a href={src} target="blank" rel="noopener noreferrer">
            View original
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImgBtnModal;
