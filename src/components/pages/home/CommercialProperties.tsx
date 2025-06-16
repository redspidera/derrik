import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';   
import PropertyCardCommercial, { PropertyData } from '../property_listing/PropertyCardCommercial';
import 'swiper/swiper-bundle.css';
import PropertyCardLoading from '@/components/pages/property_listing/PropertyCardLoading';


SwiperCore.use([Navigation, Pagination, Autoplay]);


interface Content {
    heading: string;
    image1: string;
    image2: string;
    content: string;
    call_to_action_link: string;
    call_to_action: string;
}
interface CommercialPropertiesProps {
    featuredListing: PropertyData[];
    commercialContent: Content | null;
}

const CommercialProperties = ({ featuredListing, commercialContent }: CommercialPropertiesProps) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (featuredListing.length > 0) {
            setLoading(false);
        }
    }, [featuredListing]);
    const setEqualHeights = () => {
        const cards = document.querySelectorAll('.swiper-slide .commercial-card');
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
        <section id="Com-Pro" className="Com-Pro  bg-dar-link  section text-left all-new new-sl  pt-0 blck">
            <div className="container bg-cont " data-aos="fade-up" data-aos-delay="100">
                <div className="row">
                    <div className="col-md-9">
                        <div>
                            <h2
                                className="fs-1 mb-3 text-light"
                                data-aos="fade-right"
                                data-aos-delay="500"
                            >
                                {commercialContent && (
                                    commercialContent.heading
                                )}
                            </h2>
                            <p
                                className="fs-6 text-light"
                                data-aos="fade-right"
                                data-aos-delay="700"
                            >
                                {commercialContent && (
                                    <div dangerouslySetInnerHTML={{ __html: commercialContent.content || '' }} />
                                )}
                             </p>
                        </div>
                    </div>
                    <div className="col-md-3 text-md-end">
                        <NavLink
                            to={commercialContent?.call_to_action_link || "#"}
                           
                            className="btn btn-lg btn-light fs-6 mt-4"
                            data-aos="fade-right"
                            data-aos-delay="900"
                        >
                            {commercialContent?.call_to_action}
                        </NavLink>
                    </div>
                </div>
                <div className="row gy-5 mt-5">
                    

                    <div className="col-xl-12 col-md-12 ">

                    {loading && (
                        <>
                            <div className="row">
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
                                nextEl: '.swiper-commercialbutton-nexti1',
                                prevEl: '.swiper-commercialbutton-previ1',
                            }}
                            pagination={{
                                el: '.swiper-paginationcommercail12',
                                clickable: true,
                            }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 0 },
                                480: { slidesPerView: 1 },
                                640: { slidesPerView: 1 },
                                992: { slidesPerView:2, spaceBetween: 10 },
                                1300: { slidesPerView: 2 },
                                1600: { slidesPerView: 2 },
                            }}
                            className="swiper-wrapper"
                        >
                            {(
                                featuredListing.map((property, index) => (
                                    <SwiperSlide key={`${property.id}1s1-${index}`}>
                                        <div className="commercial-card">
                                            <PropertyCardCommercial key={`${property.id}1-${index}`} property={property} />
                                        </div>
                                    </SwiperSlide>
                                ))
                            )}
                        </Swiper>

                    )}

                    
                        <div className="swiper-nav">
                            <div className="swiper-button-prev swiper-arrows swiper-commercialbutton-previ1">
                                <i className="bi bi-arrow-left"></i> Prev
                            </div>
                            <div className="swiper-button-next swiper-arrows swiper-commercialbutton-nexti1">
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
export default CommercialProperties;