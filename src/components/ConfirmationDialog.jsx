import React, { useContext } from "react";
import Modal from "react-modal";
import { LocaleContext } from "../context/LocaleContext";

const ConfirmationDialog = ({ isOpen, onRequestClose, onConfirm, message }) => {
  const { t } = useContext(LocaleContext);
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <p>{t("answer")}</p>
      <button onClick={onConfirm}>{t("yesButton")}</button>
      <button onClick={onRequestClose}>{t("noButton")}</button>
    </Modal>
  );
};

export default ConfirmationDialog;
