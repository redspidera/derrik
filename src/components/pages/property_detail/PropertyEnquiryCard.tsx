import React, { useState, useRef } from "react";
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Button,
    Grid,
    Box,
    Link as MuiLink,
    Fade,
} from "@mui/material";
import ShareModal from "./ShareModal.tsx";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShareIcon from "@mui/icons-material/Share";
import PhoneIcon from "@mui/icons-material/Phone";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { PropertyData } from './PropertyDetailTemplate';
interface AdProps {
    property: PropertyData;
}

const PropertyEnquiryCard: React.FC<AdProps> = ({ property }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleTogglePhone = () => setShowPhone((prev) => !prev);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <Card
            sx={{
                p: 3,
                mb: 4,
                boxShadow: "0 8px 16px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.08)",
                borderRadius: 3,
                position: "relative",
                overflow: "visible",
            }}
        >
            <CardContent>
                {/* Title & Price with reduced spacing */}
                {property.adTitle && (
                    <Typography
                        variant="h6"
                        color="text.primary"
                        gutterBottom
                        sx={{ mb: 0.5 /* less bottom margin */ }}
                    >
                        {property.adTitle}
                    </Typography>
                )}
                {property.priceWithCurrncy && (
                    <Typography
                        variant="h5"
                        color="primary"
                        fontWeight={700}
                        gutterBottom
                        sx={{ mb: 1 /* tighten margin below price */ }}
                    >
                        {property.priceWithCurrncy}
                    </Typography>
                )}

                {/* Agent Info with tighter spacing */}
                <Grid
                    container
                    spacing={1} // reduce grid spacing from 2 to 1
                    alignItems="center"
                    sx={{ mb: 2, flexWrap: "nowrap" }} // reduce margin bottom from 3 to 2
                >
                    {property.agent_image && (
                        <Grid item>
                            <Avatar
                                src={property.agent_image}
                                alt={property.agent_name || "Agent"}
                                sx={{
                                    width: 80, // slightly smaller avatar
                                    height: 80,
                                    border: "3px solid #1976d2",
                                    boxShadow: "0 4px 8px rgba(25, 118, 210, 0.4)",
                                }}
                            />
                        </Grid>
                    )}

                    <Grid
                        item
                        xs
                        sx={{
                            backgroundColor: "#f5f7fa",
                            borderRadius: 3,
                            p: 1.5, // reduced padding from 3 to 1.5
                            boxShadow: "0 6px 15px rgba(0,0,0,0.07)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            minWidth: 0,
                        }}
                    >
                        {property.agent_name && (
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                color="primary"
                                sx={{
                                    mb: 0.25, // reduce space between name and designation
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={property.agent_name}
                            >
                                {property.agent_name}
                            </Typography>
                        )}

                        {property.designation && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    fontStyle: "italic",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                title={property.designation}
                            >
                                {property.designation}
                            </Typography>
                        )}
                    </Grid>
                </Grid>

                {/* Agent details (language, BRN, email) */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.25, // slightly reduced gap
                        borderTop: "1px solid #e0e0e0",
                        pt: 1.5, // reduce padding top a bit
                    }}
                >
                    {property.agent_language && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LanguageOutlinedIcon color="action" fontSize="small" />
                            <Typography variant="body2" color="text.primary" fontWeight={600}>
                                Languages:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                                {property.agent_language}
                            </Typography>
                        </Box>
                    )}

                    {property.brn && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <BadgeOutlinedIcon color="action" fontSize="small" />
                            <Typography variant="body2" color="text.primary" fontWeight={600}>
                                Agent BRN:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                                {property.brn}
                            </Typography>
                        </Box>
                    )}

                    {property.agent_email && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <EmailOutlinedIcon color="action" fontSize="small" />
                            <Typography variant="body2" color="text.primary" fontWeight={600}>
                                Email:
                            </Typography>
                            <MuiLink
                                href={`mailto:${property.agent_email}`}
                                underline="hover"
                                color="primary"
                                sx={{ fontWeight: 600, flexGrow: 1 }}
                            >
                                {property.agent_email}
                            </MuiLink>
                        </Box>
                    )}
                </Box>

                {/* Buttons */}
                <Box mt={2}>
                    <Grid container spacing={2}>
                        {property.agent_phone && (
                            <Grid item xs={12} sm={6} sx={{ position: "relative" }}>
                                <Button
                                    ref={buttonRef}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    startIcon={<PhoneIcon />}
                                    onClick={handleTogglePhone}
                                    sx={{ fontWeight: 600, textTransform: "none" }}
                                >
                                    {showPhone ? "Hide" : "Call Now"}
                                </Button>

                                <Fade in={showPhone}>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "110%",
                                            left: 0,
                                            zIndex: 10,
                                            bgcolor: "#fff",
                                            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                                            borderRadius: 2,
                                            p: 2,
                                            width: "100%",
                                            maxWidth: 320,
                                            color: "text.primary",
                                        }}
                                    >
                                        <Typography variant="subtitle1" gutterBottom>
                                            Call Us
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
                                            <MuiLink
                                                href={`tel:+${property.agent_phone}`}
                                                underline="hover"
                                                color="primary"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {property.agent_phone}
                                            </MuiLink>
                                        </Typography>

                                        {property.SystemRefNo && (
                                            <Box mt={1}>
                                                <Typography variant="caption" display="block" gutterBottom>
                                                    Please quote property reference
                                                </Typography>
                                                <Typography variant="body2" fontWeight="bold" gutterBottom>
                                                    {property.SystemRefNo}
                                                </Typography>
                                                <Typography variant="caption" display="block" gutterBottom>
                                                    when calling us
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Fade>
                            </Grid>
                        )}

                        {property.Whatsaplink && (
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<WhatsAppIcon />}
                                    href={property.Whatsaplink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        backgroundColor: "#25D366 !important",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#1ebe5b !important",
                                        },
                                        fontWeight: 600,
                                        textTransform: "none",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    WhatsApp
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Box>

                {/* Share Button */}
                <Box mt={3}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<ShareIcon />}
                        onClick={openModal}
                        sx={{
                            backgroundColor: "#E0E0E0!important",
                            color: "#424242!important",
                            fontWeight: 600,
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "#BDBDBD",
                            },
                        }}
                    >
                        Share
                    </Button>
                </Box>
            </CardContent>

            {/* Modal placeholder */}
                <ShareModal isOpen={isModalOpen} onClose={closeModal}
                            property={{
                                ad_id: property.ad_id.toString(), // Convert `ad_id` to string
                                detailUrlAbsolute: property.detailUrlAbsolute,
                                adTitle: property.adTitle,
                            }}
                        />
            
        </Card>
    );
};

export default PropertyEnquiryCard;
