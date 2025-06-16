import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyCard2, { PropertyData } from '../property_listing/PropertyCard2';
import 'swiper/swiper-bundle.css';
import PropertyCardLoading from '@/components/pages/property_listing/PropertyCardLoading';

import { Typography } from '@mui/material';

SwiperCore.use([Navigation, Pagination, Autoplay]);
interface Content {
    heading: string;
    image1: string;
    image2: string;
    content: string;
    call_to_action_link: string;
    call_to_action: string;
}


interface ResidentialPropertiesProps {
    featuredListing: PropertyData[];
    content: Content | null;
}

const ResidentialProperties = ({ featuredListing, content }: ResidentialPropertiesProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (featuredListing.length > 0) {
            setLoading(false);
        }
    }, [featuredListing]);
    const setEqualHeights = () => {
        const cards = document.querySelectorAll('.swiper-slide .property-card');
        let maxHeight = 0;

        cards.forEach(card => {
            (card as HTMLElement).style.height = 'auto';
        });

        cards.forEach(card => {
            const height = (card as HTMLElement).offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        cards.forEach(card => {
            (card as HTMLElement).style.height = `${maxHeight}px`;
        });
    };

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setEqualHeights();
                window.addEventListener('resize', setEqualHeights);
            }, 300);

            return () => {
                window.removeEventListener('resize', setEqualHeights);
            };
        }
    }, [loading]);
    return (
        <section id="services" className="services section text-left all-new new-sl wh">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row gy-5">
                    <div className="col-xl-12 col-md-12" data-aos="zoom-in" data-aos-delay="200">
                        <div className="service-title">
                            <div className=" ">
                                <div className="row">
                                    <div className="col-sm-8">

                                        <Typography
                                            variant="h2"
                                            component="h2"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1,           // margin bottom to space below heading
                                                color: 'primary.main',
                                            }}
                                            data-aos="fade-up" data-aos-delay="300"
                                        >
                                            {content && content.heading}
                                        </Typography>

                                        <p className="fs-6 mb25" data-aos="fade-up" data-aos-delay="400">
                                            {content && (
                                                <div dangerouslySetInnerHTML={{ __html: content.content || '' }} />
                                            )}
                                        </p>
                                    </div>
                                    <div className="col-sm-4 text-right hide d-none">
                                        <NavLink
                                            to={content?.call_to_action_link || "#"}
                                            className="btn btn-lg btn-dark fs-6 mt-4" data-aos="fade-right" data-aos-delay="900">{content?.call_to_action}</NavLink>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12 col-md-12 ">

                        {loading && (
                            <>
                                <div className="row">
                                    <PropertyCardLoading />
                                    <PropertyCardLoading />
                                    <PropertyCardLoading />
                                    <PropertyCardLoading />
                                </div>
                            </>
                        )}

                        {!loading && (
                            <Swiper
                                style={{ paddingBottom: 20 }}
                                spaceBetween={30}
                                loop={true}
                                navigation={{
                                    nextEl: '.swiper-button-nexti1',
                                    prevEl: '.swiper-button-previ1',
                                }}
                                pagination={{
                                    el: '.swiper-pagination12',
                                    clickable: true,
                                }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                breakpoints={{
                                    320: { slidesPerView: 1, spaceBetween: 0 },
                                    480: { slidesPerView: 1 },
                                    640: { slidesPerView: 1 },
                                    992: { slidesPerView: 2, spaceBetween: 10 },
                                    1300: { slidesPerView: 4 },
                                    1600: { slidesPerView: 4 },
                                }}
                                className="swiper-wrapper"
                            >
                                {(
                                    featuredListing.map((property, index) => (
                                        <SwiperSlide key={`${property.id}11-${index}`}>
                                            <div className="property-card">
                                                <PropertyCard2 key={`${property.id}1-${index}`} property={property} />
                                            </div>
                                        </SwiperSlide>
                                    ))
                                )}
                            </Swiper>

                        )}


                        <div className="swiper-nav">
                            <div className="swiper-button-prev swiper-arrows swiper-button-previ1">
                                <i className="bi bi-arrow-left"></i> Prev
                            </div>
                            <div className="swiper-button-next swiper-arrows swiper-button-nexti1">
                                Next <i className="bi bi-arrow-right"></i>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>

                    {/* You can map more PropertyCard components here */}
                </div>
            </div>
        </section>
    );
};
export default ResidentialProperties;