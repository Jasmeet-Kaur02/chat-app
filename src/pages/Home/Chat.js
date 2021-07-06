import React from "react";
import ChatTop from "../../components/ChatWindow/ChatTop/index.js";
import ChatBottom from "../../components/ChatWindow/ChatBottom/index.js";
import Messages from "../../components/ChatWindow/Messages/index.js";
import { useRooms } from "../../context/roomsContext";
import { Loader } from "rsuite";
import { useParams } from "react-router-dom";
import { CurrentRoomProvider } from "../../context/currentRoomContext";

const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms) {
    return <Loader center vertical size="md" speed="slow" content="Loading" />;
  }

  const currentRoom = rooms.find((room) => room.id === chatId);

  if (!currentRoom) {
    return <h5 className="text-center text-black-70 mt-page">No Room Found</h5>;
  }

  const { name, description } = currentRoom;

  const currentRoomData = {
    name,
    description,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>

      <div className="chat-middle">
        <Messages />
      </div>

      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
