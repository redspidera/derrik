import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import HomeBanner from '../pages/home/HomeBanner';
import FeaturedProperties from './home/FeaturedProperties';
import AwardsSlider from './home/AwardsSlider';
import OurPartner from './home/OurPartner';
import OurTeams from './home/OurTeams';
import GoogleReview from './home/GoogleReview';
import BlogHome from './home/BlogHome';
const Home = ({ API_URL, HOME_VIDEO }) => {
    const [featuredListing, setFeaturedListing] = useState([]);
    // Fetch featured listing data once the component is mounted
    useEffect(() => {
        const fetchFeaturedListings = async () => {
            try {
                const response = await fetch(API_URL + 'featured_listings'); // Replace with your actual API endpoint
                const data = await response.json();
                setFeaturedListing(data); // Set fetched data in state
            }
            catch (error) {
                console.error("Error fetching featured listings:", error);
            }
        };
        fetchFeaturedListings(); // Call the function to fetch data
    }, []); // Empty dependency array ensures this runs once when the component mounts
    return (_jsxs(_Fragment, { children: [_jsx(HomeBanner, { HOME_VIDEO: HOME_VIDEO }), _jsx("div", { className: "clearfix" }), _jsx("div", { id: "content", children: _jsxs("div", { className: "section page-section section-no-padding first-section all-new", children: [_jsx(FeaturedProperties, { featuredListing: featuredListing }), _jsx("div", { className: "clearfix" }), _jsx(AwardsSlider, { apiUrl: `${API_URL}awards` }), _jsx("div", { className: "clearfix" }), _jsx(OurPartner, { apiUrl: `${API_URL}partners` }), _jsx("div", { className: "clearfix" }), _jsx(OurTeams, { apiUrl: `${API_URL}teams` }), _jsx("div", { className: "clearfix" }), _jsx(GoogleReview, { apiUrl: `${API_URL}reviews` }), _jsx("div", { className: "clearfix" }), _jsx(BlogHome, { apiUrl: `${API_URL}blogs` })] }) })] }));
};
export default Home;
