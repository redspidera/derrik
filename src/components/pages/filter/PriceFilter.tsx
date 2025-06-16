import React, { useState, useEffect, MouseEvent } from 'react';
import {
    Box,
    Typography,
    Autocomplete,
    TextField,
    Button,
    Menu,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface PriceFilters {
    minPrice: string;
    maxPrice: string;
}

const priceOptions = ['0', '500', '1000', '2000', '3000', '5000', '10000', '20000', '50000'];

const initialFilters: PriceFilters = {
    minPrice: '',
    maxPrice: '',
};

interface PriceFilterProps {
    onFilterChange?: (filters: PriceFilters) => void;
    initialMinPrice?: string;
    initialMaxPrice?: string;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
    onFilterChange,
    initialMinPrice = '',
    initialMaxPrice = '',
}) => {
    const [filters, setFilters] = useState<PriceFilters>({
        minPrice: initialMinPrice,
        maxPrice: initialMaxPrice,
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setFilters({
            minPrice: initialMinPrice,
            maxPrice: initialMaxPrice,
        });
    }, [initialMinPrice, initialMaxPrice]);

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (field: keyof PriceFilters, value: string | null) => {
        const updatedFilters = {
            ...filters,
            [field]: value ?? '',
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

    return (
        <>
            <Button variant="outlined" onClick={handleOpen} endIcon={<ArrowDropDownIcon />}>
                {filters.minPrice || filters.maxPrice
                    ? `Price: ${filters.minPrice || 'Min'} - ${filters.maxPrice || 'Max'}`
                    : 'Price Range'}
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
                        zIndex: 1300,
                    },
                }}
            >
                <Box sx={{ maxHeight: 300, overflowY: 'auto', pr: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Min Price
                    </Typography>
                    <Autocomplete
                        freeSolo
                        disablePortal
                        options={priceOptions}
                        value={filters.minPrice}
                        onChange={(_, value) => handleChange('minPrice', value)}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" placeholder="Select or type" />
                        )}
                        sx={{ mb: 2 }}
                    />

                    <Typography variant="subtitle2" gutterBottom>
                        Max Price
                    </Typography>
                    <Autocomplete
                        freeSolo
                        disablePortal
                        options={priceOptions}
                        value={filters.maxPrice}
                        onChange={(_, value) => handleChange('maxPrice', value)}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" placeholder="Select or type" />
                        )}
                    />
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

export default PriceFilter;
