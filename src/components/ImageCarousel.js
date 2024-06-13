import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import AddImageModal from "./AddImageModal";
import EditImageModal from "./EditImageModal";
import { LocaleContext } from "../context/LocaleContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";

const ImageCarousel = () => {
  const { t } = useContext(LocaleContext);

  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [carouselVisible, setCarouselVisible] = useState(false);

  const handleAddImage = (newImage) => {
    // Add a unique ID to the new image
    newImage.id = Date.now();

    setImages([...images, newImage]);
    setIsModalOpen(false); // Close modal after adding image
    setCarouselVisible(true); // Show carousel after adding image
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditImage = (image) => {
    setSelectedImage(image);
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleUpdateImage = (updatedImage) => {
    const updatedImages = images.map((image) =>
      image.id === updatedImage.id ? updatedImage : image
    );
    setImages(updatedImages);
    setIsEditing(false);
  };

  const handleDeleteImage = (imageId) => {
    const updatedImages = images.filter((image) => image.id !== imageId);
    setImages(updatedImages);
    if (updatedImages.length === 0) {
      setCarouselVisible(false); // Hide carousel if no images left
    }
  };

  // Settings for the Slider
  const settings = {
    dots: true, // Always show dots
    infinite: images.length > 1, // Infinite scroll if more than 1 image
    speed: 500,
    slidesToShow: images.length >= 5 ? 5 : images.length, // Show up to 5 images or fewer if less than 5
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: images.length >= 4 ? 4 : images.length,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: images.length >= 3 ? 3 : images.length,
        },
      },
    ],
  };

  return (
    <div className="image-carousel">
      <div className="image-carousel-header">
        <h2>{t("carouselTitle")}</h2>
        <div className="image-carousel-buttons">
          <button onClick={handleOpenModal}>{t("addButton")}</button>
          <Link to="/help">{t("helpButton")}</Link>
        </div>
      </div>
      {carouselVisible && ( // Show carousel only if images are present
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image.id}>
              <img
                src={image.url}
                alt={image.description}
                style={{ maxHeight: 100, maxWidth: 150 }}
                onClick={() => handleEditImage(image)}
              />
              <p>{image.description}</p>
              <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
            </div>
          ))}
        </Slider>
      )}
      <AddImageModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onSave={handleAddImage}
      />
      {isEditing && (
        <EditImageModal
          isOpen={isEditing}
          onRequestClose={handleCloseEditModal}
          onSave={handleUpdateImage}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default ImageCarousel;
