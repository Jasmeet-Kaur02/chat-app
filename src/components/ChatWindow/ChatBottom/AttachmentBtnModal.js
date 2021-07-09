import React from "react";
import { InputGroup, Modal, Button, Icon, Uploader, Alert } from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import { storage } from "../../../misc/firebase";
import { useParams } from "react-router-dom";

const Max_Files_Size = 1000 * 1024 * 5;

const AttachmentBtnModal = ({ afterUpload }) => {
  const [isOpen, open, close] = useModalState(false);
  const [fileList, setList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const { chatId } = useParams();

  const onChange = (filesArr) => {
    const filtered = filesArr
      .filter((el) => el.blobFile.size <= Max_Files_Size)
      .slice(0, 5);
    setList(filtered);
  };

  const onUpload = async () => {
    setLoading(true);
    try {
      const uploadPromises = fileList.map((file) => {
        return storage
          .ref(`/chat/${chatId}`)
          .child(Date.now() + file.name)
          .put(file.blobFile, {
            cacheControl: `public max-age=${3600 * 24 * 3}`,
          });
      });

      const uploadSnapShots = await Promise.all(uploadPromises);

      const shapePromises = uploadSnapShots.map(async (snap) => {
        return {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);

      await afterUpload(files);
      setLoading(false);
      close();
    } catch (error) {
      setLoading(false);
      close();
      Alert.error(error.message, 4000);
    }
  };

  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Uploader
            autoUpload="false"
            action=""
            fileList={fileList}
            multiple
            onChange={onChange}
            listType="picture-text"
            className="w-100"
            disabled={isLoading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block color="green" disabled={isLoading} onClick={onUpload}>
            Send to Chat
          </Button>
          <div className="text-right mt-2">
            <small>*files less than 5 MB can be seleted only</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttachmentBtnModal;
