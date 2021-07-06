import React, { memo } from "react";
import TimeAgo from "timeago-react";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import PresenceDot from "../../PresenceDot";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { auth } from "../../../misc/firebase";
import { Button } from "rsuite";

const MessageItems = ({ message, handleAdmins }) => {
  const { author, createdAt, text } = message;

  const admins = useCurrentRoom((v) => v.admins);
  const isAdmin = useCurrentRoom((v) => v.isAdmin);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAcces = isAdmin && !isAuthor;
  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center mb-1 font-bolder">
        <PresenceDot uid={author.uid} />
        <ProfileInfoBtnModal profile={author}>
          {canGrantAcces && (
            <Button color="blue" block onClick={() => handleAdmins(author.uid)}>
              {isMsgAuthorAdmin ? "Remove Admin" : "Give Admin Permission"}
            </Button>
          )}
        </ProfileInfoBtnModal>
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

export default memo(MessageItems);
