import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Collapse,
    Box,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface NavigationProps {
    hidePopup: () => void;
}

const isActiveLink = (path: string, currentPath: string) =>
    currentPath.startsWith(path);

const Navigation: React.FC<NavigationProps> = ({ hidePopup }) => {
    const location = useLocation();
    const [openListProperty, setOpenListProperty] = React.useState(false);
    const [openAbout, setOpenAbout] = React.useState(false);
    const [openContact, setOpenContact] = React.useState(false);

    const handleNavLinkClick = () => hidePopup();

    const linkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? 'var(--primaryColor)' : '#333',
        fontWeight: isActive ? 600 : 400,
        textDecoration: 'none',
    });

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                bgcolor: '#fff',
                color: '#333',
                p: 2,
                pt: 0,
            }}
        >
            {/* Menu List */}
            <List component="nav" disablePadding>
                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/"
                        onClick={handleNavLinkClick} 
                    >
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/for-sale"
                        onClick={handleNavLinkClick}
                        sx={linkStyle({ isActive: isActiveLink('/sale/', location.pathname) })}
                    >
                        <ListItemText primary="Buy" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/for-rent"
                        onClick={handleNavLinkClick}
                        sx={linkStyle({ isActive: isActiveLink('/rent/', location.pathname) })}
                    >
                        <ListItemText primary="Rent" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/offplan-properties-for-sale"
                        onClick={handleNavLinkClick}
                        sx={linkStyle({ isActive: isActiveLink('/offplan-project/', location.pathname) })}
                    >
                        <ListItemText primary="Off-Plan" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        component={NavLink}
                        to="/communities"
                        onClick={handleNavLinkClick}
                        sx={linkStyle({ isActive: isActiveLink('/area-guides-detail/', location.pathname) })}
                    >
                        <ListItemText primary="Communities" />
                    </ListItemButton>
                </ListItem>

                {/* List A Property Submenu */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpenListProperty(!openListProperty)}>
                        <ListItemText primary="List A Property" />
                        {openListProperty ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openListProperty} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to="/list-a-property/property-valuation"
                                onClick={handleNavLinkClick}
                                sx={{ pl: 4, fontSize: '0.9rem', ...linkStyle({ isActive: false }) }}
                            >
                                <ListItemText primary="Property Valuation" sx={{ fontSize: '0.9rem' }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to="/list-your-property"
                                onClick={handleNavLinkClick}
                                sx={{
                                    pl: 4,
                                    fontSize: '0.9rem',
                                    ...linkStyle({
                                        isActive: isActiveLink('/property-valuation/', location.pathname),
                                    }),
                                }}
                            >
                                <ListItemText primary="List Your Property" sx={{ fontSize: '0.9rem' }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>

                {/* About Us Submenu */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpenAbout(!openAbout)}>
                        <ListItemText primary="About Us" />
                        {openAbout ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openAbout} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {[
                            { label: 'Our Story', path: '/about-us/our-story' },
                            { label: 'Why Choose Us', path: '/about-us/why-choose-us' },
                            { label: 'Our Teams', path: '/about-us/our-teams' },
                            { label: 'Client Reviews', path: '/about-us/client-reviews' },
                            { label: 'Careers', path: '/about-us/careers' },
                        ].map((item) => (
                            <ListItem disablePadding key={item.path}>
                                <ListItemButton
                                    component={NavLink}
                                    to={item.path}
                                    onClick={handleNavLinkClick}
                                    sx={{ pl: 4, ...linkStyle({ isActive: isActiveLink(item.path, location.pathname) }) }}
                                >
                                    <ListItemText primary={item.label} sx={{ fontSize: '0.9rem' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Contact Us Submenu */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setOpenContact(!openContact)}>
                        <ListItemText primary="Contact Us" />
                        {openContact ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={openContact} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to="/contact-us"
                                onClick={handleNavLinkClick}
                                sx={{ pl: 4, fontSize: '0.9rem', ...linkStyle({ isActive: false }) }}
                            >
                                <ListItemText primary="General Enquiry" sx={{ fontSize: '0.9rem' }} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to="/contact-us/send-your-cv"
                                onClick={handleNavLinkClick}
                                sx={{ pl: 4, fontSize: '0.9rem', ...linkStyle({ isActive: false }) }}
                            >
                                <ListItemText primary="Careers / Send Your CV" sx={{ fontSize: '0.9rem' }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Box>
    );
};

export default Navigation;
