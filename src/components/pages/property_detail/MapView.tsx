import React from "react";
import { Box, Typography } from "@mui/material";

interface MapViewProps {
  latitude: number;
  longitude: number;
}

const MapView: React.FC<MapViewProps> = ({ latitude, longitude }) => {
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=AIzaSyAuq0074pFpCc_GKeTNEIpLTrNbQWTFRBQ`;

  return (
    <Box className="mt50">
       <Typography
              variant="subtitle1"
              fontWeight={700}
              mb={1}
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
        Map View
            </Typography>
    

      <Box
        sx={{
          width: "100%",
          height: { xs: 250, sm: 350, md: 450 }, // responsive height
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={googleMapsEmbedUrl}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        />
      </Box>
    </Box>
  );
};

export default MapView;
