import React from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    SelectChangeEvent,
    styled,
    MenuProps,
} from '@mui/material';

const primaryColor = 'var(--primaryColor)';

const StyledSelect = styled(Select<string>)({
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    color: primaryColor,
    '& .MuiSelect-select': {
        padding: '10px 16px',
        fontWeight: 500,
    },
    '&.Mui-focused .MuiSelect-select': {
        borderColor: primaryColor,
    },
});

const veryLightGold = '#f3ecdd';      // Very light gold (soft background)
const lightGoldHover = '#e8dcc2';     // Light gold hover (for buttons, highlights)

const StyledMenuItem = styled(MenuItem)({
    fontSize: 16,
    padding: '12px 20px',
    '&.Mui-selected': {
        backgroundColor: veryLightGold,
        color: primaryColor,
        fontWeight: 600,
    },
    '&.Mui-selected:hover': {
        backgroundColor: lightGoldHover,
    },
    '&:hover': {
        backgroundColor: '#f9f8f6',
    },
});

interface ListingTypeDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: { key: string; value: string }[];  // options passed from parent
}

const menuProps: Partial<MenuProps> = {
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
    },
    transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
    },
};

const SectionDropDown: React.FC<ListingTypeDropdownProps> = ({
    value,
    onChange,
    options,
}) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth size="small">
            <StyledSelect value={value} onChange={handleChange} MenuProps={menuProps}>
                {options.map(({ key, value: val }) => (
                    <StyledMenuItem key={key} value={key}>
                        {val}
                    </StyledMenuItem>
                ))}
            </StyledSelect>
        </FormControl>
    );
};

export default SectionDropDown;
