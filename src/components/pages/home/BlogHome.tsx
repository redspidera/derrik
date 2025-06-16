import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import useAOS from '@/components/utility/useAOS'; 
import { Typography, Button } from '@mui/material';
interface BlogHomeProps {
    apiUrl: string;  // API URL passed as a parameter
}
const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME;
const BlogHome: React.FC<BlogHomeProps> = ({ apiUrl }) => {
    const [blogs, setBlogs] = useState<any[]>([]);  // State to hold the blog posts
    const [loading, setLoading] = useState<boolean>(true);  // State to track loading
    const [maxHeight, setMaxHeight] = useState<number>(0);
    const slidesRef = useRef<Array<HTMLDivElement | null>>([]); // Solution 3: Explicitly declare ref type
    useAOS();
    useEffect(() => {
        const heights = slidesRef.current.map(slide => slide ? slide.offsetHeight : 0); // Avoid undefined
        const maxHeight = Math.max(...heights);
        setMaxHeight(maxHeight);
    }, [blogs]); // Re-run when blogs are loaded

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(apiUrl);  // Fetching data from the API URL
                const data = await response.json();  // Parsing the response as JSON
                if (data && Array.isArray(data)) {  // Check if data is an array
                    setBlogs(data);  // Set blogs state with fetched data
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);  // Log any error
            } finally {
                setLoading(false);  // Stop loading after the fetch attempt
            }
        };

        fetchBlogs();  // Call the fetchBlogs function inside useEffect
    }, [apiUrl]);  // Only run when the apiUrl changes

    return (
        <div className="section section-featured bg-dar-link new-sl dark-background text-left section-new-instructions blg-latest hm-blog all-new" >
            <div className="auto-container1 pl15 pr15" data-aos="fade-up" data-aos-delay="100">
                <div className="row">
                    <div className="col-md-9">
                        <div>
                           
                            <Typography
                                variant="h2"
                                component="h2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,           // margin bottom to space below heading
                                    color: 'primary.light',
                                }}
                                data-aos="fade-right" data-aos-delay="500"
                            >
                                Our Blogs
                            </Typography>
                            <p className="fs-6" data-aos="fade-up" data-aos-delay="300">
                                Stay up-to-date with the latest news, trends, & insights from {PROJECT_NAME}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 text-md-end">
                        <Button
                            component={NavLink}
                            className="white-btn"
                            to='/articles/news-media'
                            variant="contained"
                            size="large"

                            sx={{ 
                                fontSize: '1rem',
                                bgcolor: 'primary.contrastText',   // uses theme.palette.background.paper
                                color: 'primary.main',         // uses theme.palette.text.primary
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    bgcolor: 'action.hover',    // uses theme.palette.action.hover 
                                    boxShadow: 'none',
                                },
                            }}
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                           View All
                        </Button>
                     </div>
                </div>

                <div className="swiper-container blog mt-5">
                    {loading ? (
                        <div className="loading-spinner">
                            <p>Loading...</p>  {/* Basic loading message */}
                        </div>
                    ) : (
                        <Swiper
                            spaceBetween={15}
                            loop={false}
                            slidesPerView="auto"
                            breakpoints={{
                                320: { slidesPerView: 1, spaceBetween: 0 },
                                480: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                992: { slidesPerView: 4 },
                                1300: { slidesPerView: 4 }
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next-4',
                                prevEl: '.swiper-button-prev-4',
                            }}
                        >
                            {blogs.map((blog, index) => {
                                const img = blog.banner;

                                return (
                                    <SwiperSlide key={index}>
                                        <div
                                            className="card card-property card-link taphover hom"
                                            ref={(el) => {
                                                if (el) slidesRef.current[index] = el;
                                            }} // Solution 2: Safely handle `undefined`
                                            style={{ height: `${maxHeight}px` }}
                                        >
                                            <div className="card-image">
                                                <div
                                                    className="full-block card-image-inner transition"
                                                    style={{ backgroundImage: `url(${img})` }}
                                                >
                                                    <div className="card-content">
                                                        
                                                        <h3 className="spsiznew">
                                                            <NavLink to={`/article/${blog.slug}`}>{blog.title}</NavLink>
                                                        </h3>
                                                    </div>

                                                </div>
                                                <div className="full-block overlay transition"></div>
                                                <div className="card-hover transition">
                                                    <span className="icon-click"></span>
                                                    <span className="click-text">
                                                        <span className="gold">Click</span> to explore
                                                    </span>
                                                    <span className="arrow transition"></span>
                                                </div>
                                             
                                            </div>
                                            
                                         </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    )}
                </div>

                <div className="swiper-nav">
                    <div className="swiper-button-prev swiper-arrows swiper-button-prev-4">
                        <i className="bi bi-arrow-left"></i> Prev
                    </div>
                    <div className="swiper-button-next swiper-arrows swiper-button-next-4">
                        Next <i className="bi bi-arrow-right"></i>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </div>
    );
};

export default BlogHome;
