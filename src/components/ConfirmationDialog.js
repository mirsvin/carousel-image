import React from "react";

const ConfirmationDialog = ({ isOpen, onRequestClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog">
      <p>{message}</p>
      <button onClick={onConfirm}>Да</button>
      <button onClick={onRequestClose}>Нет</button>
    </div>
  );
};

export default ConfirmationDialog;
