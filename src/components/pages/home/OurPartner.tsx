import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface TeamMember {
    img: string;
    title: string;
}

interface OurPartnerProps {
    apiUrl: string; // Accept API URL as a prop
}

const OurPartner: React.FC<OurPartnerProps> = ({ apiUrl }) => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await fetch(apiUrl); // Use the API URL passed as a prop
                const data = await response.json();
                setTeamMembers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchTeamData();
    }, [apiUrl]); // Re-run the effect if the API URL changes

    return (
        <div className="col-sm-12 section section-featured section-artner" id="section-artner-id" style={{ borderLeft: '1px solid #eee', paddingTop: '60px' }}>
            <div className="container">
                <div className="row" data-aos="fade-right"
                    data-aos-delay="400">
                    <div className="col col-sm-12 page-content clearfix">
                        <div className="featured-title-hold text-center clearfix">
                            <div className="line-container-parent">
                                <div className="lines-container flex-end">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                                <h5 className="line-text">Our Partners</h5>
                                <div className="lines-container">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                            </div>
                            <p className="site-h4">Trusted Allies in Our Journey to Success</p>
                        </div>
                    </div>
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className="loading-container" style={{ textAlign: 'center', padding: '50px 0' }}>
                        <div className="spinner" style={{ borderTopColor: '#3498db' }}></div>
                    </div>
                )}

                {/* Partner Slider */}
                <div id="partner-slider1" data-aos="fade-up" data-aos-delay="100">
                    <div className="row team-memb1 partner-container" style={{ position: 'relative' }}>
                        {teamMembers.length > 0 && (
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
                                    992: { slidesPerView: 8, spaceBetween: 10 },
                                    1300: { slidesPerView: 8 },
                                    1600: { slidesPerView: 8 },
                                }}
                                className="swiper-wrapper"
                            >
                                {teamMembers.map((team, index) => (
                                    <SwiperSlide className="swiper-slide team-member admin" key={index}>
                                        <div className="card card-tertiary">
                                            <div className="card-image">
                                                <img
                                                    src={team.img}
                                                    alt={team.title}
                                                    sizes="248px"
                                                    className="stb_image-team-thumbnail"
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}

                        <div className="swiper-nav" style={{ marginTop: '15px' }}>
                            <div className="swiper-button-prev swiper-button-prev-partner swiper-arrows swiper-button-nexti"></div>
                            <div className="swiper-button-next swiper-button-next-partner swiper-arrows swiper-button-previ"></div>
                            <div className="swiper-pagination swiper-pagination12"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurPartner;
