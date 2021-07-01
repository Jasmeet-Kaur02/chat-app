import React from "react";
import { Alert, Icon, Button } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import { Modal } from "@material-ui/core";
import "../../styles/DrawerStyle.scss";
import AvatarEditor from "react-avatar-editor";
import { storage, database } from "../../misc/firebase";
import { useProfile } from "../../context/profilecontext";
import ProfileAvatar from "./ProfileAvatar";

const fileInputType = ".png, .jpeg, .jpg";
const acceptedType = ["image/png", "image/pjpeg", "image/jpeg"];
const isValid = (file) => acceptedType.includes(file.type);
const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File proceseed error"));
      }
    });
  });
};

const AvatarUploadBtn = ({ closeDashboard }) => {
  const { profile } = useProfile();
  const [isLoading, setLoading] = React.useState(false);
  const [img, setImg] = React.useState(null);
  const [isOpen, open, close] = useModalState(false);
  const AvatarRef = React.createRef();

  const onSelect = (ev) => {
    const currfile = ev.target.files;

    if (currfile.length === 1) {
      const file = currfile[0];

      if (isValid(file)) {
        setImg(file);
        open();
      } else {
        closeDashboard();
        Alert.warning("wrong file type", 5000);
      }
    }
  };

  const onUpload = async () => {
    setLoading(true);
    const canvas = AvatarRef.current.getImageScaledToCanvas();
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });
      console.log(uploadAvatarResult);

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const databaseRef = database
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      await databaseRef.set(downloadUrl);

      Alert.info("image uploaded", 6000);

      setLoading(false);
      close();
    } catch (error) {
      Alert.warning(error.message, 6000);

      setLoading(false);
      close();
    }
  };
  return (
    <>
      <div className="d-flex flex-column align-items-center mt-4">
        <ProfileAvatar name={profile.name} profileImg={profile.avatar} />
        <div className="mt-2">
          <label>
            select and upload Image
            <input
              type="file"
              className="d-none"
              accept={fileInputType}
              onChange={onSelect}
            />
          </label>
        </div>
      </div>

      <Modal open={isOpen} onClose={close}>
        <div className="Modal">
          <div className="d-flex justify-content-between mb-2">
            <p>Adjust and upload image</p>
            <Icon icon="close" onClick={close} />
          </div>

          <div className="d-flex justify-content-center mb-2">
            {img && (
              <AvatarEditor
                ref={AvatarRef}
                image={img}
                width={200}
                height={200}
                border={10}
                borderRadius={100}
                rotate={0}
              />
            )}
          </div>

          <Button block color="blue" onClick={onUpload} disabled={isLoading}>
            Upload
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AvatarUploadBtn;
