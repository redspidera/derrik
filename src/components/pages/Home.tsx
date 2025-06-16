import { useState, useEffect } from 'react';
import HomeBanner from '../pages/home/HomeBanner.tsx'; 
import ResidentialProperties from './home/ServicesSection.tsx'; 
//import CommercialProperties from './home/CommercialProperties.tsx';
//import OurPartner from './home/OurPartner.tsx';
//import OurTeams from './home/OurTeams.tsx';
//import GoogleReview from './home/GoogleReview.tsx';
//import TestimonialSlider from './blogs/TestimonialSlider.tsx';
import BlogHome from './home/BlogHome.tsx';
import AboutSection from './AboutSection.tsx';
import OffPlanProperties from './home/OffPlanProperties.tsx';
//import OurServices from './home/OurServices.tsx';
 
interface Content {
    heading: string;
    image1: string;
    image2: string;
    content: string;
    call_to_action_link: string;
    call_to_action: string;
}  
  
const Home = ({ API_URL }: { API_URL: string}) => {
    const [featuredListing, setFeaturedListing] = useState([]);
   // const [commercialListing, setCommercialListing] = useState([]);
    const [content, setContent] = useState<Content | null>(null);
    //const [commercialContent, setcommercialContent] = useState<Content | null>(null);
    //const [residentialListing, setResidentialListing] = useState([]);

    // Fetch featured listing data once the component is mounted
    useEffect(() => {
        const fetchFeaturedListings = async () => {
            try {
                const response = await fetch(API_URL+ 'residential_listings'); // Replace with your actual API endpoint
                const data = await response.json();
                setFeaturedListing(data.data); // Set fetched data in state
                setContent(data.content); // Set fetched data in state

                /*
                const response1 = await fetch(API_URL + 'commercial_listings'); // Replace with your actual API endpoint
                const data1 = await response1.json();
                setCommercialListing(data1.data); // Set fetched data in state
                setcommercialContent(data1.content); // Set fetched data in state
                */

            } catch (error) {
                console.error("Error fetching featured listings:", error);
            }
        };

        fetchFeaturedListings(); // Call the function to fetch data
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <>
            <HomeBanner apiUrl={`${API_URL}hom_settings`} />
            <div className="clearfix"></div>
            <div id="content">
                <div className="section page-section section-no-padding first-section all-new">
                    <div className="clearfix"></div>
                    <ResidentialProperties featuredListing={featuredListing} content={content} />
                    <div className="clearfix"></div>
                    <OffPlanProperties apiUrl={`${API_URL}new_offplan`} />
                    <div className="clearfix"></div>
                    <div className="clearfix"></div>
                    {/* 
                    <CommercialProperties featuredListing={commercialListing} commercialContent={commercialContent} />
                    */}
                    <div className="clearfix"></div> 
                    {/* 
                    <OurServices apiUrl={`${API_URL}home_services`} />
                        */}
                    <div className="clearfix"></div> 
                    <AboutSection apiUrl={`${API_URL}home_about`}  />
                    <div className="clearfix"></div>
                    {/*
                    <OurPartner apiUrl={`${API_URL}partners`} />
                    */}
                    <div className="clearfix"></div>
                    
                    <div className="clearfix"></div>
                    {/*
                    <OurTeams apiUrl={`${API_URL}teams`} />
                    <div className="clearfix"></div>
                   
                    <GoogleReview apiUrl={`${API_URL}reviews`} />
                    */}
                    <div className="clearfix"></div>
                    <BlogHome apiUrl={`${API_URL}blogs`} />
                    <div className="clearfix"></div>
                    {/*
                    <TestimonialSlider apiUrl={`${API_URL}reviews`} />
                     */}
                   
                </div>
            </div>
            
        </>
    );
};

export default Home;
