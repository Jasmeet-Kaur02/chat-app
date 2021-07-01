import React, { useEffect } from "react";
import DashboardToggle from "./dashboard/DashboardToggle";
import CreateRoomBtnModal from "./CreateRoomBtnModal";
import ChatRoomLists from "./rooms/ChatRoomLists";
import { Divider } from "rsuite";

const Sidebar = () => {
  const [Height, setHeight] = React.useState(null);
  const topSidebarRef = React.useRef();

  useEffect(() => {
    if (topSidebarRef) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);
  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join Conversations</Divider>
      </div>
      <ChatRoomLists topSidebarHeight={Height} />
    </div>
  );
};

export default Sidebar;
