import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import SecurityIcon from '@mui/icons-material/Security';
import SuccessMessage from './SuccessMessage';
import {
    TextField,
    Select, Grid,
    MenuItem,
    Button,
    Typography,
    Box,
    CircularProgress,
} from '@mui/material';

import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { SelectChangeEvent } from '@mui/material/Select';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;; // Replace with your actual site key
const API_URL = import.meta.env.VITE_API_URL;
type FormDataType = {
    name: string;
    email: string;
    ph: string;
    sect: string;
    category: string;
    address: string;
};

interface Option {
    id: string;
    name: string;
}

const ListYourPropertyForm = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: '',
        ph: '',
        sect: '',
        category: '',
        address: '',
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [successNotification, setSuccessNotification] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [options, setOptions] = useState<Option[]>([]); // State to hold the options fetched from the API

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API_URL}listing_category`); // Replace with your API URL
                const data: Option[] = await response.json();
                setOptions(data); // Assuming the response data is an array of options
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);
    // Basic validation
    const validateForm = () => {
        const formErrors: Record<string, string> = {};
        if (!formData.name.trim()) formErrors.name = 'Name is required';
        if (!formData.email.trim()) formErrors.email = 'Email is required';
        if (!formData.ph.trim()) formErrors.ph = 'Phone is required';
        if (!formData.sect.trim()) formErrors.sect = 'Section is required';
        if (!formData.category.trim()) formErrors.category = 'Category is required';
        if (!formData.address.trim()) formErrors.address = 'Property Address is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Unified input change handler for TextField and Select
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
        setResponseMessage('');
    };

    // PhoneInput special handler
    const handlePhoneChange = (value: string) => {
        setFormData((prev) => ({ ...prev, ph: value || '' }));
        setErrors((prev) => ({ ...prev, ph: '' }));
        setResponseMessage('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (!executeRecaptcha) {
            setResponseMessage('Recaptcha not yet available');
            return;
        }

        setLoading(true);
        setResponseMessage('');

        try {
            const token = await executeRecaptcha('list_your_property_submit');

            // Construct params for GET request
            const params = new URLSearchParams({
                ...formData,
                recaptchaToken: token,
            });

            // Replace YOUR_API_URL with your actual endpoint
            const response = await axios.get(`${API_URL}send_list_your_property`, { params });

            if (response.data.status === 'success') {
                setSuccessNotification(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    ph: '',
                    sect: '',
                    category: '',
                    address: '',
                });
                setErrors({});
            } else {
                setResponseMessage(response.data.message || 'Submission failed');
                if (response.data.errors) setErrors(response.data.errors);
            }
        } catch (error) {
            setResponseMessage('Network error. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 0 }}>
        
            <Typography
                variant="h5"
                fontWeight={600}
                gutterBottom
                sx={{
                    color: 'text.primary',
                    mb: 1,
                }}
            >
                List Your Property
            </Typography>
            {successNotification &&
                (
                    <SuccessMessage responseMessage={successNotification} />

                )}

            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                />

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
                        mt: 2,
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

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Select
                            name="sect"
                            value={formData.sect}
                            onChange={handleInputChange}
                            displayEmpty
                            fullWidth
                            sx={{ mt: 3 }}
                            error={!!errors.sect}
                            required
                        >
                            <MenuItem value="" disabled>
                                Purpose
                            </MenuItem>
                            <MenuItem value="1">For Sale</MenuItem>
                            <MenuItem value="2">For Rent</MenuItem>
                            <MenuItem value="3">For Buy</MenuItem>
                        </Select>
                        {errors.sect && (
                            <Typography color="error" variant="caption">
                                {errors.sect}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            displayEmpty
                            fullWidth
                            sx={{ mt: 3 }}
                            error={!!errors.category}
                            required
                        >
                            <MenuItem value="" disabled>
                                Category
                            </MenuItem>
                            {options.map((opt) => (
                                <MenuItem key={opt.id} value={opt.id}>
                                    {opt.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.category && (
                            <Typography color="error" variant="caption">
                                {errors.category}
                            </Typography>
                        )}
                    </Grid>
                </Grid>


                <TextField
                    label="Property Address"
                    name="address"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    required
                />

                <Box sx={{ mt: 3, position: 'relative' }}>
                    <Button type="submit" variant="contained" disabled={loading} fullWidth>
                        {loading ? <CircularProgress size={24} /> : 'Submit Details'}
                    </Button>
                </Box>
                {responseMessage && (
                    <Typography sx={{ mt: 2 }} color="error">
                        {responseMessage}
                    </Typography>
                )}
                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="textSecondary">
                        Protected by reCAPTCHA —&nbsp;
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy</a> |&nbsp;
                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms</a>
                    </Typography>
                </Box>
            </form>
        </Box>
    );
};

// Wrapper to show reCAPTCHA icon only when form is visible
const ListYourPropertyWithCaptcha = () => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={RECAPTCHA_SITE_KEY}
            scriptProps={{
                async: true,
                defer: true,
                appendTo: 'head',
                nonce: undefined,
            }}
            useRecaptchaNet={true} // optional, uses recaptcha.net domain
        >
            <ListYourPropertyForm />
        </GoogleReCaptchaProvider>
    );
};

export default ListYourPropertyWithCaptcha;
