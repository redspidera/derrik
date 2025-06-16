import { useState, useEffect } from 'react';
import lozad from 'lozad';
import { Swiper, SwiperSlide } from 'swiper/react';

const BannerComponent = ({ images }: { images: string[]  }) => {
    
    const [isImageOpen, setIsImageOpen] = useState(false);

    useEffect(() => {
        const observer = lozad('.lozad', {
            loaded: (el: HTMLElement) => {
                el.classList.add('loaded');
            }
        });
        observer.observe();
    }, []);

  

    const returnImg = (img: string, count: number, width: number = 600) => {
        return (
            <div key={count} className={`photo${count} photo-layer lozad`} data-background-image={img} style={{ width: `${width}px` }}></div>
        );
    };

    const renderImages = () => {
        return images.map((image, index) => (
            <SwiperSlide key={index}>
                <div className="swiper-slide-container">
                    <img data-src={image} src={image} className="lozad" alt={`property-img-${index}`} />
                </div>
            </SwiperSlide>
        ));
    };

    const renderImageGrid = () => {
        const size = images.length;
        if (size >= 5) {
            return (
                <div className="photo-5 banner_detail">
                    <div className="photo-grid-5 photo-grid">
                        {returnImg(images[0], 1)}
                    </div>
                    <div className="photo-grid-5 photo-grid bulk-layer">
                        <div className="photo-grid">
                            {returnImg(images[1], 2)}
                            {returnImg(images[2], 3)}
                        </div>
                        <div className="photo-grid">
                            {returnImg(images[3], 4)}
                            {returnImg(images[4], 5)}
                            {size > 5 && <span className="remaining">+{size - 5}</span>}
                        </div>
                    </div>
                </div>
            );
        } else if (size === 4) {
            return (
                <div className="photo-4 banner_detail">
                    <div className="photo-grid-4 photo-grid">
                        {returnImg(images[0], 1)}
                    </div>
                    <div className="photo-grid-4 photo-grid bulk-layer">
                        <div className="photo-grid">
                            {returnImg(images[1], 2)}
                        </div>
                        <div className="photo-grid">
                            {returnImg(images[2], 3)}
                            {returnImg(images[3], 4)}
                        </div>
                    </div>
                </div>
            );
        } else if (size === 3) {
            return (
                <div className="photo-3 banner_detail">
                    <div className="photo-grid-3 photo-grid">
                        {returnImg(images[0], 1)}
                    </div>
                    <div className="photo-grid-3 photo-grid bulk-layer">
                        <div className="photo-grid">
                            {returnImg(images[1], 2)}
                        </div>
                        <div className="photo-grid">
                            {returnImg(images[2], 3)}
                        </div>
                    </div>
                </div>
            );
        } else if (size === 2) {
            return (
                <div className="photo-2 banner_detail">
                    <div className="photo-grid-2 photo-grid">
                        {returnImg(images[0], 1)}
                    </div>
                    <div className="photo-grid-2 photo-grid bulk-layer">
                        {returnImg(images[1], 2)}
                    </div>
                </div>
            );
        } else if (size === 1) {
            return (
                <div className="photo-2 banner_detail">
                    <div className="photo-grid-1 photo-grid">
                        {returnImg(images[0], 1, 900)}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            {/* 3D Video Popup */}
         

            {/* Image Gallery */}
            <div className="position-relative">
            <a href="#" className="imphotos_0" onClick={() => setIsImageOpen(true)}></a>

            {/* Banner Rendering */}
            {renderImageGrid()}
            <div className="clearfix"></div>
            </div>

            {/* Image Popup */}
            {isImageOpen && (
                <div className="openimagediv">
                    <div id="main-header-top">
                        <ul className="info-x">
                            
                            <li style={{ fontSize: '22px' }} className="allow-left">{images.length} Photos</li>
                            <li className="pull-right text-right pr-2 no-m-d11">
 
                                    <a href="javscript:void(0)" className=" " onClick={() => setIsImageOpen(false)}>
                                        <img src="/img/close-window.png" alt="" className="" />
                                    </a>
                            </li>
                        </ul>
                    </div>

                    <div className="container img-cntai"> 
                        <Swiper className="  swiper-container gallery-top " spaceBetween={10} centeredSlides={false} loop={false} navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}>
                            {renderImages()}
                        </Swiper>

                        {/* Thumbnail Gallery */}
                        <Swiper className=" gallery-thumbs" spaceBetween={10} slidesPerView="auto" touchRatio={0.2} loop={false} navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}>
                            {renderImages()}
                        </Swiper>

                        {/* Swiper Navigation Buttons */}
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerComponent;
