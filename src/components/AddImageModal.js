import React, { useState } from "react";
import Modal from "react-modal";

const AddImageModal = ({ isOpen, onRequestClose, onSave }) => {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!url) {
      setError("URL является обязательным");
      return;
    }
    onSave({ url, description });
    onRequestClose();
    setUrl("");
    setDescription("");
    setError("");
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <h2>Добавить изображение</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <div>
          <label>URL изображения</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div>
          <label>Описание</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <button type="button" onClick={onRequestClose}>Отмена</button>
          <button type="button" onClick={handleSave}>Сохранить</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddImageModal;
