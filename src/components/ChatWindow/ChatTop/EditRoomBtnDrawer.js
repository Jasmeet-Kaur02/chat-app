import React, { useCallback } from "react";
import {
  Button,
  Drawer,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Schema,
  Alert,
} from "rsuite";
import { useModalState, useMediaQuery } from "../../../misc/custom-hooks";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { useParams } from "react-router-dom";
import { database } from "../../../misc/firebase";
import "../../../styles/utility.scss";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Room name is required"),
  description: StringType().isRequired("description is required"),
});

const EditRoomBtnDrawer = () => {
  const [isOpen, open, close] = useModalState(false);

  const name = useCurrentRoom((v) => v.name);

  const descrip = useCurrentRoom((v) => v.description);

  const [isLoading, setLoading] = React.useState(false);

  const formRef = React.useRef();

  const isMobile = useMediaQuery("(max-width : 992px)");

  const { chatId } = useParams();

  const [formData, setFormData] = React.useState({
    name: name,
    description: descrip,
  });

  const onChange = useCallback((value) => {
    setFormData(value);
  }, []);

  const onSave = async () => {
    let updates = {};

    updates[`rooms/${chatId}/name`] = formData.name;
    updates[`/rooms/${chatId}/description`] = formData.description;

    setLoading(true);
    try {
      await database.ref().update(updates);
      Alert.success("Room Information is Edited", 4000);
      setLoading(false);
      close();
    } catch (error) {
      Alert.error(error.message, 4000);
      setLoading(false);
      close();
    }
  };
  return (
    <>
      <Button
        color="red"
        style={{ borderRadius: "50%" }}
        onClick={open}
        size="sm"
      >
        A
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close}>
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
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
        </Drawer.Body>
        <Drawer.Footer>
          <div className="mb-4">
            <Button block color="blue" onClick={onSave} disabled={isLoading}>
              Edit
            </Button>
          </div>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default EditRoomBtnDrawer;
