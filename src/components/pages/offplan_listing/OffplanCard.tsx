import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box, 
    Button,
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export type OffplanData = {
    id: string;
    image: string;
    AtttributePropertyDetails: string;
    adTitle: string;
    DetailUrl: string;
    CommunityTitle: string;
    bgImage: string;
    developer_name: string;
    p_o_r: string;
    PriceTitleDetail: string;
};

interface OffplanCardProps {
    property: OffplanData;
}

const OffplanCard: React.FC<OffplanCardProps> = ({ property }) => {
    const {
        id,
        image,
        AtttributePropertyDetails,
        adTitle,
        DetailUrl,
        CommunityTitle,
        bgImage,
        developer_name,
        p_o_r,
        PriceTitleDetail,
    } = property;

    const baseUrl = window.location.origin;

    return (
        <Card
            key={id}
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.08)',
                transition: '0.3s ease',
                '&:hover': {
                    boxShadow: '0px 10px 36px rgba(0, 0, 0, 0.12)',
                    transform: 'translateY(-4px)',
                },
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="div"
                    image={image}
                    sx={{
                        height: 360,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                {/* Developer Logo */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'white',
                        p: 0.5,
                        borderRadius: '50%',
                        boxShadow: 1,
                        width: 48,
                        height: 48,
                    }}
                    title={developer_name}
                >
                    <img
                        src={bgImage}
                        alt={developer_name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </Box>

                {/* View Button */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                    }}
                >
                    <NavLink to={`${baseUrl}${DetailUrl}`}>
                        <Button variant="contained" startIcon={<ZoomInIcon />} size="small">
                            View
                        </Button>
                    </NavLink>
                </Box>
            </Box>

            <CardContent sx={{ backgroundColor: '#f9f9f9', flexGrow: 1 }}>
                {/* Community */}
                <Box display="flex" alignItems="center" mb={1}>
                    <LocationOnIcon fontSize="small" sx={{ color: 'gray', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {CommunityTitle}
                    </Typography>
                </Box>

                {/* Title */}
                <Typography
                    variant="h6"
                    component={NavLink}
                    to={`${baseUrl}${DetailUrl}`}
                    sx={{
                        textDecoration: 'none',
                        color: 'text.primary',
                        fontWeight: 600,
                        lineHeight: 1.3,
                        display: 'block',
                        mb: 1,
                    }}
                >
                    {adTitle}
                </Typography>

                {/* Price */}
                <Box>
                    {p_o_r !== '1' && (
                        <Typography variant="caption" color="text.secondary">
                            Starting From
                        </Typography>
                    )}
                    <Typography
                        variant="h5"
                        color="primary"
                        sx={{
                            mt: 0.5,
                            color: 'var(--primaryColor)',  // or a custom dark color like '#111'
                            fontWeight: 'bold',
                          }} 
                        dangerouslySetInnerHTML={{ __html: PriceTitleDetail }}
                    />
                </Box>

                {/* Optional Attributes */}
                {AtttributePropertyDetails && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                        dangerouslySetInnerHTML={{ __html: AtttributePropertyDetails }}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default OffplanCard;
