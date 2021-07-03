import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  avatar: {
    width: "150px",
    height: "150px",
    fontSize: "70px",
  },
});

export const getName = (name) => {
  const splitName = name.toUpperCase().split(" ");

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }
  return splitName[0][0];
};

const ProfileAvatar = ({ name, profileImg }) => {
  const classes = useStyles();

  return (
    <Avatar src={profileImg} className={classes.avatar}>
      {getName(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
