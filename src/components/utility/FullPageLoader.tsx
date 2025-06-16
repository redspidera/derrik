import React from 'react';
import { Box,   CircularProgress } from '@mui/material';

const FullPageLoader: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
            
        </Box>
    );
};

export default FullPageLoader;
