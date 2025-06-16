import React, { useState, MouseEvent, useEffect } from 'react';
import {
    Box,
    Typography,
    Chip,
    Button,
    Stack,
    Menu,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Filters {
    propertyBeds: string[];
    propertyBath: string[];
}

interface BedBathProps {
    onFilterChange?: (filters: Filters) => void;
    initialBeds?: string[];
    initialBaths?: string[];
}

const initialFilters: Filters = {
    propertyBeds: [],
    propertyBath: [],
};

const BedBathFilter: React.FC<BedBathProps> = ({
    onFilterChange,
    initialBeds = [],
    initialBaths = [],
}) => {
    const [filters, setFilters] = useState<Filters>({
        propertyBeds: initialBeds,
        propertyBath: initialBaths,
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        setFilters({
            propertyBeds: initialBeds,
            propertyBath: initialBaths,
        });
    }, [initialBeds, initialBaths]);

    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleChip = (field: keyof Filters, value: string) => {
        const currentValues = filters[field];
        const updatedValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];

        const updatedFilters = {
            ...filters,
            [field]: updatedValues,
        };

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

    const formatSummary = () => {
        const beds = filters.propertyBeds.length ? filters.propertyBeds.join(', ') : '-';
        const baths = filters.propertyBath.length ? filters.propertyBath.join(', ') : '-';
        return `Beds: ${beds}, Baths: ${baths}`;
    };

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpen}
                endIcon={<ArrowDropDownIcon />}
            >
                {filters.propertyBeds.length || filters.propertyBath.length
                    ? formatSummary()
                    : 'Beds & Baths'}
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
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                        borderRadius: 2,
                        width: 340,
                    },
                }}
            >
                <Box sx={{ maxHeight: 300, overflowY: 'auto', pr: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Beds
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {['Studio', '1', '2', '3', '4', '5', '6', '7', '8+'].map((bed) => (
                            <Chip
                                key={bed}
                                label={bed}
                                clickable
                                color={filters.propertyBeds.includes(bed) ? 'primary' : 'default'}
                                onClick={() => toggleChip('propertyBeds', bed)}
                            />
                        ))}
                    </Stack>

                    <Typography variant="subtitle2" gutterBottom>
                        Baths
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {['1', '2', '3', '4', '5', '6'].map((bath) => (
                            <Chip
                                key={bath}
                                label={bath}
                                clickable
                                color={filters.propertyBath.includes(bath) ? 'primary' : 'default'}
                                onClick={() => toggleChip('propertyBath', bath)}
                            />
                        ))}
                    </Stack>
                </Box>

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
                        px: 1,
                        pb: 1,
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

export default BedBathFilter;
