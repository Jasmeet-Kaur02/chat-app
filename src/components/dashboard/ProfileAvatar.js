import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { getName } from "../../misc/helperFunctions";

const useStyles = makeStyles({
  avatar: {
    width: "150px",
    height: "150px",
    fontSize: "70px",
  },
});

const ProfileAvatar = ({ name, profileImg }) => {
  const classes = useStyles();

  return (
    <Avatar src={profileImg} className={classes.avatar}>
      {getName(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
