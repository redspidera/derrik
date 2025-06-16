import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
    TextField,
    Button,
    Grid,
    Box,
    Typography,
    InputAdornment,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MessageIcon from '@mui/icons-material/Message';
import SecurityIcon from '@mui/icons-material/Security';

import SuccessMessage from '../pages/SuccessMessage';
import { API_URL } from '@/Constants';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

type FormDataType = {
    name: string;
    email: string;
    ph: string;
    city: string;
    message: string;
};

interface ContactUsFormProps {
    adminEmail: string;
}

const ContactFormInner = ({ adminEmail }: ContactUsFormProps) => {
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: '',
        ph: '',
        city: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [successNotification, setSuccessNotification] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSuccessNotification('');
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateForm = () => {
        const formErrors: Record<string, string> = {};
        if (!formData.name.trim()) formErrors.name = 'Name is required';
        if (!formData.email.trim()) formErrors.email = 'Email is required';
        if (!formData.ph.trim()) formErrors.ph = 'Phone is required';
        if (!formData.message.trim()) formErrors.message = 'Message is required';
        return formErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!executeRecaptcha) {
            setResponseMessage('Recaptcha not ready. Please try again later.');
            return;
        }

        setLoading(true);
        try {
            setResponseMessage('');
            const token = await executeRecaptcha('contact_form');
            const response = await axios.get(`${API_URL}send_contact`, {
                params: {
                    ...formData,
                    recaptchaToken: token,
                },
              });
            if (response.data.status === 'success') {
                setSuccessNotification(response.data.message);
                setFormData({ name: '', email: '', ph: '', city: '', message: '' });
            } else {
                setResponseMessage(response.data.message || 'Submission failed.');
                if (response.data.errors) {
                    setErrors(response.data.errors);
                }
            }
        } catch (error) {
            setResponseMessage('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{
            px: { xs: 2, md: 10 }, // 2 = 16px, 10 = 80px
          }}>
            <div data-Email={adminEmail}></div>

           
            {successNotification && (
                <SuccessMessage responseMessage={successNotification} />
            )}

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Phone"
                        name="ph"
                        value={formData.ph}
                        onChange={handleInputChange}
                        error={!!errors.ph}
                        helperText={errors.ph}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={!!errors.city}
                        helperText={errors.city}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationCityIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MessageIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>
                        {loading ? 'Processing...' : 'Send Message'}
                    </Button>
                </Grid>
            </Grid>
            {responseMessage && <Typography color="error">{responseMessage}</Typography>}
            {/* reCAPTCHA badge hint */}
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SecurityIcon fontSize="small" color="action" />
                <Typography variant="caption" color="textSecondary">
                    Protected by reCAPTCHA —&nbsp;
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy</a> |&nbsp;
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms</a>
                </Typography>
            </Box>
        </Box>
    );
};

// ✅ Wrapper to detect visibility
const ContactUsForm = ({ adminEmail }: ContactUsFormProps) => {
    const [inView, setInView] = useState(false);
    const formRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.25 }
        );

        if (formRef.current) {
            observer.observe(formRef.current);
        }

        return () => {
            if (formRef.current) {
                observer.unobserve(formRef.current);
            }
        };
    }, []);

    return (
        <Box ref={formRef}>
            {inView ? (
                <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY}>
                    <ContactFormInner adminEmail={adminEmail} />
                </GoogleReCaptchaProvider>
            ) : (
                <ContactFormInner adminEmail={adminEmail} />
            )}
        </Box>
    );
};

export default ContactUsForm;
