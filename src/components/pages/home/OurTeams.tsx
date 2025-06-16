import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface TeamMember {
    img: string;
    title: string;
    subTitle: string;
    slug: string;
    phone: string;
}

interface OurTeamsProps {
    apiUrl: string; // Accept API URL as a prop
}

const OurTeams: React.FC<OurTeamsProps> = ({ apiUrl }) => {
    const [teams, setTeams] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(apiUrl); // Use the passed API URL
                const data = await response.json();
                setTeams(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching teams:', error);
                setLoading(false);
            }
        };

        fetchTeams();
    }, [apiUrl]); // Fetch when the API URL changes

    return (
        <div className="section section-featured section-team bg-bl">
            <div className="container" style={{ overflow: 'hidden' }}>
                <div className="row mob-realtive">
                    <div className="col col-sm-8 page-content clearfix">
                        <div className="featured-title-hold text-left clearfix">
                            <h3 className="site-h1 animate text-left">Meet the Team</h3>
                        </div>
                    </div>
                    <div className="col-sm-4 text-right abs-on-mob">
                        <a href="/articles/our_teams" type="button" className="btn btn-primary">
                            View All Team
                        </a>
                    </div>
                </div>

                {/* Loading Spinner */}
                {loading && (
                    <div className="loading-container" style={{ textAlign: 'center', padding: '50px 0' }}>
                        <div className="spinner" style={{ borderTopColor: '#3498db' }}></div>
                    </div>
                )}

                {/* Team Slider */}
                <div id="team-slider2">
                    <div className="  team-memb swiper-wrapper">
                        {teams.length > 0 && (
                            <Swiper
                                spaceBetween={20}
                                loop={false}
                                autoplay={true}
                                breakpoints={{
                                    320: { slidesPerView: 2, spaceBetween: 10 },
                                    400: { slidesPerView: 3, spaceBetween: 10 },
                                    480: { slidesPerView: 3, spaceBetween: 10 },
                                    640: { slidesPerView: 4, spaceBetween: 10 },
                                    992: { slidesPerView: 6, spaceBetween: 10 },
                                    1400: { slidesPerView: 8 },
                                    1600: { slidesPerView: 8 },
                                }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                                className="swiper-wrapper"
                            >
                                {teams.map((team, index) => (
                                    <SwiperSlide key={index} className="team-member admin swiper-slide">
                                        <div className="card card-tertiary">
                                            <a className="post-link" href={`/articles/team/${team.slug}`} />
                                            <div className="card-image">
                                                <img
                                                    src={team.img}
                                                    alt={team.title}
                                                    className="profile1"
                                                    sizes="248px"
                                                />
                                                <div className="team-overlay">
                                                    <div className="team-content">
                                                        <a
                                                            href={`https://api.whatsapp.com/send?phone=${team.phone}&text=Hi ${team.title}`}
                                                            className="the-w"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <span className="fa fa-whatsapp" aria-hidden="true"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-title">
                                                <h3 className="margin-none" title={team.title}>
                                                    {team.title}
                                                </h3>
                                                <p className="margin-none">{team.subTitle}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>

                    <div className="swiper-nav">
                        <div className="swiper-button-prev swiper-arrows"></div>
                        <div className="swiper-button-next swiper-arrows"></div>
                        <div className="swiper-pagination swiper-pagination12"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurTeams;
