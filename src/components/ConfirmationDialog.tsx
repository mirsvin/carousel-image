import React, { useContext } from "react";
import Modal from "react-modal";
import { LocaleContext, LocaleContextType } from "../context/LocaleContext";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onRequestClose, onConfirm }) => {
  const { t } = useContext(LocaleContext) as LocaleContextType;
  
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
