import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

interface Property {
    id: string;
    image: string;
    Title: string;
    adTitle: string;
    DetailUrl: string;
    ShortDescription: string;
}

interface TestimonialCardProps {
  property: Property;
}

const TestimonialCardNew: React.FC<TestimonialCardProps> = ({ property }) => {
    const {

        image,
        Title,

        ShortDescription,
    } = property;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        border: '3px double #0047ab',
        borderRadius: '50%',
        width: isMobile ? 250 : 280,
        height: isMobile ? 250 : 280,
        mx: 'auto',
        textAlign: 'center',
        px: 3,
        py: 2,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}
    >
      <FormatQuoteIcon
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          fontSize: 36,
          color: '#0047ab',
        }}
      />
      <FormatQuoteIcon
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          fontSize: 36,
          color: '#0047ab',
          transform: 'rotate(180deg)',
        }}
      />
          <div className="hide d-none">
      <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
              {property.Title}
      </Typography>
          </div>
      {property.image && (
        <div className=" ">
        <Avatar
        className="d-none hide"
                  src={image}
                  alt={Title}
          sx={{ width: 56, height: 56, mb: 1 }}
          
        />
              </div>
      )}
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {ShortDescription}
      </Typography>
    </Box>
  );
};

export default TestimonialCardNew;
