import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

type Feature = {
  name: string;
  value: string;
};

interface FeaturesListProps {
  features: Feature[];
}

const FeaturesList: React.FC<FeaturesListProps> = ({ features }) => {
  return (
    <Box className="mt50">
      <Typography
        variant="subtitle1"
        fontWeight={700}
        mb={1}
        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        Features
      </Typography>

      <Grid container spacing={0}>
        {features.map((feature, index) => (
          <Grid
            item
            xs={12}  // full width on mobile
            sm={6}   // half width on small screens and above
            key={index}
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              px: 1.5,
              py: 1.25,
          }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "0.9rem",
                gap: 1.25,
              }}
            >
              <CheckCircleOutlineIcon
                fontSize="small"
                color="primary"
                sx={{ flexShrink: 0, mt: "2px" }}
              />
              <Typography
                component="span"
                sx={{
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  color: "text.secondary",
                  width: 150,  // fixed width here
                  flexShrink: 0,
                }}
              >
                {feature.name}:
              </Typography>
              <Typography
                component="span"
                sx={{ fontWeight: 600, color: "text.primary", ml: 0.5 }}
              >
                {feature.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturesList;
