import React from "react";
import { useCurrentRoom } from "../../context/currentRoomContext";

const ChatTop = () => {
  const name = useCurrentRoom((v) => v.name);

  return <div>{name}</div>;
};

export default ChatTop;
