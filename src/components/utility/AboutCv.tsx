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
const AboutCv = () => {
     const [options, setOptions] = useState<Option[]>([]); // State to hold the options fetched from the API
          // Fetch data when the component mounts
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API_URL}about_cv`); // Replace with your API URL
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
                <Grid item xs={12} md={6} >
                   

                   
                    <div className="stagc-loc-txt  mt50"><span className="stagc-loc-txt-span2"><div><div className="py-5">
                       
                        <Typography variant="h2" component="h2" fontWeight="bold" gutterBottom>
                            Careers
                        </Typography>
                        <div className="row align-items-center mb-5">
                            <div className="col-md-12">
                                <Typography variant="body1" color="primary.black" paragraph className="text-justify">
                                    At Derrick Signature Properties, we believe in building a collaborative, driven, and honest team that thrives on delivering exceptional results. We're always on the lookout for high achievers with a passion for property and a strong desire to succeed. If you're hardworking, client-focused, and ready to grow with a dynamic company, we’d love to hear from you - send us your CV and tell us why you’d be a great fit.
                                </Typography>
                     
                            </div>
                        </div>
                    </div>
                    </div></span></div>
 
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
                                    <CareerForm options={options} formType={2} />
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

export default AboutCv;
