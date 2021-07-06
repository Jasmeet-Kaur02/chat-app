import React from "react";
import { Button, Modal } from "rsuite";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { useModalState } from "../../../misc/custom-hooks";
import "../../../styles/DrawerStyle.scss";

const RoomInfoBtnModal = () => {
  const description = useCurrentRoom((v) => v.description);
  const name = useCurrentRoom((v) => v.name);
  const [isOpen, open, close] = useModalState(false);
  return (
    <>
      <Button appearance="link" onClick={open}>
        Room Information
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>
            <div className="d-flex justify-content-between align-items-center">
              <h5>About {name}</h5>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5 className="mt-2">Description</h5>
          <p className="text-disappear mt-2">{description}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RoomInfoBtnModal;
