import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // ✅ Correct module import
import 'swiper/swiper-bundle.css'; 

// Interface for an Award item
interface Award {
    img: string;
    title: string;
}

// Props for AwardsSlider component
interface AwardsSliderProps {
    apiUrl: string;
}

const AwardsSlider: React.FC<AwardsSliderProps> = ({ apiUrl }) => {
    // State to store awards data and loading state
    const [awards, setAwards] = useState<Award[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch the awards from the API on component mount
    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data && data) {
                    setAwards(data);
                }
            } catch (error) {
                console.error('Error fetching awards:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAwards();
    }, [apiUrl]);

    return (
        <div className="col-sm-12 section section-featured section-artner" id="section-artner-id" style={{ borderLeft: '1px solid #eee', paddingTop: '60px', background: '#fff' }}>
            <div className="container">
                <div className="row">
                    <div className="col col-sm-12 page-content clearfix">
                        <div className="featured-title-hold text-center clearfix">
                            <div className="line-container-parent">
                                <div className="lines-container flex-end">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                                <h5 className="line-text">Awards</h5>
                                <div className="lines-container">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                            </div>
                            <p className="site-h4">Heartwarming Appreciations We've Received</p>
                        </div>
                    </div>
                </div>

                <div id="partner-slider1">
                    <div className="row team-memb1 partner-container" style={{ position: 'relative' }}>
                        {loading ? (
                            <div className="loading-spinner" style={{ textAlign: 'center', padding: '50px 0' }}>
                                <div className="spinner"></div>
                                <p>Loading Awards...</p>
                            </div>
                        ) : awards.length > 0 ? (
                            <>
                                <Swiper
                                    autoplay={false}
                                    slidesPerView={2}
                                    spaceBetween={20}
                                    loop={true}
                                    modules={[Navigation, Pagination, Autoplay]} // ✅ Pass Swiper modules
                                    breakpoints={{
                                        600: { slidesPerView: 2 },
                                        767: { slidesPerView: 4 },
                                        1024: { slidesPerView: 8 },
                                    }}
                                    navigation={{
                                        nextEl: '.swiper-button-next-award',
                                        prevEl: '.swiper-button-prev-award',
                                    }}
                                    pagination={{
                                        el: '.swiper-pagination12',
                                        clickable: true,
                                    }}
                                >
                                    {awards.map((team, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="card card-tertiary">
                                                <div className="card-image" data-id={index}>
                                                    <img
                                                        src={team.img}
                                                        alt={team.title}
                                                        className="stb_image-team-thumbnail"
                                                        sizes="248px"
                                                    />
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <div className="swiper-nav" style={{ marginTop: '15px', display: awards.length > 0 ? 'flex' : 'none' }}>
                                    <div className="swiper-button-prev swiper-button-prev-award swiper-arrows"></div>
                                    <div className="swiper-button-next swiper-button-next-award swiper-arrows"></div>
                                    <div className="swiper-pagination swiper-pagination12"></div>
                                </div>
                            </>
                        ) : (
                            <p style={{ textAlign: 'center' }}>No awards available at the moment.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AwardsSlider;
