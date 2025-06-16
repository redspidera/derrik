import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import StraightenIcon from '@mui/icons-material/Straighten';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink } from 'react-router-dom';

export type PropertyData = {
  id: string;
  ad_id: number;
  name: string;
  price: number;
  ProfileImage: string;
  TotalImage: number;
  DetailUrl: string;
  SaveFave: string;
  BedroomsTitle: string;
  BathroomsTitle: string;
  parking: string;
  builtArea: string;
  LocationTitleOffering: string;
  AdTitle: string;
  priceWithCurrncy: string;
  agent_phone: string;
  agent_email: string;
  Whatsaplink: string;
  RentalPeriod?: string;
  categoryName?: string;
  v_link?: string;
  currency?: string;
};

interface PropertyCardProps {
  property: PropertyData;
}

const PropertyCard3: React.FC<PropertyCardProps> = ({ property }) => {
  const {
    ProfileImage,
    SaveFave,
    builtArea,
    DetailUrl,
    BedroomsTitle,
    BathroomsTitle,
    categoryName,
    currency,
    RentalPeriod,
    LocationTitleOffering,
    AdTitle,
    priceWithCurrncy,
  } = property;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const baseUrl = window.location.origin;

  return (
    <Card
    className="h-100"
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.08)', // slightly bolder shadow
        transition: '0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 10px 36px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-4px)',
        },
      }
      }
    >
      <Box sx={{ position: 'relative' }}>
        <NavLink to={`${baseUrl}${DetailUrl}`} onClick={scrollToTop} >
          <CardMedia
            component="img"
            image={ProfileImage}
            alt={AdTitle}
            sx={{
              height: 220,
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </NavLink>

        {
          categoryName && (
            <Chip
              label={categoryName}
              size="small"
              color="primary"
              sx={{ position: 'absolute', top: 12, left: 12 }
              }
            />
          )}

        <Box
          sx={{ position: 'absolute', top: 12, right: 12 }}
          dangerouslySetInnerHTML={{ __html: SaveFave }}
        />
      </Box>

      < CardContent sx={{ backgroundColor: '#fff', pt: 2, pb: 2.5 }}>
        {/* Price */}
        < Box display="flex" alignItems="baseline" gap={1} >
          <Typography component={NavLink} to={`${baseUrl}${DetailUrl}`} variant="h6" fontWeight="bold" color="var(--primaryColor)" >
            {currency} {priceWithCurrncy}
          </Typography>
          {
            RentalPeriod && (
              <Typography variant="body2" color="text.secondary" >
                /{RentalPeriod}
              </Typography>
            )
          }
        </Box>

        {/* Features row */}
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap={3}
          mt={1}
          mb={1.5}
        >
          <Box display="flex" alignItems="center" gap={0.5} >
            <BedIcon fontSize="small" sx={{ color: '#555' }} />
            < Typography variant="body2" > {BedroomsTitle} </Typography>
          </Box>
          < Box display="flex" alignItems="center" gap={0.5} >
            <BathtubIcon fontSize="small" sx={{ color: '#555' }} />
            < Typography variant="body2" > {BathroomsTitle} </Typography>
          </Box>
          {
            builtArea && (
              <Box display="flex" alignItems="center" gap={0.5} >
                <StraightenIcon fontSize="small" sx={{ color: '#555' }
                } />
                < Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: builtArea }}
                />
              </Box>
            )}
        </Box>

        {/* Title */}
        <Typography
          variant="subtitle1"
          component={NavLink}
          to={`${baseUrl}${DetailUrl}`}
          onClick={scrollToTop}
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            fontWeight: 500,
            display: 'inline-block',
            lineHeight: 1.3,
          }}
        >
          {AdTitle}
        </Typography>

        {/* Location */}
        <Box mt={1.5} display="flex" alignItems="center" >
          <LocationOnIcon fontSize="small" sx={{ color: 'gray', mr: 1 }} />
          < Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: LocationTitleOffering }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard3;
