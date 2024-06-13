import React, { useState, useEffect } from "react";

const EditImageModal = ({ isOpen, onRequestClose, onSave, image }) => {
  const [editedImage, setEditedImage] = useState(image);

  useEffect(() => {
    setEditedImage(image);
  }, [image]);

  const handleSave = () => {
    onSave(editedImage);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedImage({ ...editedImage, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="edit-image-modal">
      <h2>Редактировать изображение</h2>
      <form>
        <label>
          URL изображения:
          <input type="text" name="url" value={editedImage.url} onChange={handleChange} />
        </label>
        <label>
          Описание:
          <input type="text" name="description" value={editedImage.description} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSave}>Сохранить</button>
        <button type="button" onClick={onRequestClose}>Отмена</button>
      </form>
    </div>
  );
};

export default EditImageModal;
