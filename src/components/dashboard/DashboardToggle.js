import React from "react";
import { Button, Icon, Drawer, Alert } from "rsuite";
import Dashboard from "./index.js";
import { useModalState } from "../../misc/custom-hooks";
import { auth, database } from "../../misc/firebase.js";
import { useMediaQuery } from "../../misc/custom-hooks";
import { isOfflineForDatabase } from "../../context/profilecontext";

const DashboardToggle = () => {
  const [isOpen, open, close] = useModalState(false);
  const isMobile = useMediaQuery("(max-width: 992px)");

  const onSignOut = () => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        close();
      })
      .catch((error) => {
        Alert.error(error.message);
      });
  };
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard close={close} onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
