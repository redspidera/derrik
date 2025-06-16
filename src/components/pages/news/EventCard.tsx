import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export interface EventData {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    slug: string; // for route
}

interface EventCardProps {
    event: EventData;
}

const DEFAULT_IMAGE = 'https://via.placeholder.com/400x200?text=No+Image';

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <Card
            sx={{
                borderRadius: 2,
                boxShadow: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardMedia
                component="img"
                image={event.image || DEFAULT_IMAGE}
                alt={event.title}
                sx={{ height: 200 }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                        {event.date}
                    </Typography>
                </Stack>
                <Typography variant="h6" component="div" gutterBottom>
                    {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {event.description.length > 100
                        ? `${event.description.substring(0, 100)}...`
                        : event.description}
                </Typography>
                <Box>
                    <Button
                        component={Link}
                        to={`${event.slug}`}
                        size="small"
                        variant="outlined"
                    >
                        Read More
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default EventCard;
