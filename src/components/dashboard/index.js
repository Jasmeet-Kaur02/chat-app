import React, { useEffect } from "react";
import { useProfile } from "../../context/profilecontext";
import { Button, Divider } from "@material-ui/core";
import "../../styles/DrawerStyle.scss";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/MailOutline";
import EditableInput from "../EditableInput";
import { database } from "../../misc/firebase";
import AvatarUploadBtn from "./AvatarUploadBtn";

const useStyles = makeStyles({
  signOutBtn: {
    backgroundColor: "orange",
    color: "white",
    margin: "10px 20px",
    "&:hover": {
      backgroundColor: "orange",
    },
  },
  mail: {
    marginRight: "10px",
  },
});

const Dashboard = ({ close, onSignOut }) => {
  const { profile } = useProfile();
  const [info, setInfo] = React.useState(null);
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      setInfo(null);
    }, 5000);
  }, [info]);

  const onSave = async (savedValue) => {
    const userRef = database.ref(`/profiles/${profile.uid}`).child("name");
    try {
      await userRef.set(savedValue);
      setInfo("your Name has been changed");
    } catch (error) {
      setInfo(error.message);
    }
  };
  return (
    <>
      <div className="header">
        <div className="title">
          Dashboard
          <CloseIcon onClick={close} />
        </div>

        <div className="body">
          <h4>Hey {profile.name}</h4>
          <div className="email">
            <MailIcon className={classes.mail} /> <p>{profile.email} </p>
          </div>
          <Divider />
        </div>

        <div>
          <EditableInput initialValue={profile.name} onSave={onSave} />
        </div>
      </div>

      <AvatarUploadBtn closeDashboard={close} />

      <div
        className="infoBox"
        style={{ transform: info ? "translateX(0px)" : "translateX(-270px)" }}
      >
        <p>{info}</p>
      </div>

      <Button className={classes.signOutBtn} onClick={onSignOut}>
        Sign Out
      </Button>
    </>
  );
};

export default Dashboard;
