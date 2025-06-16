import { NavLink } from 'react-router-dom'; 
import { useState, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import useAOS from '@/components/utility/useAOS';
import { Typography, Button } from '@mui/material';
interface Property {
    image: string;
    title: string;
    DetailUrl: string;
    location: string;
    price: string;
    currency: string;
}
interface Content {
    heading: string;
    image1: string;
    image2: string;
    content: string;
    call_to_action_link: string;
    call_to_action: string;
}

interface OffPlanPropertiesProps {
    apiUrl: string;
}

const OffPlanProperties = ({ apiUrl }: OffPlanPropertiesProps) => {
    const [properties, setProperties] = useState<Property[]>([]); 
    const [content, setContent] = useState<Content | null>(null);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef<HTMLDivElement | null>(null);
    useAOS();
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProperties(data.data); // Assuming the data is in the expected format
                setContent(data.content); // Assuming the data is in the expected format
                setLoading(false);
            } catch (error) {
                console.error("Error fetching properties:", error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, [apiUrl]);

    useEffect(() => {
        // Initialize Swiper when properties are loaded
        if (!loading && swiperRef.current) {
            const swiperInstance = new Swiper(swiperRef.current, {
                speed: 400,
                spaceBetween: 30,
                loop: true,
                autoplay: false,
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    480: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    1300: {
                        slidesPerView: 2,
                    },
                    1600: {
                        slidesPerView: 2,
                    },
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });

            return () => {
                swiperInstance.destroy();
            };
        }
    }, [loading]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!properties || properties.length === 0) return null;
    return (
        <section id="stats" className="stats section dark-background pb-0-i">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row gy-4">
                    <div className="col-lg-4 col-md-3 px-5">
                        <div className=" pr-5-it mb-at-50-mob">
                            <Typography
                                variant="h2"
                                component="h2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,           // margin bottom to space below heading
                                    color: 'primary.main',
                                }}
                                data-aos="fade-up" data-aos-delay="200"
                            >
                                {content && content.heading}
                            </Typography>
                             
                            <Typography
                                variant="body1"
                                
                                sx={{ 
                                    color: 'text.primary',
                                    textAlign: 'justify',
                                }}
                                data-aos="fade-up" data-aos-delay="300"
                                component="div"       // use div because content may contain block elements
                                dangerouslySetInnerHTML={{ __html: content?.content || '' }}
                            />
                            <div className="mt-4"></div>
                            <Button
                                component={NavLink}
                                to={content?.call_to_action_link || '#'}
                                variant="contained"
                                size="large"
                               
                                sx={{
                                    mt: 14,
                                    fontSize: '1rem',
                                  
                                    bgcolor: 'primary.main',   // uses theme.palette.background.paper
                                    color: 'primary.contrastText',         // uses theme.palette.text.primary
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: 'action.hover',    // uses theme.palette.action.hover 
                                        boxShadow: 'none',
                                        color: 'primary.contrastText',
                                    },
                                }}
                                data-aos="fade-up"
                                data-aos-delay="400"
                            >
                                {content?.call_to_action}
                            </Button>
                        </div>
                    </div>

                    <div className="col-lg-8 col-md-8 off-card">
                        <div className="swiper-container" ref={swiperRef}>
                            <div className="swiper-wrapper">
                                {properties.map((property, index) => (
                                    <div key={index} className="swiper-slide">
                                        <div className="card card-tertiary abs-me-link-lreative" data-id={index}>
                                            
                                            <NavLink to={property.DetailUrl} className=" abs-me-link">
                                               
                                            </NavLink>
                                            <div className="card-content">
                                                <div className="card-image">
                                                    <img
                                                        src={property.image}
                                                        alt={property.title}
                                                        className="stb_image-team-thumbnail"
                                                    />
                                                </div> 
                                                <div className="bl-img-content">
                                                    <h5 className="fs-6capitalize text-dark">
                                                        <NavLink to={property.DetailUrl} className=" fw-bold offplan-link">
                                                        {property.title}
                                                        </NavLink>
                                                        </h5>
                                                    <div className="d-flex mb-2 ">
                                                        <span className="text-dark pe-3 offplan-loc">
                                                            <i className="bi bi-geo-alt-fill"></i> {property.location}
                                                        </span>
                                                    </div>
                                                    <div className=" mt-2 ">
                                                        
                                                        <div className="d-flex fw-bold price-color">
                                                            <em>Starting Form</em>
                                                        <span className="text-dark pe-3">{property.currency}</span>
                                                        <span>{property.price}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Swiper Navigation and Pagination */}
                            <div className="swiper-nav">
                                <div className="swiper-button-prev swiper-arrows">
                                    <i className="bi bi-arrow-left"></i> Prev
                                </div>
                                <div className="swiper-button-next swiper-arrows">
                                    Next <i className="bi bi-arrow-right"></i>
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OffPlanProperties;