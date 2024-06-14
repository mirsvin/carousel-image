import React, { useState, useEffect, useContext, ChangeEvent } from "react";
import Modal from "react-modal";
import { LocaleContext, LocaleContextType } from "../context/LocaleContext";
import "./ImageModal.css";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (data: { url: string; description: string }) => void;
  initialData?: { url?: string; description?: string };
}

const ImageModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  onSave,
  initialData = {},
}: Props) => {
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { t } = useContext(LocaleContext) as LocaleContextType;

  useEffect(() => {
    if (isOpen) {
      setUrl(initialData.url || "");
      setDescription(initialData.description || "");
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    if (!url) {
      setError("URL является обязательным");
      return;
    }
    onSave({ url, description });
    onRequestClose();
  };

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
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
            onChange={handleChangeUrl}
          />
        </div>
        <div className="input-container">
          <label>{t("description")}</label>
          <input
            type="text"
            value={description}
            onChange={handleChangeDescription}
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
