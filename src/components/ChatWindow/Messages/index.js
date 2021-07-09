import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { transformToArray, groupBy } from "../../../misc/helperFunctions";
import MessageItems from "./MessageItems";
import { database, auth } from "../../../misc/firebase";
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

  const handleLikes = useCallback(async (msgId) => {
    const { uid } = auth.currentUser;
    const msgRef = database.ref(`/messages/${msgId}`);

    await msgRef.transaction((msg) => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
        } else {
          msg.likeCount += 1;

          if (!msg.likes) {
            msg.likes = {};
          }

          msg.likes[uid] = true;
        }
      }
      return msg;
    });
  }, []);

  const handleDelete = useCallback(
    async (msgId) => {
      if (!window.confirm("Delete this message")) {
        return;
      }

      const updates = {};
      const isLast = msgId === messages[messages.length - 1].id;
      updates[`/messages/${msgId}`] = null;

      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          messageId: messages[messages.length - 2].id,
        };
      }

      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await database.ref().update(updates);
      } catch (error) {
        Alert.error(error.message, 4000);
      }
    },
    [chatId, messages]
  );

  const renderMessages = () => {
    const groups = groupBy(messages, (item) => {
      return new Date(item.createdAt).toDateString();
    });
    let items = [];

    Object.keys(groups).forEach((date) => {
      items.push(<li className="mb-1 text-center padded">{date}</li>);

      const msgs = groups[date].map((msg) => (
        <MessageItems
          key={msg.id}
          message={msg}
          handleAdmins={handleAdmins}
          handleLikes={handleLikes}
          handleDelete={handleDelete}
        />
      ));

      items.push(...msgs);
    });

    return items;
  };

  return (
    <ul className="msg-list custom-scroll">
      {isEmpty && <li>No Messages yet...</li>}
      {canShowMessages && renderMessages()}
    </ul>
  );
};

export default Messages;
