import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import GroupEditModal from "./GroupEditModal";
import { useState } from "react";
export default function GroupItem(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(!show);
  };

  const { groupValue, teacherValue } = props;
  return (
    <>
      <div className="cursor-pointer" onClick={handleShow}>
        <Stack
          direction="row"
          spacing={1}
          className="hover:bg-slate-400 rounded-[50px]"
        >
          <Chip
            avatar={<Avatar>{groupValue[0]}</Avatar>}
            label={groupValue + " | " + teacherValue}
            variant="outlined"
            title={teacherValue}
          />
        </Stack>
      </div>
      <GroupEditModal
        key={props.groupValue}
        handleClose={handleClose}
        show={show}
        props={props}
      />
    </>
  );
}
