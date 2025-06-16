import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { API_URL } from '@/Constants';
import SuccessMessage from '@/components/pages/SuccessMessage';

import SecurityIcon from '@mui/icons-material/Security';
import {
    Grid,
    TextField,
    Button,
    MenuItem,
    Typography,
    Box,
    InputAdornment,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email'; 
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface Option {
    id: string;
    name: string;
}

interface PropertyValuationFormProps {
    options: Option[];
    formType: number;
}

type FormDataType = {
    name: string;
    email: string;
    ph: string;
    sect: string;
    category: string;
    location: string;
    description: string;
};

const PropertyValuationForm: React.FC<PropertyValuationFormProps> = ({ options, formType }) => {
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: '',
        ph: '',
        sect: '',
        category: '',
        location: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [successNotification, setSuccessNotification] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handlePhoneChange = (value: string) => {
        setFormData((prevData) => ({ ...prevData, ph: value }));
        setErrors((prev) => ({ ...prev, ph: '' }));
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setSuccessNotification('');
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        const formErrors: Record<string, string> = {};

        if (!formData.name.trim()) formErrors.name = 'Name is required';
        if (!formData.email.trim()) formErrors.email = 'Email is required';
        if (!formData.ph.trim()) formErrors.ph = 'Phone is required';
        if (!formData.location.trim()) formErrors.location = 'Location is required';
        if (!formData.description.trim()) formErrors.description = 'Message is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (!executeRecaptcha) {
            setResponseMessage('reCAPTCHA not yet available. Please try again later.');
            return;
        }

        setLoading(true);
        setResponseMessage('');
        try {
            // Execute reCAPTCHA v3 and get token
            const token = await executeRecaptcha('property_valuation_form');

            const formPayload = new FormData();
            formPayload.append('name', formData.name);
            formPayload.append('email', formData.email);
            formPayload.append('ph', formData.ph);
            formPayload.append('sect', formData.sect);
            formPayload.append('category', formData.category);
            formPayload.append('location', formData.location);
            formPayload.append('description', formData.description);
            formPayload.append('formType', String(formType));
            formPayload.append('recaptcha_token', token);

            const response = await axios.post(`${API_URL}property_valuation`, formPayload);

            if (response.data.status === 'success') {
                setSuccessNotification(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    ph: '',
                    sect: '',
                    category: '',
                    location: '',
                    description: '',
                });
                setErrors({});
            } else {
                setResponseMessage('There was an error with your submission.');
                if (response.data.errors) setErrors(response.data.errors);
            }
        } catch (err) {
            setResponseMessage('Network error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
           
            {successNotification && <SuccessMessage responseMessage={successNotification} />}

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name || ''}
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
                        helperText={errors.email || ''}
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
                    <Box
                                            className="phoneinp-grid"
                                            sx={{
                                                '& .PhoneInputInput': {
                                                    fontSize: '16px',
                                                    padding: '16.5px 14px',
                                                    border: '0px solid rgba(0, 0, 0, 0.23)',
                                                    borderRadius: '4px',
                                                    width: '100%',
                                                    boxSizing: 'border-box',
                                                    backgroundColor: '#fff',
                                                },
                                                position: 'relative',
                                            }}
                                        >
                                          
                                            <PhoneInput
                                                international
                                                defaultCountry="AE"
                                                value={formData.ph}
                                                onChange={handlePhoneChange}
                                                placeholder="Phone"
                                                countryCallingCodeEditable={false}
                                                className="mui-phone-input"
                                                style={{ paddingLeft: '48px' }}
                                            />
                                            {errors.ph && (
                                                <Typography color="error" variant="caption" sx={{ pl: 1 }}>
                                                    {errors.ph}
                                                </Typography>
                                            )}
                                        </Box>
                </Grid>

                <Grid item xs={12} sm={6} className="d-none hide">
                    <TextField
                        select
                        fullWidth
                        label="Designation"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        error={!!errors.category}
                        helperText={errors.category || ''}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <WorkIcon />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="">Select Designation</MenuItem>
                        {options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        error={!!errors.location}
                        helperText={errors.location || ''}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOnIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {formType !== 1 && (
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Message"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            error={!!errors.description}
                            helperText={errors.description || ''}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MessageIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button fullWidth type="submit" variant="contained" sx={{ fontSize: '1.1rem' }} color="primary" disabled={loading}>
                        {loading ? 'Processing...' : 'Submit Details'}
                    </Button>
                </Grid>
                {responseMessage && <Typography color="error">{responseMessage}</Typography>}
                <div className="text-center d-block w-100-p">
                    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', }}  >
                        <SecurityIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="textSecondary">
                            Protected by reCAPTCHA —&nbsp;
                            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy</a> |&nbsp;
                            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms</a>
                        </Typography>
                    </Box>
                </div>
            </Grid>
        </Box>
    );
};

export default function PropertyValuationFormWithRecaptcha(props: PropertyValuationFormProps) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={RECAPTCHA_SITE_KEY}// Replace with your actual site key
            scriptProps={{ async: true, defer: true, appendTo: 'body' }}
            useRecaptchaNet={true} 
        >
            <PropertyValuationForm {...props} />
        </GoogleReCaptchaProvider>
    );
}
