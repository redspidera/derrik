import   { useState, useEffect } from 'react';
import CareerForm  from './CareerForm';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
import {
    Box,
    Grid,
    Typography,
    Paper
} from '@mui/material';
const API_URL = import.meta.env.VITE_API_URL;
interface Option {
    id: string; // or number, based on your data
    name: string;
}
const SendCV = () => {
     const [options, setOptions] = useState<Option[]>([]); // State to hold the options fetched from the API
          // Fetch data when the component mounts
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API_URL}listing_designation`); // Replace with your API URL
                const json = await response.json();
                const data: Option[] = json.data; 
                setOptions(data); // Assuming the response data is an array of options
              
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 8, px: { xs: 2, md: 6 } }}>
            <Grid container spacing={6} alignItems="flex-start">

                {/* Left Section: Info */}
                <Grid item xs={12} md={6}>
                  

                    <Typography variant="h2" component="h2" fontWeight="bold" gutterBottom>
                        Join the Signature Standard
                    </Typography>

                    <Typography variant="body1" color="primary.black" paragraph className="text-justify">
                        We're always looking for passionate professionals ready to shape the future of real estate in Dubai. If you believe in excellence, integrity, and creating meaningful client journeys, we’d love to hear from you.
                    </Typography>

                    <Typography variant="body1" color="primary.black" paragraph className="text-justify">
                        Send us your CV and let’s build something exceptional together.
                    </Typography>

                    <Box mt={4}>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            What Our Clients Say
                        </Typography>
                        <Typography variant="body2" color="primary.black" className="text-justify">
                            Our clients are at the heart of everything we do. Here’s what they have to say about their experience with Derrick Signature Properties, where every story is met with our Signature Standard.
                        </Typography>
                    </Box>
                </Grid>

                {/* Right Section: Form Placeholder */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                        {/* 🔽 INSERT YOUR FORM COMPONENT HERE */}
                        {/* Example: <SendCVForm /> */}
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Submit Your CV
                            </Typography>
                            {/* Form component goes here */}
                            <Box mt={2}>
                                {/* Replace this Box with your actual form */}
                                <Typography variant="body2" color="text.secondary">
                                    <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY}>
                                        <CareerForm options={options} formType={1} />
                                    </GoogleReCaptchaProvider>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SendCV;
