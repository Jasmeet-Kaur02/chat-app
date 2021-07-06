import React from "react";
import TimeAgo from "timeago-react";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import PresenceDot from "../../PresenceDot";

const MessageItems = ({ message }) => {
  const { author, createdAt, text } = message;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center mb-1 font-bolder">
        <PresenceDot uid={author.uid} />
        <ProfileInfoBtnModal profile={author} />
        <span className="ml-2">
          <TimeAgo
            datetime={new Date(createdAt)}
            className="font-normal text-black-45"
          />
        </span>
      </div>
      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItems;
