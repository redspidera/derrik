import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Container,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    Button,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';

// Interface for a single event
interface NewsEvent {
    id: string;
    title: string;
    date: string;
    image: string;
    description: string;
    slug: string;
}

// Simulated fetch function
const mockFetchSingleEvent = (slug: string): Promise<NewsEvent | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockData: NewsEvent[] = [
                {
                    id: '1',
                    title: 'Downtown Property Expo 2025',
                    date: '2025-07-01',
                    image: 'https://via.placeholder.com/800x400',
                    description:
                        'Join us at the city’s biggest property showcase event! Network with top realtors, developers, and get exclusive early-bird offers.',
                    slug: 'expo-2025',
                },
                {
                    id: '2',
                    title: 'Launch of Marina Sky Villas',
                    date: '2025-06-15',
                    image: 'https://via.placeholder.com/800x400',
                    description:
                        'DSP proudly unveils Marina Sky Villas – luxury above the clouds. Come experience the launch event with guided tours and model showrooms.',
                    slug: 'marina-sky-villas-launch',
                },
            ];

            const event = mockData.find((item) => item.slug === slug);
            resolve(event || null);
        }, 800);
    });
};

const SingleEventPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [event, setEvent] = useState<NewsEvent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (slug) {
            mockFetchSingleEvent(slug).then((data) => {
                setEvent(data);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={10}>
                <CircularProgress />
            </Box>
        );
    }

    if (!event) {
        return (
            <Container sx={{ py: 5 }}>
                <Typography variant="h5" color="error" align="center">
                    Event not found.
                </Typography>
                <Box mt={2} textAlign="center">
                    <Button variant="outlined" component={Link} to="/news-events">
                        Back to News & Events
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Box py={5}>
            <Container>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={event.image}
                        alt={event.title}
                        sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                        <Typography variant="overline" color="text.secondary">
                            {new Date(event.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Typography>

                        <Typography variant="h4" component="h1" gutterBottom>
                            {event.title}
                        </Typography>

                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                            {event.description}
                        </Typography>

                        <Box mt={3}>
                            <Button variant="contained" component={Link} to="/news-events">
                                ← Back to News & Events
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default SingleEventPage;
