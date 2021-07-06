import React from "react";
import { Button, Modal } from "rsuite";
import { Avatar, makeStyles } from "@material-ui/core";
import { useModalState } from "../../../misc/custom-hooks";
import "../../../styles/DrawerStyle.scss";
import { getName } from "../../../misc/helperFunctions";

const useStyles = makeStyles({
  avatar: {
    width: "150px",
    height: "150px",
  },
});

const memberSince = (createdAt) => new Date(createdAt).toLocaleDateString();

const ProfileInfoBtnModal = ({ profile }) => {
  const classes = useStyles();

  const [isOpen, open, close] = useModalState(false);

  const { name, avatar, createdAt } = profile;

  const shortName = name.split(" ")[0];

  return (
    <>
      <Button appearance="link" onClick={open} className="text-black p-0">
        {profile.name}
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName} profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex flex-column align-items-center mt-3">
            <Avatar src={avatar} className={classes.avatar}>
              {getName(name)}
            </Avatar>
            <h4>{name}</h4>
            <h6>member since {memberSince(createdAt)}</h6>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
