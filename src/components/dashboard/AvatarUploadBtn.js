import React from "react";
import { Alert, Icon, Button } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import { Modal } from "@material-ui/core";
import "../../styles/DrawerStyle.scss";

const fileInputType = ".png, .jpeg, .jpg";
const acceptedType = ["image/png", "image/pjpeg", "image/jpeg"];
const isValid = (file) => acceptedType.includes(file.type);

const AvatarUploadBtn = ({ closeDashboard }) => {
  const [isOpen, open, close] = useModalState(false);

  const onSelect = (ev) => {
    const currfile = ev.target.files;

    if (currfile.length === 1) {
      const file = currfile[0];
      if (isValid(file)) {
        open();
      } else {
        closeDashboard();
        Alert.warning("wrong file type", 5000);
      }
    }
  };
  return (
    <div className="text-center mt-2">
      <div>
        <label>
          select and upload Image
          <input
            type="file"
            className="d-none"
            accept={fileInputType}
            onChange={onSelect}
          />
        </label>
      </div>

      <Modal open={isOpen} onClose={close}>
        <div className="Modal">
          <div>
            <p>Adjust and upload image</p>
            <Icon icon="close" onClick={close} />
          </div>

          <Button block color="blue">
            Upload
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarUploadBtn;
