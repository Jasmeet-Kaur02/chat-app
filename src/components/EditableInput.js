import React from "react";
import EditIcon from "@material-ui/icons/EditOutlined";
import { Icon, Alert } from "rsuite";
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
    paddingLeft: "5px",
    borderRadius: "4px",
  },
});

const EditableInput = ({ initialValue, onSave, label }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(initialValue);
  const [isEditable, setEditable] = React.useState(false);

  const inputChange = (e) => {
    setValue(e.target.value);
  };

  const onCancel = () => {
    setValue(initialValue);
    setEditable(false);
  };

  const onCheck = async () => {
    const trimmed = value.trim();

    if (trimmed === "") {
      Alert.info("you must specify your name");
      return;
    }
    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }
    setEditable(false);
  };
  return (
    <>
      <div className="inputLabel">
        <label>{label}</label>
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
            <Icon
              icon="close"
              style={isEditable ? closeBtn : hide}
              onClick={onCancel}
            />,
            <Icon
              icon="check"
              style={isEditable ? checkBtn : hide}
              onClick={onCheck}
            />,
          ]}
        />
      </FormGroup>
    </>
  );
};

export default EditableInput;

const closeBtn = {
  //backgroundColor: "#f1f1f1",
  fontSize: "15px",
  color: "black",
  padding: "9px",
  borderRadius: "2px",
  cursor: "pointer",
};

const checkBtn = {
  //backgroundColor: "#f1f1f1",
  fontSize: "15px",
  color: "black",
  marginLeft: "1px",
  padding: "8px",
  borderRadius: "2px",
  cursor: "pointer",
};

const hide = {
  display: "none",
};
