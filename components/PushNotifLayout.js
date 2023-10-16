import React from "react";
import { ToastContainer, toast } from "react-toastify";

const PushNotifLayout = ({ children, title, message }) => {
  // Function to show the toast message
  const showToast = () => {
    toast(
      <div>
        <h5>{title}</h5>
        <h6>{message}</h6>
      </div>,
      {
        closeOnClick: true,
      },
    );
  };

  return (
    <>
      <ToastContainer />
      {children(showToast)}
      {/* Invoke the functions provided by the parent */}
    </>
  );
};

export default PushNotifLayout;
