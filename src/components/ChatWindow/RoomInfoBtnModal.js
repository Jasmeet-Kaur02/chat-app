import React from "react";
import { Button, Icon } from "rsuite";
import { useCurrentRoom } from "../../context/currentRoomContext";
import { useModalState } from "../../misc/custom-hooks";
import "../../styles/DrawerStyle.scss";
import { Modal } from "@material-ui/core";

const RoomInfoBtnModal = () => {
  const description = useCurrentRoom((v) => v.description);
  const name = useCurrentRoom((v) => v.name);
  const [isOpen, open, close] = useModalState(false);
  return (
    <>
      <Button appearance="link" onClick={open}>
        Room Information
      </Button>

      <Modal open={isOpen} onClose={close}>
        <div className="Modal">
          <div className="d-flex justify-content-between align-items-center">
            <h4>About {name}</h4>
            <Icon icon="close" onClick={close} />
          </div>

          <h4>Description</h4>
          <div className="mt-2">{description}</div>
        </div>
      </Modal>
    </>
  );
};

export default RoomInfoBtnModal;
