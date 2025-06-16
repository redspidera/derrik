import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';

const NoPropertyListings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleResetFilters = () => {
    window.location.href = window.location.pathname;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      py={{ xs: 4, sm: 6 }}
      px={{ xs: 2, sm: 4 }}
      mx="auto"
      maxWidth={500}
      bgcolor={theme.palette.mode === 'light' ? '#f9f9f9' : theme.palette.background.paper}
      borderRadius={3}
      boxShadow={theme.palette.mode === 'light' ? 3 : 0}
      mt={4}
    >
      <HomeWorkOutlinedIcon
        sx={{
          fontSize: isMobile ? 56 : 72,
          color: theme.palette.text.disabled,
          mb: 2,
        }}
      />

      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        fontWeight="bold"
        gutterBottom
      >
        No Property Listings Match
      </Typography>

      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ mb: 2 }}
      >
        Try resetting your filters to explore more properties.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleResetFilters}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default NoPropertyListings;
