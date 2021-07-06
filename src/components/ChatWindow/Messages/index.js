import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { transformToArray } from "../../../misc/helperFunctions";
import MessageItems from "./MessageItems";
import { database } from "../../../misc/firebase";
import "../../../styles/utility.scss";
import { Alert } from "rsuite";

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

  const handleAdmins = useCallback(
    async (uid) => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);
      let alertMsg;
      await adminsRef.transaction((admins) => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = "Admin Permission Removed";
          } else {
            admins[uid] = true;
            alertMsg = "Admin Permission Added";
          }
        }
        return admins;
      });
      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isEmpty && <li>No Messages yet...</li>}
      {canShowMessages &&
        messages.map((msg) => (
          <MessageItems
            key={msg.id}
            message={msg}
            handleAdmins={handleAdmins}
          />
        ))}
    </ul>
  );
};

export default Messages;
