import React, { useCallback } from "react";
import {
  Button,
  Icon,
  FormGroup,
  FormControl,
  ControlLabel,
  Form,
  Schema,
  Alert,
  Modal,
} from "rsuite";
import "../styles/DrawerStyle.scss";
import { useModalState } from "../misc/custom-hooks";
import { database, auth } from "../misc/firebase";
import firebase from "firebase/app";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Room name is required"),
  description: StringType().isRequired("description is required"),
});

const InitialForm = {
  name: "",
  description: "",
};

const CreateRoomBtnModal = () => {
  const [isOpen, open, close] = useModalState(false);

  const [formData, setFormData] = React.useState(InitialForm);
  const [isLoading, setLoading] = React.useState(false);

  const formRef = React.useRef();

  const onChange = useCallback((value) => {
    setFormData(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    const newData = {
      ...formData,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };

    setLoading(true);
    try {
      await database.ref("rooms").push(newData);
      close();
      Alert.success(`${formData.name} has been created`, 4000);
      setLoading(false);
      setFormData(InitialForm);
    } catch (error) {
      setLoading(false);
      close();
      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" /> Create new room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            fluid
            formValue={formData}
            onChange={onChange}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl name="name" placeholder="Enter Room Name" />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                name="description"
                componentClass="textarea"
                rows={5}
                placeholder="Enter room description"
              />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button block color="blue" onClick={onSubmit} disabled={isLoading}>
            Create Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
