import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export interface BlogData {
    id: string;
    name: string;
    designation: string;
    title: string;
    email: string;
    phone: string;
    whatsapp: string;
    image: string;
    Title: string;
    adTitle: string;
    DetailUrl: string;
    ShortDescription: string;
}

interface TeamCardProps {
    member: BlogData;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
    const { name, title, email, phone, whatsapp, image, designation } = member;

    return (
        <Card sx={{ maxWidth: 300, borderRadius: 3, boxShadow: 3 }}>
            <CardMedia component="img" height="320" image={image} alt={name} />
            <CardContent>
                <Typography variant="h6" fontWeight="bold">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                    {title}
                </Typography>
                {designation && (
                    <Typography variant="subtitle2" color="text.secondary" mb={1}>
                        {designation}
                    </Typography>
                )}
                <Box display="flex" gap={1}>
                    {email && (
                        <IconButton href={`mailto:${email}`} color="primary">
                            <EmailIcon />
                        </IconButton>
                    )}
                    {phone && (
                        <IconButton href={`tel:${phone}`} color="primary">
                            <PhoneIcon />
                        </IconButton>
                    )}
                    {whatsapp && (
                        <IconButton
                            href={`https://wa.me/${whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                        >
                            <WhatsAppIcon />
                        </IconButton>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default TeamCard;
