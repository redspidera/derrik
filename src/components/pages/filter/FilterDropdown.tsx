import React, { useState, MouseEvent, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Chip,
    Button,
    Stack,
    Menu,
    Autocomplete,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface PropertyFilterSidebarProps {
    onFilterChange?: (filters: Filters) => void;
    defaultFilters?: Partial<Filters>;
    amenities: Record<string, string>; // Amenities object from parent { id: label }
    developers: Record<string, string>; // Developers object from parent { id: label }
}

export type TourType = 'Floor plans' | 'Video tours' | '360° tours';

export interface Filters {
    areaMin: string;
    areaMax: string;
    keywords: string;
    developer: string[];        // <-- changed to array<string> for multi-select
    tourTypes: TourType[];
    furnishing: string;
    amenities: string[];        // Array of selected amenity IDs
}

export const initialFilters: Filters = {
    areaMin: '',
    areaMax: '',
    keywords: '',
    developer: [],            // <-- initialize empty array
    tourTypes: [],
    furnishing: '',
    amenities: [],
};

const PropertyFilterSidebar: React.FC<PropertyFilterSidebarProps> = ({
    onFilterChange,
    defaultFilters = {},
    amenities,
    developers,
}) => {
    // Convert amenities and developers objects to array of { id, label }
    const amenitiesOptions = Object.entries(amenities).map(([id, label]) => ({
        id,
        label,
    }));

    const developersOptions = Object.entries(developers).map(([id, label]) => ({
        id,
        label,
    }));

    const [filters, setFilters] = useState<Filters>({
        ...initialFilters,
        ...defaultFilters,
    });

    // Sync default amenities and developer if provided
    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            amenities: defaultFilters.amenities || prev.amenities,
            developer: defaultFilters.developer || prev.developer,
        }));
    }, [defaultFilters]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (field: keyof Filters, value: any) => {
        const updatedFilters = {
            ...filters,
            [field]: value,
        };
        setFilters(updatedFilters);
        onFilterChange?.(updatedFilters);
    };

    const handleToggleTourType = (type: TourType) => {
        const updatedTourTypes = filters.tourTypes.includes(type)
            ? filters.tourTypes.filter((t) => t !== type)
            : [...filters.tourTypes, type];
        const updatedFilters = { ...filters, tourTypes: updatedTourTypes };
        setFilters(updatedFilters);
        onFilterChange?.(updatedFilters);
    };

    const handleReset = () => {
        setFilters(initialFilters);
        onFilterChange?.(initialFilters);
    };

    const handleDone = () => {
        onFilterChange?.(filters);
        handleClose();
    };

    // Focus state for amenities and developer Autocomplete
    const [amenitiesFocused, setAmenitiesFocused] = useState(false);
    const [developerFocused, setDeveloperFocused] = useState(false);

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpen}
                endIcon={<ArrowDropDownIcon />}
            >
                More Filters
            </Button>

            <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                        borderRadius: 2,
                        zIndex: 1500,
                    },
                }}
            >
                <Box
                    sx={{
                        width: 320,
                        maxHeight: 300,
                        overflowY: 'auto',
                        pr: 1,
                    }}
                >
                    {/* Area */}
                    <Typography variant="subtitle2" gutterBottom>
                        Area (sqft)
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <TextField
                            label="Minimum"
                            size="small"
                            fullWidth
                            value={filters.areaMin}
                            onChange={(e) => handleChange('areaMin', e.target.value)}
                        />
                        <TextField
                            label="Maximum"
                            size="small"
                            fullWidth
                            value={filters.areaMax}
                            onChange={(e) => handleChange('areaMax', e.target.value)}
                        />
                    </Box>

                    {/* Keywords */}
                    <Typography variant="subtitle2" gutterBottom>
                        Keywords
                    </Typography>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Add relevant keywords"
                        value={filters.keywords}
                        onChange={(e) => handleChange('keywords', e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    {/* Developer */}
                    <Typography variant="subtitle2" gutterBottom>
                        Developer
                    </Typography>
                    <Autocomplete
                        multiple
                        options={developersOptions}
                        getOptionLabel={(option) => option.label}
                        value={developersOptions.filter((option) =>
                            filters.developer.includes(option.id)
                        )}
                        disablePortal
                        onChange={(_, value) => {
                            const selectedIds = value.map((v) => v.id);
                            handleChange('developer', selectedIds);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                placeholder="Select developer(s)"
                                onFocus={() => setDeveloperFocused(true)}
                                onBlur={() => setDeveloperFocused(false)}
                            />
                        )}
                        sx={{ mb: 2 }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderTags={(value, getTagProps) => {
                            if (developerFocused || value.length <= 2) {
                                // Show all tags if focused or 2 or less selected
                                return value.map((option, index) => {
                                    const { key, ...otherProps } = getTagProps({ index });
                                    return (
                                        <Chip
                                            key={option.id}
                                            label={option.label}
                                            {...otherProps}
                                        />
                                    );
                                });
                            }
                            // Otherwise, collapse tags
                            return [
                                ...value.slice(0, 2).map((option, index) => {
                                    const { key, ...otherProps } = getTagProps({ index });
                                    return (
                                        <Chip
                                            key={option.id}
                                            label={option.label}
                                            {...otherProps}
                                        />
                                    );
                                }),
                                <Chip
                                    key="more"
                                    label={`+${value.length - 2}`}
                                    style={{ marginLeft: 4 }}
                                />,
                            ];
                        }}
                    />

                    {/* Amenities */}
                    <Typography variant="subtitle2" gutterBottom>
                        Amenities
                    </Typography>
                    <Autocomplete
                        multiple
                        options={amenitiesOptions}
                        getOptionLabel={(option) => option.label}
                        value={amenitiesOptions.filter((option) =>
                            filters.amenities.includes(option.id)
                        )}
                        disablePortal
                        onChange={(_, value) => {
                            const selectedIds = value.map((v) => v.id);
                            handleChange('amenities', selectedIds);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                placeholder="Select amenities"
                                onFocus={() => setAmenitiesFocused(true)}
                                onBlur={() => setAmenitiesFocused(false)}
                            />
                        )}
                        sx={{ mb: 2 }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderTags={(value, getTagProps) => {
                            if (amenitiesFocused || value.length <= 2) {
                                // Show all tags if focused or 2 or less selected
                                return value.map((option, index) => {
                                    const { key, ...otherProps } = getTagProps({ index });
                                    return (
                                        <Chip
                                            key={option.id}
                                            label={option.label}
                                            {...otherProps}
                                        />
                                    );
                                });
                            }
                            // Otherwise, collapse tags
                            return [
                                ...value.slice(0, 2).map((option, index) => {
                                    const { key, ...otherProps } = getTagProps({ index });
                                    return (
                                        <Chip
                                            key={option.id}
                                            label={option.label}
                                            {...otherProps}
                                        />
                                    );
                                }),
                                <Chip
                                    key="more"
                                    label={`+${value.length - 2}`}
                                    style={{ marginLeft: 4 }}
                                />,
                            ];
                        }}
                    />

                    {/* Furnishing */}
                    <Typography variant="subtitle2" gutterBottom>
                        Furnishing
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {['Furnished', 'Unfurnished'].map((furnish) => (
                            <Chip
                                key={furnish}
                                label={furnish}
                                clickable
                                color={filters.furnishing === furnish ? 'primary' : 'default'}
                                onClick={() => handleChange('furnishing', furnish)}
                            />
                        ))}
                    </Stack>

                    {/* Tour Type */}
                    <Typography variant="subtitle2" gutterBottom>
                        Tour Type
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {['Floor plans', 'Video tours', '360° tours'].map((type) => (
                            <Chip
                                key={type}
                                label={type}
                                clickable
                                color={filters.tourTypes.includes(type as TourType) ? 'primary' : 'default'}
                                onClick={() => handleToggleTourType(type as TourType)}
                            />
                        ))}
                    </Stack>
                </Box>

                {/* Sticky Footer */}
                <Box
                    sx={{
                        mt: 2,
                        pt: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        backgroundColor: 'background.paper',
                        position: 'sticky',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1,
                    }}
                >
                    <Button variant="outlined" color="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="contained" onClick={handleDone}>
                        Done
                    </Button>
                </Box>
            </Menu>
        </>
    );
};

export default PropertyFilterSidebar;
