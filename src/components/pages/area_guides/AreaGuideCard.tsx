// AreaGuideCard.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
} from '@mui/material';

export type BlogData = {
    id: string;
    image: string;
    Title: string;
    adTitle: string;
    DetailUrl: string;
    ShortDescription: string;
};

interface AreaGuideCardProps {
    property: BlogData;
}

const AreaGuideCard: React.FC<AreaGuideCardProps> = ({ property }) => {
    const { image, Title, DetailUrl, ShortDescription } = property;
    const baseUrl = window.location.origin;

    return (
        <Card elevation={3} sx={{ borderRadius: 2, height: '100%' }}>
            <CardActionArea component={NavLink} to={`${baseUrl}${DetailUrl}`}>
                <CardMedia
                    component="img"
                    image={image}
                    alt={Title}
                    sx={{ height: 320, objectFit: 'cover' }}
                />
                <CardContent>
                     
                    <Typography
                                        variant="h6"
                                        component={NavLink}
                                        to={`${baseUrl}${DetailUrl}`}
                                        sx={{
                                            textDecoration: 'none',
                                            color: 'primary.main',
                                            fontWeight: 600,
                                            lineHeight: 1.3,
                                            display: 'block',
                                            mt: 2,
                                            mb: 2,
                                        }}
                                    >
                        {Title}
                                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        component="div"
                        className="inner-content-com1 text-justify"
                        dangerouslySetInnerHTML={{ __html: ShortDescription }}
                    />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default AreaGuideCard;
