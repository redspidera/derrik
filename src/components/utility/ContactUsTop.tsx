import React from 'react';
import { Box, Grid, Typography, Link, Divider } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface ContactUsProps {
    heading?: string;
    description?: string;
    phone?: string;
    email?: string;
    whatsappLink?: string;
    whatsappText?: string;
    address?: string;
}

const ContactUsTop: React.FC<ContactUsProps> = ({
    heading = "Do you have a question or enquiry for our team?",
    description = "Our dedicated support team is available 24/7 to assist you and answer all your questions.",
    phone,
    email,
    whatsappLink,
    whatsappText = "Click to WhatsApp",
    address,
}) => {
    return (
        <Box sx={{   p: { xs: 3, md: 8 } }}>
            <Grid container spacing={6} alignItems="center">
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Typography variant="overline" color="textSecondary" gutterBottom>
                        General Enquiry
                    </Typography>
                    <Typography variant="h2" component="h4" fontWeight="bold" gutterBottom>
                        {heading}
                    </Typography>
                    <Typography variant="body1" color="primary.dark" mt={2}>
                        {description}
                    </Typography>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={6}>
                    {/* Phone */}
                    {phone && (
                        <>
                            <Box display="flex" alignItems="center" py={2}>
                                <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">Phone</Typography>
                                    <Link href={`tel:${phone}`} underline="hover" color="inherit">
                                        {phone}
                                    </Link>
                                </Box>
                            </Box>
                            <Divider />
                        </>
                    )}

                    {/* Email */}
                    {email && (
                        <>
                            <Box display="flex" alignItems="center" py={2}>
                                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                                    <Link href={`mailto:${email}`} underline="hover" color="inherit">
                                        {email}
                                    </Link>
                                </Box>
                            </Box>
                            <Divider />
                        </>
                    )}

                    {/* WhatsApp */}
                    {whatsappLink && (
                        <>
                            <Box display="flex" alignItems="center" py={2}>
                                <WhatsAppIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">WhatsApp</Typography>
                                    <Link
                                        href={whatsappLink}
                                        underline="hover"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        color="inherit"
                                    >
                                        {whatsappText}
                                    </Link>
                                </Box>
                            </Box>
                            <Divider />
                        </>
                    )}

                    {/* Address */}
                    {address && (
                        <Box display="flex" alignItems="center" py={2}>
                            <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">Office Address</Typography>
                                <Typography variant="body2">{address}</Typography>
                            </Box>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactUsTop;
