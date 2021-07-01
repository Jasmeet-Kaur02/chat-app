import React from "react";
import { Nav, Loader } from "rsuite";
import ChatRoomItems from "./ChatRoomItems";
import { useRoomsContext } from "../../context/roomsContext";
import { Link, useLocation } from "react-router-dom";

const ChatRoomLists = ({ topSidebarHeight }) => {
  const rooms = useRoomsContext();
  const location = useLocation();
  console.log(rooms);
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${topSidebarHeight}px )`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical size="md" sped="slow" content="Loading" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map((room) => {
          return (
            <Nav.Item
              key={room.id}
              componentClass={Link}
              to={`/chat/${room.id}`}
              eventKey={`/chat/${room.id}`}
            >
              <ChatRoomItems room={room} />
            </Nav.Item>
          );
        })}
    </Nav>
  );
};

export default ChatRoomLists;
