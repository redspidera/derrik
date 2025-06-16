import { useState, useRef, useEffect } from 'react';
import { API_URL } from '@/Constants';
import { Card, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import ListYourProperty from '../ListYourProperty.tsx';
import useAOS from '@/components/utility/useAOS.tsx';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FullPageLoader from '@/components/utility/FullPageLoader.tsx';


interface Properties {

    headerTitle: string;
    sub_title: string;
    banner: string;
    image2: string;
    content: string | null;
}
interface contactPageProps {
    Title: string;
    sold_text: string;
    listings_text: string;
    content: string;
}
interface WhyListProps {

    headerTitle: string;
    banner: string;
    content: string[];
}
interface HowWorksItemsProps {

    step: string;
    title: string;
    content: string;
    banner: string;
}

interface HowWorksProps {

    headerTitle: string;
    sub_title: string;
    items: HowWorksItemsProps[];
}
const ListYourPropertyContent = () => {
    useAOS();
    const language = 'en';
    const requestRef = useRef<HTMLDivElement>(null);

    const scrollToRequest = () => {
        requestRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const [properties, setProperties] = useState<Properties | null>(null);
    const [whyList, setWhyList] = useState<WhyListProps | null>(null);
    const [howWorks, setHowWorks] = useState<HowWorksProps | null>(null);
    const [contactpage, setContactpage] = useState<contactPageProps | null>(null);
    useEffect(() => {

        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API_URL}list_property_variable/lang/${language}`); // Replace with your API URL
                const json = await response.json();
                setProperties(json.properties);
                setWhyList(json.why);
                setHowWorks(json.how);
                setContactpage(json.formPage);
                console.log(howWorks);
                // Assuming the response data is an array of options
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);
    return (
        <div>
            {/* Hero Section */}
            {properties ? (
                <>
                    <div
                        className={`list-property-us head-sect article-main `}
                    >
                        <div className="section-dark d-none hide page-banner at-career list-banner-home ccarer half-height   more-height sect-blog face-11" >
                            <div
                                className="full-block page-banner-image as"
                                style={{ backgroundImage: `url(${properties?.banner})` }}
                            >
                            </div>
                            <div className="full-block overlay"></div>
                            {properties?.headerTitle && (
                                <div className="container at-center-container h-100">
                                    <div className="row disp-table h-100">
                                        <div className="col col-md-12 h-100">
                                            <div className="page-banner-content h-100">
                                                <div className="page-banner-content h-100">
                                                    <div className="fancy-title-hold text-initial clearfix">

                                                        {properties.sub_title && (
                                                            <h3
                                                                className="sub-title-fnt"

                                                            >
                                                                {properties.sub_title}
                                                            </h3>
                                                        )}
                                                        <h2 className="fancy-title animate animated">
                                                            {properties?.headerTitle}


                                                        </h2>
                                                        <div className="request-area">
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={scrollToRequest}
                                                                sx={{
                                                                    fontFamily: 'inherit',
                                                                    fontSize: '1.25rem',       // bigger text
                                                                    py: 1.5,                   // vertical padding (top & bottom)
                                                                    px: 3,                     // horizontal padding (left & right)
                                                                    minHeight: 58,             // minimum height
                                                                }}
                                                                endIcon={
                                                                    <KeyboardArrowRightIcon
                                                                        sx={{ fontSize: 30, ml: 0.5 }}
                                                                    />
                                                                }
                                                            >
                                                                List Your Property
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    {whyList?.headerTitle && (
                        <section className="py-5">
                            <div className="  mx-1200 ">

                                <div className="row align-items-center">
                                    {/* Left side: why content */}
                                    <div className="col-md-7">
                                        <Typography
                                            variant="h2"
                                            component="h2"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 3,           // margin bottom to space below heading
                                                color: 'primary.main',
                                            }}
                                            data-aos="fade-up" data-aos-delay="500"
                                        >
                                            {whyList?.headerTitle}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            className='pr25'
                                            sx={{
                                                color: 'primary.dark',
                                                textAlign: 'justify',
                                            }}
                                            data-aos="fade-up" data-aos-delay="600"
                                            component="div"       // use div because content may contain block elements
                                            dangerouslySetInnerHTML={{ __html: whyList?.content || '' }}
                                        />

                                    </div>

                                    {/* Right side: banner image */}
                                    <div className="col-md-5 text-center">
                                        <img
                                            src={whyList.banner}
                                            alt="Why list with us banner"
                                            style={{
                                                maxWidth: '100%',
                                                borderRadius: '12px',

                                                objectFit: 'cover',
                                                height: 'auto',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {howWorks?.headerTitle && (
                        <section className="py-5">
                            <div className="mx-1200 ">
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 1,           // margin bottom to space below heading
                                        color: 'primary.main',
                                    }}
                                    data-aos="fade-up" data-aos-delay="500"
                                >
                                    {howWorks?.headerTitle}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className='pr25'
                                    sx={{
                                        color: 'primary.dark',
                                        textAlign: 'justify',
                                        mb: 3,  
                                    }}
                                    data-aos="fade-up" data-aos-delay="600"
                                    component="div"       // use div because content may contain block elements
                                    dangerouslySetInnerHTML={{ __html: howWorks?.sub_title || '' }}
                                />
                                

                                <Box
                                    display="flex"
                                    className="htm-how-parent mt-5"
                                    flexWrap="wrap"
                                    justifyContent="center"
                                    data-aos="fade-up"
                                    data-aos-delay="700"
                                    gap={4}
                                    mt={4}
                                >
                                    {howWorks?.items?.map((item: HowWorksItemsProps, index: number) => (
                                        <Card
                                            className="htm-how-parent-cards"
                                            data-aos="fade-up"
                                            key={index}
                                            sx={{
                                                backgroundColor:'#fff',
                                                borderRadius: 2,
                                                
                                                boxShadow: 3,
                                                transition: 'transform 0.3s ease',
                                                '&:hover': { transform: 'translateY(-5px)' },
                                            }}
                                        >
                                            <CardMedia component="img" image={item.banner} alt={item.title} className="icon-card-icon-how" />
                                            <CardContent>
                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                    Step {item.step}
                                                </Typography>
                                                <Typography variant="h6" gutterBottom>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body1" color="primary.dark">
                                                    {item.content}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}

                                </Box>
                            </div>
                        </section>
                    )}
                    {/*
          <TestimonialSliderOnly apiUrl={`${API_URL}reviews/page_type/list-property/lang/${language}`} />
           */}
                    <section className="pb-0" ref={requestRef}>
                        <Box sx={{ backgroundColor: '#f5f7fa', py: 8 }}>
                            <Box
                                sx={{
                                    maxWidth: '1200px',
                                    mx: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    gap: 4,
                                    px: 2,
                                }}
                            >
                                {/* Left Side */}
                                <Box flex={1}>
                                
                                    <Typography
                                        variant="h2"

                                        mt={4}
                                        sx={{
                                            fontWeight: 700,
                                            mb: 3,           // margin bottom to space below heading
                                            color: 'primary.main',
                                        }}
                                        data-aos="fade-up" data-aos-delay="400"
                                        component="div"       // use div because content may contain block elements
                                        dangerouslySetInnerHTML={{ __html: contactpage?.Title || '' }}
                                    />

                                    <Typography variant="h5" sx={{ color: '#f97316', mt: 3 }}
                                        data-aos="fade-up"
                                        data-aos-delay="200"
                                        className="hide d-none"
                                    >
                                        {contactpage?.sold_text}
                                    </Typography>

                                    <Typography variant="h5" sx={{ color: '#dc2626', mt: 2 }}
                                        data-aos="fade-up"
                                        className="hide d-none"
                                        data-aos-delay="300"
                                    >
                                        {contactpage?.listings_text}
                                    </Typography>

                                
                                    <Typography
                                        variant="body1" 
                                    
                                        mt={4} 
                                        sx={{
                                            color: 'primary.dark',
                                            textAlign: 'justify',
                                            mb: 3,
                                        }}
                                        data-aos="fade-up" data-aos-delay="400"
                                        component="div"       // use div because content may contain block elements
                                        dangerouslySetInnerHTML={{ __html: contactpage?.content || '' }}
                                    />

                                </Box>

                                {/* Right Side: Form */}
                                <Box
                                    flex={1}
                                    bgcolor="white"
                                    maxWidth='400px'
                                    p={4}
                                    borderRadius={2}
                                    boxShadow={2}
                                >
                                    <ListYourProperty />
                                </Box>
                            </Box>
                        </Box>
                    </section>
                </>
            ) : (
                <FullPageLoader />
            )}

        </div>
    );
};

export default ListYourPropertyContent;
