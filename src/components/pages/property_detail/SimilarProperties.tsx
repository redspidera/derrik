import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useAOS from '@/components/utility/useAOS';
import { Typography } from '@mui/material';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyCard2, { PropertyData } from '@/components/pages/property_listing/PropertyCard2';
import 'swiper/swiper-bundle.css';

import { API_URL } from '@/Constants';
import PropertyCardLoading from '@/components/pages/property_listing/PropertyCardLoading';

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface SimilarPropertiesProps {
    property: PropertyData;
}

const SimilarProperties = ({ property }: SimilarPropertiesProps) => {
    const [featuredListing, setFeaturedListing] = useState<PropertyData[]>([]);
    const [loading, setLoading] = useState(true);
    const hasFetched = useRef(false);
    const swiperRef = useRef<HTMLDivElement>(null);
    useAOS();
    useEffect(() => {
        const fetchFeaturedListings = async () => {
            if (property && !hasFetched.current) {
                try {
                    hasFetched.current = true;
                    const response = await fetch(`${API_URL}featured_listings/property/${property.ad_id}`);
                    const data = await response.json();
                    setFeaturedListing(data);
                } catch (error) {
                    console.error("Error fetching featured listings:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (!featuredListing.length && property) {
            fetchFeaturedListings();
        }
    }, [property]);

    // Equal height logic
    const adjustHeights = () => {
        if (!swiperRef.current) return;
        const cards = swiperRef.current.querySelectorAll('.property-card');
        if (!cards.length) return;

        let maxHeight = 0;

        // Reset heights
        cards.forEach(card => {
            (card as HTMLElement).style.height = 'auto';
        });

        // Get max height
        cards.forEach(card => {
            const height = (card as HTMLElement).offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });

        // Set all to max
        cards.forEach(card => {
            (card as HTMLElement).style.height = `${maxHeight}px`;
        });
    };

    useEffect(() => {
        if (!loading && featuredListing.length > 0) {
            const timeout = setTimeout(() => {
                adjustHeights();
            }, 400); // allow content/images to render

            window.addEventListener('resize', adjustHeights);

            return () => {
                clearTimeout(timeout);
                window.removeEventListener('resize', adjustHeights);
            };
        }
    }, [loading, featuredListing]);

    return (
        <div className="auto-container section-fet-home">
            <div className="row">
                <div className="col col-sm-12 page-content clearfix">
                    <div className="featured-title-hold text-center clearfix">
                        <h3 className="site-h1 animate">
                            <div className="line-container-parent">
                                <div className="lines-container flex-end">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,           // margin bottom to space below heading
                                        color: 'primary.main',
                                    }}
                                    data-aos="fade-right" data-aos-delay="500"
                                >
                                    Similar Properties
                                </Typography> 
                                <div className="lines-container">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                            </div> 
                        </h3>
                    </div>

                    {loading ? (
                        <div className="row">
                            <PropertyCardLoading />
                            <PropertyCardLoading />
                            <PropertyCardLoading />
                        </div>
                    ) : (
                        <div ref={swiperRef}>
                            <Swiper
                                spaceBetween={30}
                                loop={true}
                                navigation={{
                                    nextEl: '.swiper-button-nexti',
                                    prevEl: '.swiper-button-previ',
                                }}
                                pagination={{
                                    el: '.swiper-pagination12',
                                    clickable: true,
                                }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    640: { slidesPerView: 2 },
                                    992: { slidesPerView: 4 },
                                    1300: { slidesPerView: 4 },
                                    1600: { slidesPerView: 5 },
                                }}
                                className="swiper-wrapper"
                            >
                                {featuredListing.map((property, index) => (
                                    <SwiperSlide key={`${property.id}-${index}`}>
                                        <div className="property-card">
                                            <PropertyCard2 property={property} />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    <div className="swiper-nav">
                        <div className="swiper-button-prev swiper-button-previ swiper-arrows"></div>
                        <div className="swiper-button-next swiper-button-nexti swiper-arrows"></div>
                        <div className="swiper-pagination swiper-pagination12"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimilarProperties;
