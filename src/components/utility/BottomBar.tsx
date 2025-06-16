import { useState, lazy, Suspense, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    BottomNavigation,
    BottomNavigationAction,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    CircularProgress,
    Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyIcon from '@mui/icons-material/Key';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CloseIcon from '@mui/icons-material/Close';

// Lazy load PropertyForm
const PropertyForm = lazy(() => import('../pages/home/PropertyForm')); // Adjust path as needed

export default function BottomBar() {
    const location = useLocation();

    // Map routes to indexes for BottomNavigation
    const routeToIndex = {
        '/': 0,
        '/search': 1, // optional dummy route for Search dialog tab
        '/for-sale': 2,
        '/for-rent': 3,
        '/offplan-properties-for-sale': 4,
    };

    const [value, setValue] = useState(routeToIndex[location.pathname as keyof typeof routeToIndex] ?? 0);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (location.pathname === '/search') {
            setOpenDialog(true);
            setValue(1);
        } else {
            setOpenDialog(false);
            const index = routeToIndex[location.pathname as keyof typeof routeToIndex];
            setValue(index ?? 0);
        }
    }, [location.pathname]);

    const handleChange = (_: unknown, newValue: number) => {
        setValue(newValue);
        if (newValue === 1) {
            setOpenDialog(true);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        setValue(0);
        // Optionally navigate('/') if you want to reset URL on close
    };

    return (
        <>
            <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Search Properties
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Suspense
                        fallback={
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress />
                            </Box>
                        }
                    >
                        <PropertyForm origin="home" onSearchComplete={handleClose} />
                    </Suspense>
                </DialogContent>
            </Dialog>

            <Paper
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    // Hide on screens wider than 768px
                    '@media (min-width:768px)': {
                        display: 'none',
                    },
                }}
                elevation={3}
            >
                <BottomNavigation showLabels value={value} onChange={handleChange}>
                    <BottomNavigationAction
                        component={NavLink}
                        to="/"
                        label="Home"
                        icon={<HomeIcon />}
                        value={0}
                    />
                    <BottomNavigationAction
                        label="Search"
                        icon={<SearchIcon />}
                        value={1}
                    />
                    <BottomNavigationAction
                        component={NavLink}
                        to="/for-sale"
                        label="Buy"
                        icon={<ShoppingCartIcon />}
                        value={2}
                    />
                    <BottomNavigationAction
                        component={NavLink}
                        to="/for-rent"
                        label="Rent"
                        icon={<KeyIcon />}
                        value={3}
                    />
                    <BottomNavigationAction
                        component={NavLink}
                        to="/offplan-properties-for-sale"
                        label="Off-Plan"
                        icon={<ApartmentIcon />}
                        value={4}
                    />
                </BottomNavigation>
            </Paper>
        </>
    );
}
