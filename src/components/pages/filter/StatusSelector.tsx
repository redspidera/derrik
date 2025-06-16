import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

type Status = 'All' | 'Primary' | 'Secondary';

interface StatusSelectorProps {
    selected: Status;
    onChange: (value: Status) => void;
}

const StyledToggleButton = styled(ToggleButton)(() => ({
    border: 'none',
    borderRadius: '6px !important',
    padding: '6px 16px',
    fontWeight: 500,
    color: '#333',
    textTransform: 'none',
    '&.Mui-selected': {
        backgroundColor: '#e6f5ed',
        color: '#1a7f5a',
        border: 'none',
    },
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
}));

const StatusSelector: React.FC<StatusSelectorProps> = ({ selected, onChange }) => {
    const handleSelection = (
        _: React.MouseEvent<HTMLElement>,
        newValue: Status | null
    ) => {
        if (newValue !== null) {
            onChange(newValue);
        }
    };

    return (
        <ToggleButtonGroup
            value={selected}
            exclusive
            className= "primary-selector" 
            onChange={handleSelection}
            aria-label="property status"
            sx={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '2px', 
            }}
        >
            <StyledToggleButton value="All">All</StyledToggleButton>
            <StyledToggleButton value="Primary">Primary</StyledToggleButton>
            <StyledToggleButton value="Secondary">Secondary</StyledToggleButton>
        </ToggleButtonGroup>
    );
};

export default StatusSelector;
