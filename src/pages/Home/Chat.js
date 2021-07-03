import React from "react";
import ChatTop from "../../components/ChatWindow/ChatTop";
import ChatBottom from "../../components/ChatWindow/ChatBottom";
import Messages from "../../components/ChatWindow/messages";
import { useRooms } from "../../context/roomsContext";
import { Loader } from "rsuite";
import { useParams } from "react-router-dom";

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

  return (
    <>
      <div className="chat-top">
        <ChatTop />
      </div>

      <div className="chat-middle">
        <Messages />
      </div>

      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </>
  );
};

export default Chat;
