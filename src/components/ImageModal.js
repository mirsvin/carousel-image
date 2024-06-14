import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { LocaleContext } from "../context/LocaleContext";
import "./ImageModal.css";

const ImageModal = ({ isOpen, onRequestClose, onSave, initialData = {} }) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { t } = useContext(LocaleContext);

  useEffect(() => {
    if (isOpen) {
      setUrl(initialData.url || "");
      setDescription(initialData.description || "");
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!url) {
      setError("URL является обязательным");
      return;
    }
    onSave({ ...initialData, url, description });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <h2>{t(initialData.url ? "headerEdit" : "headerAdd")}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <div className="input-container">
          <label>URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>{t("description")}</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-container">
          <button type="button" onClick={onRequestClose}>
            {t("cancelButton")}
          </button>
          <button type="button" onClick={handleSave}>
            {t("saveButton")}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ImageModal;
