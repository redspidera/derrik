import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import TestimonialCardNew from '../testimonial/TestimonialCardNew'; // Adjust path as needed

interface Review {
    title: string;
    date: string;
    content: string;
    banner?: string;
}

interface ApiResponse {
    rating: number;
    totalReviews: number;
    review_text: string;
    reviews: Review[];
}

interface TestimonialSliderProps {
    apiUrl: string;
}

const renderStarRating = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
        <div className="google-stars">
            {'★'.repeat(full)}
            {half && (
                <span className="half-star">
                    <span className="half">★</span>
                    <span className="empty">★</span>
                </span>
            )}
            {Array(empty)
                .fill(null)
                .map((_, i) => (
                    <span key={i} className="empty">★</span>
                ))}
        </div>
    );
};

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ apiUrl }) => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef<Swiper | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Failed to fetch testimonials');
                const result: ApiResponse = await response.json();
                setData(result);
            } catch (error) {
                console.error(error);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    useEffect(() => {
        if (!data?.reviews?.length) return;

        swiperRef.current = new Swiper('.mySwiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
            },
        });

        return () => {
            swiperRef.current?.destroy();
            swiperRef.current = null;
        };
    }, [data]);

    if (loading) return <div>Loading testimonials...</div>;
    if (!data || !data.reviews.length) return <div>No testimonials found.</div>;

    return (
        <div className="section testimonial-wrapper">
            <div className="container">
                <div className="featured-title-hold text-center clearfix">
                    <div className="line-container-parent">
                        <div className="lines-container flex-end">
                            <div className="line small-line"></div>
                            <div className="line big-line"></div>
                        </div>
                        <h5 className="line-text">Testimonials</h5>
                        <div className="lines-container">
                            <div className="line small-line"></div>
                            <div className="line big-line"></div>
                        </div>
                    </div>
                    <p className="site-h4">Our Client Reviews</p>
                </div>

                <div className="row">
                    {/* Summary */}
                    <div className="col-md-3">
                        <div className="google-summary">
                            <h5>
                                <strong>{data.review_text}</strong>
                            </h5>
                            {renderStarRating(data.rating)}
                            <div className="mt-2">
                                Based on <strong>{data.totalReviews} reviews</strong>
                            </div>
                            <div className="mt-3">
                                <img
                                    src="https://cdn.trustindex.io/assets/platform/Google/logo.svg"
                                    alt="Google Logo"
                                    width="140"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Swiper */}
                    <div className="col-md-9">
                        <div className="swiper mySwiper">
                            <div className="swiper-wrapper">
                                {data.reviews.map((review, i) => {
                                    const transformedReview = {
                                        id: i.toString(),
                                        image: review.banner || '',
                                        Title: review.title,
                                        adTitle: '',
                                        DetailUrl: '',
                                        ShortDescription: review.content,
                                    };

                                    return (
                                        <div className="swiper-slide" key={i}>
                                            <TestimonialCardNew property={transformedReview} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSlider;
