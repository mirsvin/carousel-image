import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import AddImageModal from "./AddImageModal";
import EditImageModal from "./EditImageModal";
import { LocaleContext } from "./LocaleContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = () => {
  const { t } = useContext(LocaleContext);

  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddImage = (newImage) => {
    setImages([...images, newImage]);
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
      image === selectedImage ? updatedImage : image
    );
    setImages(updatedImages);
    setIsEditing(false);
  };

  const settings = {
    dots: images.length > 4, // Show dots if more than 4 images
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Show up to 5 images
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="image-carousel">
      <h2>{t("carouselTitle")}</h2>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} onClick={() => handleEditImage(image)}>
            <img
              src={image.url}
              alt={`Image ${index}`}
              style={{ maxHeight: 100, maxWidth: 150 }}
            />
            <p>{image.description}</p>
          </div>
        ))}
      </Slider>
      <button onClick={handleOpenModal}>{t("addButton")}</button>
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
      <Link to="/help">{t("helpButton")}</Link>
    </div>
  );
};

export default ImageCarousel;
