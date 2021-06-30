import React from "react";
import { Button, Icon } from "rsuite";
import Dashboard from "./index.js";
import { useModalState } from "../../misc/custom-hooks";
import { auth } from "../../misc/firebase.js";
import Drawer from "@material-ui/core/Drawer";

const DashboardToggle = () => {
  const [isOpen, open, close] = useModalState(false);

  const onSignOut = () => {
    auth.signOut();
    close();
  };
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>

      <Drawer anchor="left" open={isOpen} onClose={close} variant="temporary">
        <Dashboard close={close} onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
