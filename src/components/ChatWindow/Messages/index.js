import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { transformToArray } from "../../../misc/helperFunctions";
import MessageItems from "./MessageItems";
import { database } from "../../../misc/firebase";
import "../../../styles/utility.scss";

const Messages = () => {
  const [messages, setMessages] = React.useState(null);
  const { chatId } = useParams();

  const isEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  useEffect(() => {
    const msgRef = database.ref("messages");
    msgRef
      .orderByChild("roomId")
      .equalTo(chatId)
      .on("value", (snap) => {
        const data = transformToArray(snap.val());

        setMessages(data);
      });

    return () => {
      msgRef.off("value");
    };
  }, [chatId]);
  return (
    <ul className="msg-list custom-scroll">
      {isEmpty && <li>No Messages yet...</li>}
      {canShowMessages &&
        messages.map((msg) => <MessageItems key={msg.id} message={msg} />)}
    </ul>
  );
};

export default Messages;
