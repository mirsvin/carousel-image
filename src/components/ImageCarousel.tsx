import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import ImageModal from "./ImageModal";
import { LocaleContext, LocaleContextType } from "../context/LocaleContext";
import LocaleSelector from "../context/LocaleSelector";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";
import ConfirmationDialog from "./ConfirmationDialog";

interface Image {
  id: number;
  url: string;
  description: string;
}

const ImageCarousel: React.FC = () => {
  const { t } = useContext(LocaleContext) as LocaleContextType;

  const [images, setImages] = useState<Image[]>(() => {
    const savedImages = localStorage.getItem("images");
    return savedImages ? JSON.parse(savedImages) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [carouselVisible, setCarouselVisible] = useState<boolean>(images.length > 0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [imageToDelete, setImageToDelete] = useState<Image | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [direction, setDirection] = useState<"rtl" | "ltr">(images.length >= 5 ? "rtl" : "ltr");

  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(images));
  }, [images]);

  const handleAddImage = (data: { url: string; description: string }) => {
    const newImage: Image = {
      id: Date.now(),
      url: data.url,
      description: data.description,
    };
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

  const handleEditImage = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleUpdateImage = (data: { url: string; description: string }) => {
    if (selectedImage) {
      const updatedImage: Image = {
        ...selectedImage,
        url: data.url,
        description: data.description,
      };
      const updatedImages = images.map((image) =>
        image.id === updatedImage.id ? updatedImage : image
      );
      setImages(updatedImages);
      setIsModalOpen(false);
    }
  };

  const handleDeleteImage = (imageId: number) => {
    const updatedImages = images.filter((image) => image.id !== imageId);
    setImages(updatedImages);
    if (updatedImages.length === 0) {
      setCarouselVisible(false);
    }
  };

  const openDeleteModal = (image: Image) => {
    setImageToDelete(image);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setImageToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    if (imageToDelete) {
      handleDeleteImage(imageToDelete.id);
      closeDeleteModal();
    }
  };

  const handleMouseEnter = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
    }
  };

  const handleMouseLeave = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  };

  const handleSwipe = (swipeDirection: string) => {
    if (swipeDirection === "left" && direction === "rtl") {
      setDirection("ltr");
    } else if (swipeDirection === "right" && direction === "ltr") {
      setDirection("rtl");
    }
  };

  const handleListItemClick = (imageId: number) => {
    if (selectedImageId === imageId) {
      setSelectedImageId(null);
    } else {
      setSelectedImageId(imageId);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".image-list-item")) {
      setSelectedImageId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 1000,
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
              onClick={() => handleListItemClick(image.id)}
            >
              <textarea
                value={image.url}
                onChange={(e) =>
                  setImages(images.map((img) =>
                    img.id === image.id ? { ...img, url: e.target.value } : img
                  ))
                }
                rows={1} // Initial number of rows
                placeholder="Enter URL..."
                className="image-url-textarea"
                readOnly
              />
              {selectedImageId === image.id && (
                <div className="button-container" style={{ marginTop: '10px' }}>
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
            onSwipe={handleSwipe}
          >
            {images.map((image) => (
              <div key={image.id} className="carousel-image-container" onClick={() => handleEditImage(image)}>
                <img
                  src={image.url}
                  alt={image.description}
                  className="carousel-image"
                />
                <div className="image-description">
                  <p>{image.description}</p>
                </div>
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
