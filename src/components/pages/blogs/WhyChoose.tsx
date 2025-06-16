import { useEffect, useState } from 'react';
import TestimonialSlider from './TestimonialSlider';
const API_URL = import.meta.env.VITE_API_URL;
import { 
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';

interface Service {
    title: string;
    image: string;
    alt: string;
    items: string[];
}

interface Props {
    apiUrl: string;
}

const WhyChoose = ({ apiUrl }: Props) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [apiUrl]);

    if (loading) return <div>Loading...</div>;

    return (
        <>
        <section className="about__services-wrapper pb-4 pt-32 tablet:pb-20 tablet:pt-40">
            <div>
              
                <Grid container spacing={4} alignItems="stretch">
                    {services.map((service, index) => (
                        <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
                            <Card
                                elevation={3}
                                sx={{
                                    borderRadius: 4,
                                    backgroundColor: '#fff',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    flexGrow: 1,
                                }}
                            >
                                {/* IMAGE REMOVED COMPLETELY */}

                                {/* Text Section */}
                                <CardContent
                                    sx={{
                                        p: { xs: 2, md: 4 },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        height: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        gutterBottom
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {service.title}
                                    </Typography>

                                    {service.items.map((item, idx) => (
                                        <Typography
                                            key={idx}
                                            variant="body1"
                                            color="primary.black"
                                            component="p"
                                            sx={{ textAlign: 'justify', mb: 2 }}
                                            dangerouslySetInnerHTML={{ __html: item || '' }}
                                        />
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
              
            </div>
           
        </section>
        <section>
             <div className="clearfix"></div>
            <div className="mt-50">
                <TestimonialSlider apiUrl={`${API_URL}reviews`} />
            </div>
        </section>
        </>
    );
};

export default WhyChoose;
