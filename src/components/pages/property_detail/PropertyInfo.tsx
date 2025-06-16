import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";

interface Property {
  SystemRefNo: string;
  v_link?: string;
  communityTitle: string;
}

interface Props {
  property: Property;
  open3dVideo: (url: string) => void;
}

const PropertyInfo: React.FC<Props> = ({ property, open3dVideo }) => {
  return (
    <Box mt={2}>
      <Typography variant="body1" fontWeight={500}>
        Property reference: {property.SystemRefNo}
        {property.v_link && (
          <Link
            href="#"
            underline="none"
            onClick={(e) => {
              e.preventDefault();
              open3dVideo(property.v_link!);
            }}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              ml: 2,
              fontWeight: 500,
              color: "primary.main",
              "& img": { width: 20, height: 20, mr: 0.5 },
            }}
            className="tour-link"
          >
            <ThreeDRotationIcon fontSize="small" sx={{ mr: 0.5 }} />
            <span>3D Tour</span>
          </Link>
        )}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1} mt={1}>
        <LocationOnIcon color="action" fontSize="small" />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {property.communityTitle}
        </Typography>
      </Stack>
    </Box>
  );
};

export default PropertyInfo;
