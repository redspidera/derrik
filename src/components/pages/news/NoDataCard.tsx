import React from 'react';
import { Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

const NoDataCard: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 5,
        border: '1px dashed #ccc',
        borderRadius: 2,
        bgcolor: '#f9f9f9',
        color: 'text.secondary',
      }}
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 60, mb: 2, color: 'grey.500' }} />
      <Typography variant="h6" gutterBottom>
        No News or Events Found
      </Typography>
      <Typography variant="body2">
        We couldn’t find any events at the moment. Please check back later.
      </Typography>
    </Box>
  );
};

export default NoDataCard;
