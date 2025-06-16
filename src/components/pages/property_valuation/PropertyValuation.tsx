import { useState, useEffect } from 'react';
import PropertyValuationForm from '@/components/pages/property_valuation/PropertyValuationForm';
import AboutService from '../blogs/AboutService';
import {
    Box,
    Grid,
    Typography,
    Paper
} from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL;

interface Option {
    id: string;
    name: string;
}

const PropertyValuation = () => {
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API_URL}about_cv`);
                const json = await response.json();
                const data: Option[] = json.data;
                setOptions(data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    return (
        <>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8, px: { xs: 2, md: 6 } }}>
            <Grid
                container
                spacing={6}
                alignItems="stretch" // Ensures equal height
            >
                {/* Left Section */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flex: 1 }}>
                        

                        <Box className="stagc-loc-txt" sx={{ mt: 12 }}>
                            <div className="py-5">
                                   
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
                                    Property Valuation
                                    </Typography> 
                                   
                                    <Typography variant="body1"
                                        data-aos="fade-up" data-aos-delay="600"
                                        sx={{
                                        color: 'text.dark',
                                        textAlign: 'justify',
                                       
                                    }}>
                                    Thinking of selling? Or just curious about your property's market value?
                                    At Derrick Signature Properties, we offer accurate, no-obligation property valuations
                                    backed by local expertise and in-depth market insight. Whether you're preparing to list
                                    or simply exploring your options, our team is here to provide honest advice — book your
                                    valuation today and take the first step with confidence.
                                </Typography>
                            </div>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Section (Form) */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, flex: 1 }}>
                       
                         <Typography
                                        variant="h5"
                                        fontWeight={600}
                                        gutterBottom
                                        sx={{
                                            color: 'text.primary',
                                            mb: 1,
                                        }}
                                    >
                                Enquire Now
                                    </Typography>
                        <Box mt={2}>
                            <PropertyValuationForm formType={2} options={options} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
                <div className="why-coose mt50"> 
                     
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 3,           // margin bottom to space below heading
                            color: 'primary.main',
                        }}
                        data-aos="fade-up" data-aos-delay="500"
                        className="text-center"
                    >
                        How It Works?
                    </Typography>

                    <AboutService apiUrl={`${API_URL}property_valuation_faq`} />
                </div>
        </Box>
        
        </>
    );
};

export default PropertyValuation;
