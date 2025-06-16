import { useState, useEffect, useRef } from 'react';
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

interface Property {
    image: string;
    title: string; 
}

interface FeaturedPropertiesProps {
    awards: Property[];
}

const Awards = ({ awards }: FeaturedPropertiesProps) => {
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Side effect - Set loading state
        if (awards.length > 0) {
            setLoading(false);
        }
    }, [awards]);

    useEffect(() => {
        if (!loading && swiperRef.current) {
            const swiperInstance = new Swiper(swiperRef.current, {
                speed: 400,
                spaceBetween: 30,
                loop: true,
                autoplay: false,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    480: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1300: {
                        slidesPerView: 4,
                    },
                    1600: {
                        slidesPerView: 5,
                    }
                },
                navigation: {
                    nextEl: ".swiper-button-nexti",
                    prevEl: ".swiper-button-previ",
                },
            });

            return () => {
                swiperInstance.destroy();
            };
        }
    }, [loading]);

    return (
        <div
            className="col-sm-12 section section-featured section-artner"
            id="section-artner-id"
            style={{ borderLeft: '1px solid #eee', paddingTop: '60px', background: '#fff' }}
        >
            <div className="container">
                <div className="row">
                    <div className="col col-sm-12 page-content clearfix">
                        <div className="featured-title-hold text-left clearfix">
                            <h3 className="site-h1 text-center">Awards</h3>
                        </div>
                    </div>
                </div>

                

                    {loading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                        </div>
                    )}

                <div id="partner-slider1">
                    <div className="row team-memb1 partner-container" style={{ position: 'relative' }}>
                        <div className="swiper-container swiper-container-new" id="awards-sect1">
                            <div className="swiper-wrapper">
                            {awards.map((award, index) => (
                                <div key={index} className="swiper-slide">
                                    <div key={index} className="swiper-slide">
                                        <div className="card card-tertiary" data-id="459">
                                            <div className="card-image" data-id={index}>
                                                <img
                                                    src={award.image}
                                                    sizes="248px"
                                                    alt={award.title}
                                                    className="stb_image-team-thumbnail"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Swiper Navigation */}
                <div className="swiper-nav" style={{ marginTop: '15px', display: 'none' }}>
                    <div className="swiper-button-prev swiper-button-prev-award swiper-arrows"></div>
                    <div className="swiper-button-next swiper-button-next-award swiper-arrows"></div>
                    <div className="swiper-pagination swiper-pagination12"></div>
                </div>
            </div>
        </div>
    );
};

export default Awards;
