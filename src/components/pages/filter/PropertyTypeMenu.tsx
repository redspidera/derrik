import { useState, useEffect } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  Box,
  ListItemIcon,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import HouseIcon from '@mui/icons-material/House';
import LandscapeIcon from '@mui/icons-material/Landscape';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import LayersIcon from '@mui/icons-material/Layers';

const iconMap = {
  ApartmentIcon,
  VillaIcon,
  HotelIcon,
  HomeIcon,
  BusinessIcon,
  HouseIcon,
  LandscapeIcon,
  CorporateFareIcon,
  LayersIcon,
} as const;

type IconKey = keyof typeof iconMap;

const iconKeyMap: Record<string, IconKey> = {
  apartment: 'ApartmentIcon',
  villa: 'VillaIcon',
  hotel: 'HotelIcon',
  home: 'HomeIcon',
  duplex: 'HouseIcon',
  commercialfloor: 'LayersIcon',
  halffloor: 'LayersIcon',
  hotelapartment: 'HotelIcon',
  land: 'LandscapeIcon',
  penthouse: 'ApartmentIcon',
  townhouse: 'HouseIcon',
  wholebuilding: 'BusinessIcon',
  office: 'CorporateFareIcon',
  residentialland: 'LandscapeIcon',
};

function getIconKeyFromName(name: string): IconKey {
  return iconKeyMap[name.toLowerCase()] || 'HomeIcon';
}

function RenderIcon({ iconName }: { iconName: string }) {
  const iconKey = getIconKeyFromName(iconName);
  const IconComponent = iconMap[iconKey];
  return <IconComponent fontSize="small" />;
}

type PropertyType = {
  id: string;
  name: string;
  icon?: string;
};

type PropertyTypeMenuProps = {
  data: {
    residential: PropertyType[];
    commercial: PropertyType[];
  };
  listingTypeValue: string;
  propertyTypeValue: string;
  onSelect: (category: string, value: PropertyType | null) => void;
};

export default function PropertyTypeMenu({
  data,
  listingTypeValue,
  propertyTypeValue,
  onSelect,
}: PropertyTypeMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<{
    category: string;
    value: PropertyType | null;
  } | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (category: string, value: PropertyType | null) => {
    setSelected({ category, value });
    onSelect(category, value);
    handleClose();
  };

  useEffect(() => {
    if (!propertyTypeValue || !listingTypeValue) return;

    const category = listingTypeValue.toLowerCase() as keyof typeof data;
    const match = data[category]?.find((item) => item.id === propertyTypeValue);

    if (match) {
      setSelected({ category, value: match });
    } else {
      setSelected({ category, value: null });
    }
  }, [propertyTypeValue, listingTypeValue, data]);

  const getLabel = () => {
    if (!selected) {
      const allTypes = [...data.residential, ...data.commercial];
      const matchedType = allTypes.find((item) => item.id === propertyTypeValue);

      if (matchedType) return matchedType.name;
      if (listingTypeValue) return listingTypeValue;
      return 'Property Type';
    }

    if (selected.value) return selected.value.name;
    return selected.category.charAt(0).toUpperCase() + selected.category.slice(1);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          fontFamily: 'inherit, sans-serif',
          minWidth: 240,
          textAlign: 'left',
          padding: '8px 16px',
          fontSize: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {getLabel()}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 2,
            width: 420,
            fontFamily: 'inherit',
            boxShadow: 3,
            borderRadius: '8px',
            transition: 'all 0.3s ease',
          },
        }}
      >
        {/* New parent scrollable wrapper */}
        <Box
          sx={{
            maxHeight: '65vh',
            overflowY: 'auto',
            padding: 1,
            width: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '3px',
            },
          }}
        >
          <Box
            className="h-list"
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'flex-start',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              px: 1,
            }}
          >
            {Object.entries(data).map(([category, types]) => (
              <Box key={category} sx={{ minWidth: 160 }}>
                <MenuItem
                  selected={
                    selected?.value === null && selected?.category === category
                  }
                  onClick={() => handleSelect(category, null)}
                  sx={{
                    mb: 1,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    padding: '10px 16px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.08)!important',
                    },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                    {category}
                  </Typography>
                </MenuItem>

                {types.map((type) => (
                  <MenuItem
                    key={type.id}
                    selected={
                      selected?.value?.id === type.id &&
                      selected?.category === category
                    }
                    onClick={() => handleSelect(category, type)}
                    sx={{
                      pl: 2,
                      fontSize: '0.875rem',
                      padding: '6px 16px',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08) !important ',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 30, pr: 0 }}>
                      {type.icon && <RenderIcon iconName={type.icon} />}
                    </ListItemIcon>
                    <ListItemText
                      primary={type.name}
                      sx={{ fontSize: '0.875rem' }}
                    />
                  </MenuItem>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Menu>
    </>
  );
}
