import React from "react";
import { Whisper, Tooltip, Badge } from "rsuite";
import { usePresence } from "../misc/custom-hooks";

const getColor = (presence) => {
  if (!presence) {
    return "gray";
  }

  return presence.state === "online" ? "green" : "red";
};

const getText = (presence) => {
  if (!presence) {
    return "Unknown status";
  }
  return presence.state === "online"
    ? "Online"
    : `Last Seen ${new Date(presence.last_changed).toLocaleDateString}`;
};

const PresenceDot = ({ uid }) => {
  const presence = usePresence(uid);

  return (
    <Whisper
      placement="top"
      trigger="hover"
      speaker={<Tooltip>{getText(presence)}</Tooltip>}
    >
      <Badge
        style={{ backgroundColor: getColor(presence) }}
        className="cursor-pointer"
      />
    </Whisper>
  );
};

export default PresenceDot;
