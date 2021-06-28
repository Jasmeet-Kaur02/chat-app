import React from "react";
import { Button, Icon } from "rsuite";
import Dashboard from "./index.js";
import { useModalState } from "../../misc/custom-hooks";
import "../../styles/DrawerStyle.scss";
import classname from "classnames";

const DashboardToggle = () => {
  const [isOpen, open, close] = useModalState(false);
  const isMobile = window.screen.width < 992 ? true : false;

  const drawer = classname("drawer", {
    "drawer-open": isOpen && !isMobile,
    "drawer-open-mobile": isOpen && isMobile,
  });
  console.log(isMobile);
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>

      <div className={drawer} onClick={close}>
        <Dashboard />
      </div>
    </>
  );
};

export default DashboardToggle;
