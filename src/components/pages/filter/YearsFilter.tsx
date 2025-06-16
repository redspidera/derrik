import React, { useState, MouseEvent } from 'react';
import {
    Box,
    Typography,
    Chip,
    Button,
    Stack,
    Menu,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface YearItem {
    id: number | string;
    name: string | number;
}

interface YearsFilterProps {
    yearOptions: YearItem[];
    onFilterChange?: (selectedIds: Array<number | string>) => void;
}

const YearsFilter: React.FC<YearsFilterProps> = ({ yearOptions, onFilterChange }) => {
    const [selectedIds, setSelectedIds] = useState<Array<number | string>>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleYear = (id: number | string) => {
        const updated = selectedIds.includes(id)
            ? selectedIds.filter((v) => v !== id)
            : [...selectedIds, id];

        setSelectedIds(updated);
        onFilterChange?.(updated);
    };

    const handleReset = () => {
        setSelectedIds([]);
        onFilterChange?.([]);
    };

    const handleDone = () => {
        onFilterChange?.(selectedIds);
        handleClose();
    };

    const formatSummary = () => {
        if (selectedIds.length === 0) return 'Select Years';

        const selectedNames = yearOptions
            .filter((year) => selectedIds.includes(year.id))
            .map((year) => year.name);

        return `Years: ${selectedNames.join(', ')}`;
    };

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpen}
                endIcon={<ArrowDropDownIcon />}
            >
                {formatSummary()}
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
                        Years
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {yearOptions.map((year) => (
                            <Chip
                                key={year.id}
                                label={year.name}
                                clickable
                                color={selectedIds.includes(year.id) ? 'primary' : 'default'}
                                onClick={() => toggleYear(year.id)}
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

export default YearsFilter;
