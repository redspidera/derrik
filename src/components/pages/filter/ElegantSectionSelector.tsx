// ListingTypeDropdown.tsx

import React from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    SelectChangeEvent,
    styled,
} from '@mui/material';

const StyledSelect = styled(Select<string>)({
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '& .MuiSelect-select': {
        padding: '10px 16px',
        fontWeight: 500,
    },
});

const StyledMenuItem = styled(MenuItem)({
    fontSize: 16,
    padding: '12px 20px',
    '&.Mui-selected': {
        backgroundColor: '#e6f4ea',
        color: '#2e7d32',
        fontWeight: 600,
    },
    '&:hover': {
        backgroundColor: '#f3f3f3',
    },
});

interface ListingTypeDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const ListingTypeDropdown: React.FC<ListingTypeDropdownProps> = ({ value, onChange }) => {
    const options = ['Sale', 'Rent', 'Off-Plan'];

    const handleChange = (event: SelectChangeEvent<string>, _child: React.ReactNode) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth size="small">
            <StyledSelect
                value={value}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => {
                    if (!selected) return <em>Select Listing Type</em>;
                    return selected;
                }}
            >
                <StyledMenuItem value="">
                    <em>Select Listing Type</em>
                </StyledMenuItem>
                {options.map((option) => (
                    <StyledMenuItem key={option} value={option}>
                        {option}
                    </StyledMenuItem>
                ))}
            </StyledSelect>
        </FormControl>
    );
};

export default ListingTypeDropdown;
