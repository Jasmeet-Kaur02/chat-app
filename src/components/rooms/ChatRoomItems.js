import React from "react";
import TimeAgo from "timeago-react";
import { getName } from "../../misc/helperFunctions";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  avatar: {
    width: "30px",
    height: "30px",
    fontSize: "17px",
  },
});

const ChatRoomItems = ({ room }) => {
  const classes = useStyles();
  const { createdAt, name, lastMessage } = room;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{name}</h3>
        <TimeAgo
          datetime={
            lastMessage ? new Date(lastMessage.createdAt) : new Date(createdAt)
          }
          className="font-normal text-black-45"
        />
      </div>

      <div className="d-flex align-items-center text-black-70">
        {lastMessage ? (
          <>
            <div className="d-flex align-items-center">
              <Avatar
                src={lastMessage.author.avatar}
                className={classes.avatar}
              >
                {getName(lastMessage.author.name)}
              </Avatar>
            </div>

            <div className="text-disappear ml-2">
              <h6 className="italic">{lastMessage.author.name}</h6>
              <p>{lastMessage.text}</p>
            </div>
          </>
        ) : (
          <span>No messages yet...</span>
        )}
      </div>
    </>
  );
};

export default ChatRoomItems;
