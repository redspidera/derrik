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
      p={isMobile ? 3 : 6}
      m="auto"
      maxWidth={isMobile ? 320 : 500}
      bgcolor={theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.background.paper}
      borderRadius={3}
      boxShadow={theme.palette.mode === 'light' ? 2 : 0}
      sx={{ mt: 4 }}
    >
      <HomeWorkOutlinedIcon
        sx={{
          fontSize: isMobile ? 48 : 72,
          color: theme.palette.text.disabled,
          mb: 2,
        }}
      />

      <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={600} gutterBottom>
        No Property Listings Match
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Try resetting your filters to explore more properties.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="medium"
        onClick={handleResetFilters}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default NoPropertyListings;
