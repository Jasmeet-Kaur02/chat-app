import React from "react";
import EditIcon from "@material-ui/icons/EditOutlined";
//import CheckIcon from "@material-ui/icons/CheckRounded";
//import ClearIcon from "@material-ui/icons/ClearRounded";
import { Icon } from "rsuite";
import { InputBase, FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/DrawerStyle.scss";

const useStyles = makeStyles({
  editBtn: {
    marginLeft: "8px",
    "&:hover": {
      backgroundColor: "#e7e7e7",
    },
  },
  input: {
    border: "none",
    marginTop: "15px",
    paddingLeft: "5px",
    borderRadius: "4px",
  },
});

const EditableInput = ({ initialValue, onSave }) => {
  const classes = useStyles();
  const [error, setError] = React.useState(null);
  const [value, setValue] = React.useState(initialValue);
  const [isEditable, setEditable] = React.useState(false);

  const inputChange = (e) => {
    setValue(e.target.value);
  };

  const onCancel = () => {
    setValue(initialValue);
    setEditable(false);
    setError(null);
  };

  const onCheck = async () => {
    const trimmed = value.trim();

    if (trimmed === "") {
      setError("you must specify your name");
      return;
    }
    if (trimmed !== initialValue) {
      await onSave(trimmed);
      setError(null);
    }
    setEditable(false);
  };
  return (
    <>
      <div className="inputLabel">
        <label>Name</label>
        <EditIcon
          className={classes.editBtn}
          onClick={() => setEditable(true)}
        />
      </div>
      <FormGroup className={classes.input}>
        <InputBase
          disabled={!isEditable}
          value={value}
          onChange={inputChange}
          endAdornment={[
            <Icon icon="close" style={closeBtn} onClick={onCancel} />,
            <Icon icon="check" style={checkBtn} onClick={onCheck} />,
          ]}
        />
      </FormGroup>
      <p className="inputErrorMsg">{error}</p>
    </>
  );
};

export default EditableInput;

const closeBtn = {
  backgroundColor: "#f1f1f1",
  padding: "8px",
  borderRadius: "2px",
  cursor: "pointer",
};

const checkBtn = {
  backgroundColor: "#f1f1f1",
  marginLeft: "1px",
  padding: "8px",
  borderRadius: "2px",
  cursor: "pointer",
};
