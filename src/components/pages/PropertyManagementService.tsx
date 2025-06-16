import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material'; 
import GetiInTouch from './GetiInTouch';
import AboutService from './blogs/AboutService';
import { Helmet } from 'react-helmet';
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
    faqs: any[];
}

interface FAQListProps {
    apiUrl: string;
    baseUrl: string;
}

const PropertyManagementService = ({ apiUrl, baseUrl }: FAQListProps) => {
    const [properties, setProperties] = useState<Properties | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [apiUrl]);

    return (
        <div className="row">
            {properties && properties.headerTitle && (
                <Helmet>
                    <title>{properties.headerTitle}</title>
                </Helmet>
            )}
            <div className="contact-us head-sect article-main">
                <div className="section-dark page-banner list-banner-home more-height sect-blog half-height">
                    <div
                        className="full-block page-banner-image as"
                        style={{
                            backgroundImage: `url(${properties?.banner})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    <div className="full-block overlay" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}></div>
                    {properties?.headerTitle && (
                        <div className="container h-100">
                            <div className="row disp-table h-100">
                                <div className="col col-md-12 h-100">
                                    <div className="page-banner-content h-100 d-flex flex-column justify-content-center text-white">
                                        <div className="fancy-title-hold text-initial clearfix">
                                            <h2 className="fancy-title animate">
                                                {properties.headerTitle}
                                                {properties.sub_title && (
                                                    <span className="sub-title-fnt d-block mt-2" style={{ fontSize: '18px', fontWeight: 'normal' }}>
                                                        {properties.sub_title}
                                                    </span>
                                                )}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <section style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
                <Container maxWidth="lg">
                     
                    <Box sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: 2 }}>
                        {properties?.content ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: properties.content }} // Render HTML content
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '1.6',
                                    color: '#333',
                                    fontFamily: 'Open Sans, sans-serif',
                                }}
                            />
                        ) : (
                            <Typography align="center" color="textSecondary" sx={{ fontFamily: 'Open Sans, sans-serif' }}>
                                No content available at the moment.
                            </Typography>
                        )}
                    </Box>
                </Container>
            </section>
            <AboutService apiUrl={`${baseUrl}about_us_service`} /> 
            <GetiInTouch apiUrl={`${baseUrl}contact_variable`} />
           
        </div>
    );
};

export default PropertyManagementService;
