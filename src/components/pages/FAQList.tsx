import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Container
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    faqs: FAQItem[];
}

interface FAQItem {
    name: string;
    answer: string;
}

interface FAQListProps {
    apiUrl: string;
}

const FAQList = ({ apiUrl }: FAQListProps) => {
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

            <section className="frm-cnt1" style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
                        Frequently Asked Questions
                    </Typography>

                    {properties?.faqs && properties.faqs.length > 0 ? (
                        properties.faqs.map((faq, index) => (
                            <Accordion
                                key={index}
                                sx={{
                                    marginBottom: 2,
                                    boxShadow: 2,
                                    borderRadius: 2,
                                    '&:before': { display: 'none' },
                                    backgroundColor: '#fff',
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                    sx={{
                                        backgroundColor: '#f0f4f8',
                                        borderBottom: '1px solid #e0e0e0',
                                        '&:hover': {
                                            backgroundColor: '#e8f0fe',
                                        },
                                    }}
                                >
                                    <Typography fontWeight="bold">{faq.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: 3 }}>
                                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Typography align="center" color="textSecondary">
                            Loading FAQs...
                        </Typography>
                    )}
                </Container>
            </section>
        </div>
    );
};

export default FAQList;
