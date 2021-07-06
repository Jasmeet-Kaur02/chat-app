import React from "react";
import { useProfile } from "../../context/profilecontext";
import { Button, Drawer, Divider, Icon, Alert } from "rsuite";
import "../../styles/DrawerStyle.scss";
import EditableInput from "../EditableInput";
import { database } from "../../misc/firebase";
import AvatarUploadBtn from "./AvatarUploadBtn";
import { getUpdates } from "../../misc/helperFunctions";

const Dashboard = ({ close, onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async (savedValue) => {
    try {
      const updates = await getUpdates(
        profile.uid,
        "name",
        savedValue,
        database
      );
      await database.ref().update(updates);
      Alert.success("name has been changed");
    } catch (error) {
      Alert.error(error.message);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h4>Hey {profile.name}</h4>
        <div className="d-flex">
          <Icon icon="envelope-o" className="mr-2" size="lg" />
          <p>{profile.email} </p>
        </div>
        <Divider />
        <EditableInput
          initialValue={profile.name}
          onSave={onSave}
          label="Name"
        />
        <AvatarUploadBtn closeDashboard={close} />
      </Drawer.Body>

      <Drawer.Footer>
        <div className="mb-2">
          <Button block color="red" onClick={onSignOut}>
            Sign Out
          </Button>
        </div>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
