import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ImageModal from "./ImageModal";
import { LocaleContext } from "../context/LocaleContext";
import LocaleSelector from "../context/LocaleSelector";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";
import ConfirmationDialog from "./ConfirmationDialog";

const ImageCarousel = () => {
  const { t } = useContext(LocaleContext);

  const [images, setImages] = useState(() => {
    const savedImages = localStorage.getItem("images");
    return savedImages ? JSON.parse(savedImages) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [carouselVisible, setCarouselVisible] = useState(images.length > 0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [direction, setDirection] = useState(images.length >= 5 ? "rtl" : "ltr");

  const sliderRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(images));
  }, [images]);

  const handleAddImage = (newImage) => {
    newImage.id = Date.now();
    setImages([...images, newImage]);
    setIsModalOpen(false);
    setCarouselVisible(true);
  };

  const handleOpenModal = () => {
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditImage = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleUpdateImage = (updatedImage) => {
    const updatedImages = images.map((image) =>
      image.id === updatedImage.id ? updatedImage : image
    );
    setImages(updatedImages);
    setIsModalOpen(false);
  };

  const handleDeleteImage = (imageId) => {
    const updatedImages = images.filter((image) => image.id !== imageId);
    setImages(updatedImages);
    if (updatedImages.length === 0) {
      setCarouselVisible(false);
    }
  };

  const openDeleteModal = (image) => {
    setImageToDelete(image);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setImageToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    handleDeleteImage(imageToDelete.id);
    closeDeleteModal();
  };

  const handleSelectImage = (imageId) => {
    setSelectedImageId(imageId);
  };

  const handleMouseEnter = () => {
    sliderRef.current.slickPause();
  };

  const handleMouseLeave = () => {
    sliderRef.current.slickPlay();
  };

  const handleSwipe = (e, delta) => {
    if (delta < 0 && direction === "rtl") {
      setDirection("ltr");
    } else if (delta > 0 && direction === "ltr") {
      setDirection("rtl");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: images.length >= 5 ? 5 : images.length,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    rtl: direction === "rtl",
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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
      <div className="sidebar">
        <button onClick={handleOpenModal}>+</button>
        <Link to="/help">?</Link>
        <LocaleSelector />
      </div>
      <div className="image-list-container">
        <h2>{t("imageList")}</h2>
        <div className="image-list">
          {images.map((image) => (
            <div
              key={image.id}
              className={`image-list-item ${selectedImageId === image.id ? 'selected' : ''}`}
              onClick={() => handleSelectImage(image.id)}
            >
              <input
                type="text"
                value={image.url}
                onChange={(e) =>
                  setImages(images.map((img) =>
                    img.id === image.id ? { ...img, url: e.target.value } : img
                  ))
                }
              />
              {selectedImageId === image.id && (
                <div className="button-container">
                  <button onClick={() => openDeleteModal(image)}>
                    {t("deleteButton")}
                  </button>
                  <button onClick={() => handleEditImage(image)}>
                    {t("editButton")}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {carouselVisible && (
        <div
          className="carousel-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Slider
            ref={sliderRef}
            {...settings}
            onSwipe={(e, delta) => handleSwipe(e, delta)}
          >
            {images.map((image) => (
              <div key={image.id} onClick={() => handleEditImage(image)}>
                <img
                  src={image.url}
                  alt={image.description}
                  className="carousel-image"
                />
                <p>{image.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onSave={selectedImage ? handleUpdateImage : handleAddImage}
        initialData={selectedImage || {}}
      />
      <ConfirmationDialog
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ImageCarousel;
