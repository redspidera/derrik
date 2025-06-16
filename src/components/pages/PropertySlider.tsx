import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

type Property = {
    id: number;
    title: string;
    DetailUrl: string;
    image: string;
    tagline: string;
    price: string;
};
type content1 = { 
    heading: string;
    content: string; 
};
interface  Props {
    apiUrl: string;
}
const PropertySlider = ({apiUrl}: Props) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [content1, setContent1] = useState<content1 | null>(null);

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => { setProperties(data.data); setContent1(data.content) ; })
            .catch((err) => console.error('Failed to fetch properties:', err));
    }, []);

    return (
        <section className="property-slider-section bg-black131 w-100 text-white py-5 all-new new-sl">
            <div className="container">
                <h2 className="text-center mb-4" style={{ color: '#eac178' }}>
                    {content1?.heading}
                </h2>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }} 
                    modules={[Navigation]}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {properties.map((property) => (
                        <SwiperSlide key={property.id}>
                            <div className="property-card rounded overflow-hidden position-relative">
                                <NavLink to={property.DetailUrl}> 
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-100"
                                    style={{ height: '240px', objectFit: 'cover' }}
                                />
                            </NavLink>
                                <div className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-2 py-1 rounded">
                                    {property.tagline}
                                </div>
                                <div className="p-3 bg-dark bg-opacity-75 text-white">
                                    <div className="clearfix"></div>
                                    <NavLink to={property.DetailUrl}>
                                    <h5 className="mb-1">{property.title}</h5>
                                    </NavLink>
                                    <small>
                                        Starting From AED {property.price}
                                    </small>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-nav">
                        <div className="swiper-button-prev swiper-arrows">
                            <i className="bi bi-arrow-left"></i>  
                        </div>
                        <div className="swiper-button-next swiper-arrows">
                              <i className="bi bi-arrow-right"></i>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </Swiper>
            </div>
        </section>
    );
};

export default PropertySlider;