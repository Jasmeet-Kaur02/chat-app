import React, { memo } from "react";
import { useCurrentRoom } from "../../context/currentRoomContext";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../../misc/custom-hooks";
import { Icon, Button } from "rsuite";
import "../../styles/utility.scss";
import RoomInfoBtnModal from "./RoomInfoBtnModal";

const ChatTop = () => {
  const name = useCurrentRoom((v) => v.name);
  const isMobile = useMediaQuery("(max-width: 992px)");
  console.log(isMobile);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <span
            className={
              isMobile ? "d-inline-block p-0 mr-2 link-unstyled" : "d-none"
            }
          >
            <Icon icon="angle-left" componentClass={Link} to="/" size="2x" />
          </span>
          <span>{name}</span>
        </h4>
        <Button>todo</Button>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <Button className="px-0">todo</Button>
        <RoomInfoBtnModal />
      </div>
    </>
  );
};

export default memo(ChatTop);
