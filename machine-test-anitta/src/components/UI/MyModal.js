import React from "react";
import BackDrop from "./BackDrop";

const MyModal = ({ children, isDisplay = false, onClose = () => {} }) => {
  if (!isDisplay) {
    return <></>;
  }
  return (
    <BackDrop>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            padding: "2rem",
            backgroundColor: "white",
            minWidth: "35rem",
          }}
        >
          {children}
        </div>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "white",
            marginLeft: ".5rem",
            cursor: "pointer",
          }}
          className={"bg-warning text-light"}
          onClick={onClose}
        >
          x
        </div>
      </div>
    </BackDrop>
  );
};

export default MyModal;
