import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { API_URL, PROJECT_NAME, SITE_URL } from '@/Constants';
import FAQ from './FAQ';
import ShareComponent from '../offplan_detail/ShareComponent';
import AreaGuidesSection from './AreaGuidesSection';
import FullPageLoader from '@/components/utility/FullPageLoader';
import { Box, Typography,  Container, Grid } from '@mui/material';

export type BlogData = {
    id: string;
    category: string;
    Image: string;
    Title: string;
    sub_title: string;
    DetailUrl: string;
    ShortDescription: string;
    Description: string;
    DatePublished: string;
    DateModified: string;
    AuthorName: string;
    AbsoluteURL: string;
    DateNew: string;
    latest: Array<{
        slug: string;
        title: string;
        image: string;
    }>;
};

interface FAQData {
    name: string[];
    answer: string[];
}

interface BlogProps {
    title: string;
    description: string;
    DateNew: string;
    Image: string;
    absoluteUrl: string;
    faq: FAQData | null;
}

const calculateReadingTime = ({ content }: { content: string }) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
};

const BlogTemplate = ({ title, description, absoluteUrl, DateNew, faq }: BlogProps) => {
    return (
        <Box id="content">
            <Box className="breadcrumbs mt0" py={2} bgcolor="#f5f5f5 !important">
                <Container sx={{ p: '0 !important' }}>
                    <Typography >
                        <NavLink to="/">Home</NavLink> &nbsp;/&nbsp;
                        <NavLink to="/Communities">Communities</NavLink> &nbsp;/&nbsp;
                        <span>{title}</span>
                    </Typography>
                </Container>
            </Box>

            <Container className="section page-section blllog-detail">
                <Box className="mainDiv" py={4}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Typography
                                variant="h4"
                                component="h2"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,           // margin bottom to space below heading
                                    color: 'primary.main',
                                }}
                                data-aos="fade-up" data-aos-delay="500"
                            >
                                {title}
                            </Typography> 
                            <Typography variant="body2" color="textSecondary" data-aos="fade-up" data-aos-delay="500" gutterBottom>
                                <i className="fa fa-calendar me-1" /> {DateNew} &nbsp;|&nbsp;
                                Reading Time: {calculateReadingTime({ content: description })} minutes
                            </Typography>
                            <Box id="reading-contetn" sx={{ mt: 2 }}>
                                  <Typography
                                                                            variant="body1"
                                                                            className='pr25'
                                                                            sx={{
                                                                                color: 'text.primary',
                                                                                textAlign: 'justify',
                                                                            }}
                                                                            data-aos="fade-up" data-aos-delay="600"
                                                                            component="div"       // use div because content may contain block elements
                                    dangerouslySetInnerHTML={{ __html: description }}
                                                                        /> 
                            </Box>
                            
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <Box
                                component="img"
                                src={absoluteUrl}
                                alt={title}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={4}>
                    {faq && <FAQ faqData={faq} />}
                    </Box>
                    <Box mt={4}>
                        <ShareComponent url={absoluteUrl} adTitle={title} />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

const AreaGuideDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<BlogData | null>(null);
    const [faq, setFAQ] = useState<FAQData | null>(null);
    const [loading, setLoading] = useState(true);
    //const [error, setError] = useState('');
    const [latest, setLatest] = useState<any[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}areaguide_detail/slug/${id}`, { signal: controller.signal });
                if (!response.ok) throw new Error('Failed to fetch property details');

                const data = await response.json();
                setProperty(data.data.record);
                setFAQ(data.data.record.faqs);
                setLatest(data.data.record.latest);
            } catch (err) {
                if (!(err instanceof DOMException && err.name === 'AbortError')) {
                   // setError('Failed to fetch property details');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProperty();

        return () => controller.abort();
    }, [id]);

    const seoTitle = property ? `${property.Title} - ${PROJECT_NAME}` : 'Article Details';
    const seoDescription = property ? `${property.Title} - ${property.ShortDescription?.substring(0, 160)}...` : '';
    const seoUrl = property?.AbsoluteURL || '';

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": property?.Title,
        "description": property?.ShortDescription,
        "image": property?.Image,
        "url": seoUrl,
        "datePublished": property?.DatePublished,
        "dateModified": property?.DateModified,
        "author": {
            "@type": "Person",
            "name": property?.AuthorName,
            "url": property?.AbsoluteURL
        },
        "publisher": {
            "@type": "Organization",
            "name": PROJECT_NAME,
            "logo": {
                "@type": "ImageObject",
                "url": property?.Image
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": SITE_URL
        },
        "articleBody": property?.Description
    };

    return (
        <>
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={property?.Image || ''} />
                <meta property="og:url" content={seoUrl} />
                <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
            </Helmet>

            {(!property || loading) ? (
                <FullPageLoader />
            ) :    (
                <>
                    <BlogTemplate
                        title={property.Title}
                        description={property.Description}
                        DateNew={property.DateNew}
                        absoluteUrl={property.Image}
                        Image={property.Image}
                        faq={faq}
                    />
                    
                    <AreaGuidesSection latest={latest} />
                </>
            ) }
        </>
    );
};

export default AreaGuideDetail;
