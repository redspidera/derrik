import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Link, Button, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PropertyBreadcrumbsProps {
    property: {
        section_id: number;
        adTitle: string;
    };
}

const PropertyBreadcrumbs: React.FC<PropertyBreadcrumbsProps> = ({ property }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <Box
            sx={{
                p: 2,
                bgcolor: '#f5f5f5',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2,
            }}
        >
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                sx={{ whiteSpace: 'nowrap' }}
            >
                Back
            </Button>

            <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ flexWrap: 'wrap' }}>
                <Link underline="hover" color="inherit" component={NavLink} to="/">
                    Home
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    component={NavLink}
                    to={property.section_id === 1 ? '/for-sale' : '/for-rent'}
                >
                    {property.section_id === 1 ? 'Sale' : 'Rent'}
                </Link>
                <Typography
                    color="text.primary"
                    noWrap
                    sx={{ maxWidth: 200, textOverflow: 'ellipsis', overflow: 'hidden' }}
                    title={property.adTitle}
                >
                    {property.adTitle}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
};

export default PropertyBreadcrumbs;
