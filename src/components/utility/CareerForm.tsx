import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDropzone } from 'react-dropzone';
import { API_URL } from '@/Constants';
import SuccessMessage from '../pages/SuccessMessage';
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
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import SecurityIcon from '@mui/icons-material/Security';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface Option {
    id: string;
    name: string;
}

interface CareerFormProps {
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

const CareerForm: React.FC<CareerFormProps> = ({ options, formType }) => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: '',
        ph: '',
        sect: '',
        category: '',
        location: '',
        description: '',
    });

    const [cvFile, setCvFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [successNotification, setSuccessNotification] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

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
        if (formType !== 1 && !formData.description.trim())
            formErrors.description = 'Description is required';
        if (!cvFile) formErrors.cv = 'CV is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc', '.docx'],
        },
        multiple: false,
        onDrop: (acceptedFiles) => {
            setCvFile(acceptedFiles[0]);
            setErrors((prev) => ({ ...prev, cv: '' }));
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (!executeRecaptcha) {
            setResponseMessage('Recaptcha not yet available. Please try again later.');
            return;
        }

        setLoading(true);
        setResponseMessage('');
        try {
            const token = await executeRecaptcha('submit');

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
            if (cvFile) formPayload.append('cv', cvFile);

            const response = await axios.post(`${API_URL}career`, formPayload);

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
                setCvFile(null);
                setErrors({});
            } else {
                setResponseMessage('There was an error with your submission.');
                if (response.data.errors) setErrors(response.data.errors);
            }
        } catch (error) {
            setResponseMessage('Network error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
           
            {successNotification && <SuccessMessage responseMessage={successNotification} />}

            <Grid container spacing={(formType ===  2 ) ? 2 : 3}>
                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={12}>
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

                <Grid item xs={12} sm={6} >
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

                <Grid item xs={12} sm={6} className="hide">
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
                            label="Description about working for DSP"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            error={!!errors.description}
                            helperText={errors.description || ''}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Box
                        {...getRootProps()}
                        sx={{
                            border: '2px dashed #ccc',
                            padding: 2,
                            textAlign: 'center',
                            borderRadius: 2,
                            cursor: 'pointer',
                            backgroundColor: '#f9f9f9',
                        }}
                    >
                        <input {...getInputProps()} />
                        {cvFile ? (
                            <Typography>{cvFile.name}</Typography>
                        ) : isDragActive ? (
                            <Typography>Drop the CV here...</Typography>
                        ) : (
                            <Typography>Drag & drop your CV here, or click to select</Typography>
                        )}
                        {errors.cv && (
                            <Typography color="error" variant="caption">
                                {errors.cv}
                            </Typography>
                        )}
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
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

export default CareerForm;
