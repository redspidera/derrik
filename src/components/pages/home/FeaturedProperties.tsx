import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore  from 'swiper/core';
import  { Navigation, Pagination, Autoplay } from 'swiper/modules';
import PropertyCard, { PropertyData } from '@/components/pages/property_listing/PropertyCard'; 
import 'swiper/swiper-bundle.css'; 
import PropertyCardLoading from '@/components/pages/property_listing/PropertyCardLoading';


SwiperCore.use([Navigation, Pagination, Autoplay]);

 

interface FeaturedPropertiesProps {
    featuredListing: PropertyData[];
}

const FeaturedProperties = ({ featuredListing }: FeaturedPropertiesProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (featuredListing.length > 0) {
            setLoading(false);
        }
    }, [featuredListing]);

    return (
        <div className="auto-container1 pl10 pr10  section-fet-home">
            <div className="row">
                <div className="col col-sm-12 page-content clearfix">
                    <div className="featured-title-hold text-center clearfix">
                        <h3 className="site-h1 animate">
                            <div className="line-container-parent">
                                <div className="lines-container flex-end">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                                <h5 className="line-text">Featured</h5>
                                <div className="lines-container">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                            </div>
                            <p className="site-h4">Explore our featured real estate properties, available for purchase</p>
                        </h3>
                    </div>

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
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 0 },
                                480: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                992: { slidesPerView: 4, spaceBetween: 10 },
                                1300: { slidesPerView: 4 },
                                1600: { slidesPerView: 5 },
                            }}
                            className="swiper-wrapper"
                        >
                            {(
                                featuredListing.map((property, index) => (
                                    <SwiperSlide key={`${property.id}11-${index}`}>
                                    <PropertyCard key={`${property.id}1-${index}`} property={property} />
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>

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

export default FeaturedProperties;