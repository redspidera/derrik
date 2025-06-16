import React from "react";
import {
    Box,
    Typography,
    Grid,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import BathtubIcon from "@mui/icons-material/Bathtub";
import CategoryIcon from "@mui/icons-material/Category";
import CropSquareIcon from "@mui/icons-material/CropSquare";

interface Property {
    adTitle: string;
    priceWithCurrncy: string;
    category: string;
    bedrooms: number | string; // Support numeric or "Studio"
    bathrooms?: number | string;
    builtup_area: string;
}

interface Props {
    property: Property;
}

const PropertyOverview: React.FC<Props> = ({ property }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box mt={2}>
            {/* Title */}
            <Typography variant="h5" fontWeight={700} gutterBottom>
                {property.adTitle}
            </Typography>

            {/* Price */}
            <Typography
                variant="h6"
                fontWeight={600}
                color="primary"
                mb={1}
                sx={{ fontSize: isMobile ? "1.1rem" : "1.25rem" }}
            >
                {property.priceWithCurrncy}
            </Typography>

            {/* Info Grid */}
            <Grid
                container
                spacing={1}
                alignItems="center"
                mb={2}
                sx={{ flexWrap: "wrap", width: "100%" }}
            >
                {/* Category */}
                <Grid item xs="auto">
                    <Box display="flex" alignItems="center" gap={0.5} mr={1.5}>
                        <CategoryIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {property.category}
                        </Typography>
                    </Box>
                </Grid>

                {/* Bedrooms */}
                <Grid item xs="auto">
                    <Box display="flex" alignItems="center" gap={0.5} mr={1.5}>
                        <HotelIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {property.bedrooms === "Studio"
                                ? "Studio"
                                : `${property.bedrooms} BR`}
                        </Typography>
                    </Box>
                </Grid>

                {/* Bathrooms */}
                {property.bathrooms && (
                    <Grid item xs="auto">
                        <Box display="flex" alignItems="center" gap={0.5} mr={1.5}>
                            <BathtubIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                {property.bathrooms} Bath
                            </Typography>
                        </Box>
                    </Grid>
                )}

                {/* Area */}
                <Grid item xs="auto">
                    <Box display="flex" alignItems="center" gap={0.5} mr={1.5}>
                        <CropSquareIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                            {property.builtup_area} SQFT
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    );
};

export default PropertyOverview;
