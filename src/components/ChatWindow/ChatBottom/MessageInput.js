import React from "react";
import { Alert, InputGroup, Input, Icon } from "rsuite";
import { useParams } from "react-router";
import { useProfile } from "../../../context/profilecontext";
import firebase from "firebase/app";
import { database } from "../../../misc/firebase";

const assembleMessage = (profile, chatId) => {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0,
  };
};

const MessageInput = () => {
  const [newMessage, setNewMessage] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const { profile } = useProfile();
  const { chatId } = useParams();

  const onChange = (val) => {
    setNewMessage(val);
  };

  const onSend = async () => {
    if (newMessage.trim() === " ") {
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = newMessage;

    const update = {};

    const messageId = database.ref("message").push().key;

    update[`messages/${messageId}`] = msgData;
    update[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      messageId: messageId,
    };
    setLoading(true);

    try {
      await database.ref().update(update);
      setNewMessage("");
      setLoading(false);
    } catch (err) {
      Alert.error(err.message);
      setLoading(false);
    }
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSend();
    }
  };

  return (
    <>
      <InputGroup>
        <Input
          placeholder="Write your message here..."
          value={newMessage}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Button disabled={isLoading} onClick={onSend} color="blue">
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </>
  );
};

export default MessageInput;
