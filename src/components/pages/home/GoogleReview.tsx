import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

interface GoogleReviewProps {
    apiUrl: string;
}

const GoogleReview: React.FC<GoogleReviewProps> = ({ apiUrl }) => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data && Array.isArray(data)) {
                    setReviews(data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [apiUrl]);

    return (
        <section className="google-review">
            <div className="container">
                <div className="row">
                    <div className="col col-sm-12 page-content clearfix">
                        <div className="featured-title-hold text-left clearfix">
                            <h3 className="site-h1 animate text-center text-white" style={{ color: 'silver', marginBottom: '40px' }}>Our Client Reviews</h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-3">
                        <div className="g-review-home">
                            <div className="g-review-sepeartion">
                                <div>
                                    <div className="ti-footer source-Google">
                                        <div className="seperate-sts">
                                            <div className="seperate-sts1">
                                                <div className="ti-large-logo">
                                                    <div className="ti-v-center">
                                                        <img className="ti-logo-fb" src="https://cdn.trustindex.io/assets/platform/Google/logo.svg" width="120" height="25" alt="Google" />
                                                    </div>
                                                </div>

                                                <span className="fa-stars star-lg">
                                                    <span className="ti-star f"></span>
                                                    <span className="ti-star f"></span>
                                                    <span className="ti-star f"></span>
                                                    <span className="ti-star f"></span>
                                                    <span className="ti-star f"></span>
                                                </span>
                                                <div className="ti-rating-text">
                                                    <strong className="ti-rating">Excellent</strong>
                                                </div>
                                            </div>
                                                <div className="seperate-sts1 seperate-sts2">

                                                    <div className="rjxHPb PZPZlf" data-attrid="subtitle"><span className="Aq14fc" aria-hidden="true">4/5</span><span className="z3HNkc" role="img"><div aria-hidden="true"><span className="w-wi1"></span></div></span><a   className="hqzQac w-space" target="_blank" href="https://www.google.com/search?q=kayeandco+google+review&oq=kayeandco+google+review&aqs=chrome..69i57j33i10i160.13823j0j7&sourceid=chrome&ie=UTF-8#lrd=0x3e5f69cdeba28e23:0xfbd9d0776d4ff574,3,,,,">100 Google reviews</a></div>
                                                   
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-9">
                        {loading ? (
                            <div className="loading-spinner">
                                <p>Loading...</p>
                            </div>
                        ) : (
                            <div className="swiper-slider" id="review-slider">
                                <Swiper
                                    speed={400}
                                    loop={false}
                                    autoplay={true}
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1,
                                            spaceBetween: 15
                                        },
                                        480: {
                                            slidesPerView: 1,
                                            spaceBetween: 10
                                        },
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 15
                                        },
                                        992: {
                                            slidesPerView: 2,
                                            spaceBetween: 15
                                        }
                                    }}
                                >
                                    {reviews.map((review, index) => (
                                        <SwiperSlide key={index} className="text-s-inside">
                                            <div className="heaad-img-title">
                                                <div className="image-avatar">
                                                    <div className="testi-imgs">
                                                        <img src={review.banner} alt={review.title} />
                                                    </div>
                                                </div>
                                                <div className="user-details">
                                                    <h5>{review.title}</h5>
                                                    <span className="ps-block__rating-items mb-6" style={{ fontSize: '14px' }}>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                        <i className="fa fa-star"></i>
                                                    </span>
                                                    <p className="pt-3 text-content-review" style={{ minHeight: '50px' }}>
                                                        “{review.content}”
                                                    </p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GoogleReview;
