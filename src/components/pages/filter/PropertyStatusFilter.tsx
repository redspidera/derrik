import React, { useState, MouseEvent } from 'react';
import {
    Box,
    Button,
    Chip,
    Menu,
    Stack,
    Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface PropertyStatusFilterProps {
    selected?: string;
    onChange?: (status: string) => void;
}

const options = ['All', 'Primary', 'Secondary'];

const PropertyStatusFilter: React.FC<PropertyStatusFilterProps> = ({
    selected = '',
    onChange,
}) => {
    const [current, setCurrent] = useState<string>(selected);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (value: string) => {
        setCurrent(value);
    };

    const handleReset = () => {
        setCurrent('');
        onChange?.('');
    };

    const handleDone = () => {
        onChange?.(current);
        handleClose();
    };

    return (
        <>
            <Button
                variant="outlined"
                onClick={handleOpen}
                endIcon={<ArrowDropDownIcon />}
            >
                {(current && current!=='All') ? `${current}` : 'Property Status'}
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
                        Status
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                        {options.map((status) => (
                            <Chip
                                key={status}
                                label={status}
                                clickable
                                color={current === status ? 'primary' : 'default'}
                                onClick={() => handleSelect(status)}
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

export default PropertyStatusFilter;
