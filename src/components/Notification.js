import React from "react";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";

const Notification = ({ type, message }) => {
    const dispatch = useDispatch()
  const notification = useSelector((state) => state.ui.notification);
function handleClose(){
dispatch(uiActions.showNotifications({
    open:false
}))
}
  return (
    <div>{notification.open && <Alert onClose={handleClose} severity={type}>{message}</Alert>}</div>
  );
  // console.log(type);
  // console.log(message);
  // return <div>hello</div>
};
export default Notification;
