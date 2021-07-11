import React, { memo } from "react";
import TimeAgo from "timeago-react";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import PresenceDot from "../../PresenceDot";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { auth } from "../../../misc/firebase";
import { Button } from "rsuite";
import { useHover, useMediaQuery } from "../../../misc/custom-hooks";
import IconBtnControl from "./IconBtnControl";
import ImgBtnModal from "./ImgBtnModal";

const MessageItems = ({ message, handleAdmins, handleLikes, handleDelete }) => {
  const { author, createdAt, text, file, likeCount, likes } = message;
  const [ref, isHovered] = useHover();

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  const isMobile = useMediaQuery("(max-width: 992px)");
  const canShowIcon = isMobile || isHovered;

  const admins = useCurrentRoom((v) => v.admins);
  const isAdmin = useCurrentRoom((v) => v.isAdmin);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAcces = isAdmin && !isAuthor;

  const renderFileMsg = (file) => {
    if (file.contentType.includes("image")) {
      return (
        <div className="height-220">
          <ImgBtnModal src={file.url} name={file.name} />
        </div>
      );
    }

    return <a href={file.url}>Download {file.name}</a>;
  };

  return (
    <li className={`padded mb-1 ${isHovered ? "bg-black-02" : ""}`} ref={ref}>
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
        <IconBtnControl
          {...(isLiked ? { color: "red" } : {})}
          isVisible={canShowIcon}
          icon="heart"
          tooltip={isLiked ? "unlike the message" : "like the message"}
          onClick={() => handleLikes(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcon}
            icon="close"
            tooltip="delete this message"
            onClick={() => handleDelete(message.id)}
          />
        )}
      </div>
      <div>
        {text && <span className="word-break-all">{text}</span>}
        {file && renderFileMsg(file)}
      </div>
    </li>
  );
};

export default memo(MessageItems);
