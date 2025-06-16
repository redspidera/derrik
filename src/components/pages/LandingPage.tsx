import   { useState, useEffect } from 'react';  
import AboutSection from './AboutSection';
import OurServices from './home/OurServices';
import { API_URL } from '@/Constants';
import { useLocation } from 'react-router-dom';
import FeaturedHomes from './FeaturedHomes';
import PropertySlider from './PropertySlider';



 
interface Properties {
    phone: string;
    email: string;
    headerTitle: string;
    sub_title: string;
    admin_email: string;
    address: string;
    opening: string;
    alt_phone: string;
    telephone: string;
    alt_telephone: string;
    banner: string;
    content: string | null;
}
interface FooterProps {
    apiUrl: string;
}
const LandingPage = ({ apiUrl }: FooterProps) => {
   

    const [properties, setProperties] = useState<Properties | null>(null);
    const location = useLocation();
    const lang = location.pathname.split('/')[1] || 'en'; // fallback to 'en' if empty

     
     useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProperties(data); // Assuming the data is in the expected format

            } catch (error) {
                console.error("Error fetching properties:", error);

            }
        };

        fetchProperties();
    }, [apiUrl]);
   

  

    return (
        <>
            <div className="row">
                <div
                    className={`contact-us head-sect article-main `}
                >
                    <div className="section-dark page-banner list-banner-home   more-height sect-blog half-height" >
                        <div
                            className="full-block page-banner-image as"
                            style={{ backgroundImage: `url(${properties?.banner})` }}
                        >
                        </div>
                        <div className="full-block overlay"></div>
                        {properties?.headerTitle && (
                            <div className="container h-100">
                                <div className="row disp-table h-100">
                                    <div className="col col-md-12 h-100">
                                        <div className="page-banner-content h-100">
                                            <div className="page-banner-content h-100">
                                                <div className="fancy-title-hold text-initial clearfix">
                                                    <h2 className="fancy-title animate animated">
                                                        {properties?.headerTitle}

                                                        {properties.sub_title && (
                                                            <span
                                                                className="sub-title-fnt"

                                                            >
                                                                {properties.sub_title}
                                                            </span>
                                                        )}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                
            </div>
            <div id="content" className="about__services">
                {/* Breadcrumbs */}
                <div className="section page-section about-sect-e ">
                    <div className="container">
                        <div className="mainDiv">
                            <div id="headerNewplace" style={{ display: 'none' }}></div>
                            <div id="pageContainer" className="container margin-top-240">
                                <div className="container_content">
                                    <div className="bottom_line_2 crmbrimg">
                                        <span></span>
                                        <span></span>
                                    </div>

                                    {/* Unit Content */}
                                    <div className="unit_lowerer">
                                        <div className="overview-control-div">
                                            <div className="stagc-loc-txt">
                                                <span className="stagc-loc-txt-span2">
                                                    {/* Render article content with YouTube embed */}
                                                    {properties?.content && (
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: properties.content.replace(
                                                                    '[YOUTUBE]',
                                                                    `<iframe width="560" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>`
                                                                ),
                                                            }}
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                     

                                    {/* End Content */}
                                    <div style={{ clear: 'both' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <AboutSection apiUrl={`${API_URL}home_about?lang=${lang}`} />
            </div>
            <div className="container">
            <div className="clearfix"></div>
                <OurServices apiUrl={`${API_URL}home_services?lang=${lang}`}   />
            </div>
            <div className="clearfix"></div> 
             <PropertySlider apiUrl={`${API_URL}list_exclusive?lang=${lang}`}  /> 
            <div className="container">
                <FeaturedHomes apiUrl={`${API_URL}featured_homes?lang=${lang}`} /> 
            </div>
          
        </>
    );
};

export default LandingPage;