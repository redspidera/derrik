import React from "react";
import { Box, Typography, Grid } from "@mui/material";

type Amenitie = {
    name: string;
    icon: string; // font awesome icon class names like "fa-wifi"
};

interface AmenitieProps {
    amenities: Amenitie[];
}

const Amenities: React.FC<AmenitieProps> = ({ amenities }) => {
    return (
        <Box  className="mt50">
            
             <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    mb={1}
                    sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                  >
                Amenities
                  </Typography>
            <Grid container spacing={0}>
                {amenities.map((amenity, index) => (
                    <Grid
                        item
                        key={index}
                        xs={12}  // full width on extra small screens
                        sm={6}   // 2 per row on small screens
                        md={4}   // 3 per row on medium+ screens
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "text.secondary",
                            wordBreak: "break-word",
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            py: 1,
                            px: 1,
                            gap: 1,
                        }}
                    >
                        <span
                            className="ime"
                            title={amenity.name}
                            style={{ display: "inline-flex", alignItems: "center" }}
                        >
                            <i className={`fa amenity-none ${amenity.icon}`} aria-hidden="true" />
                        </span>
                        <Typography component="span" sx={{ color: "text.primary", fontWeight: 500 }}>
                            {amenity.name}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Amenities;
