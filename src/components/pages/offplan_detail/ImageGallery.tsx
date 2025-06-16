import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles

// Import necessary modules from Swiper
import { Navigation, Thumbs } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";

// Import Fancybox styles
import '@fancyapps/ui/dist/fancybox/fancybox.css'; // Ensure Fancybox styles are included

// Initialize Swiper with Navigation and Thumbs modules
import { Swiper as SwiperCore } from "swiper";
SwiperCore.use([Navigation, Thumbs]);

interface GalleryProps {
  images: { image_name: string; caption: string }[]; // Array of image objects with 'image_name' and 'caption' fields
}

const ImageGallery: React.FC<GalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // Initialize Fancybox on mount
  useEffect(() => {
    // Initialize Fancybox only when the images are ready
    Fancybox.bind('[data-fancybox="gallery"]', {
      // Optional settings, like caption, etc.
       
    });
  }, [images]); // Re-run this effect if images change

  return (
    <div className="new-fancy mt-40  container pb-0">
      {/* Main image slider with 2 items per slide */}
      <Swiper
        spaceBetween={15}
        slidesPerView={2}  // Display 2 items per slide
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        loop
        className="main-slider mb15"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <a href={image.image_name} data-fancybox="gallery" data-caption={image.caption}>
              <img src={image.image_name} alt={`Image ${index + 1}`} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={15}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        loop
        className="thumb-slider"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.image_name} alt={`Thumbnail ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageGallery;
