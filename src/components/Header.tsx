import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Navigation from './nav/Navigation.tsx';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const API_URL = import.meta.env.VITE_API_URL;

interface HeaderProperties {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    pintrest: string;
    about: string;
    address: string;
    phone: string;
    email: string;
    copy: string;
    whatsapp: string;
    whatsappMessage: string;
}

interface MenuItemType {
    id: number;
    title: string;
    path: string;
    activePaths?: string[];
    subMenu?: MenuItemType[];
}

const Header = ({ LOGO, apiUrl }: { LOGO: string; apiUrl: string }) => {
    const [properties, setProperties] = useState<HeaderProperties | null>(null);
    const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSticky, setIsSticky] = useState(false);
    const language = 'en';
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const isHomePage =
        location.pathname === '/' ||
        location.pathname === `/${language}` ||
        location.pathname === `/${language}/`;

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
        document.body.classList.toggle('fix', !isMenuOpen);
    };

    const hidePopup = () => {
        setIsMenuOpen(false);
        document.body.classList.remove('fix');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propsRes, menuRes] = await Promise.all([
                    fetch(apiUrl),
                    fetch(`${API_URL}menu/lang/${language}`),
                ]);
                if (!propsRes.ok || !menuRes.ok) throw new Error('Failed to fetch');

                const propsData = await propsRes.json();
                const menuData = await menuRes.json();

                setProperties(propsData);
                setMenuItems(menuData);
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };
        fetchData();

        const onScroll = () => {
            if (isHomePage) setIsSticky(window.scrollY > 80);
        };
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [apiUrl, isHomePage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setAnchorEl(null);
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 🚫 Prevent body scroll on dropdown hover open
    useEffect(() => {
        if (openMenuId !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [openMenuId]);

    if (loading || !properties) return null;

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
        setAnchorEl(event.currentTarget);
        setOpenMenuId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenMenuId(null);
    };

    return (
        <header
            id="header"
            className={`header ${isSticky ? 'sticky' : ''} ${isHomePage ? 'no-inner inner-home' : 'inner-page sticky'} clearfix`}
        >
            <div className="header the-new-header">
                <div className="container11 auto-container111 pl15 pr15">
                    <div className="row item-list-header">
                        <div className="col col-sm-12 col-md-12 header-left">
                            <NavLink to="/" className="logo">
                                <img
                                    width={710}
                                    height={96}
                                    src={LOGO}
                                    className="attachment-full size-full"
                                    alt=""
                                />
                            </NavLink>

                            <ul className="items hide-on-mobile" ref={menuRef}>
                                {menuItems.map(({ id, title, path, activePaths, subMenu }) => {
                                    const isOpen = openMenuId === id;
                                    const isActiveButton =
                                        activePaths && activePaths.some((p) => location.pathname.startsWith(p));

                                    return (
                                        <li key={id}>
                                            {subMenu ? (
                                                <div
                                                    onMouseEnter={(e) => {
                                                        if (openMenuId !== id) {
                                                            handleMenuOpen(e as any, id);
                                                        }
                                                        if (closeTimeout.current) clearTimeout(closeTimeout.current);
                                                    }}
                                                    onMouseLeave={() => {
                                                        closeTimeout.current = setTimeout(() => {
                                                            handleMenuClose();
                                                        }, 300);
                                                    }}
                                                    style={{ display: 'inline-block' }}
                                                >
                                                    <button
                                                        type="button"
                                                        className={`menu-button${isActiveButton ? ' active' : ''}`}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            font: 'inherit',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 4,
                                                        }}
                                                    >
                                                        {title}
                                                        {isOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                                    </button>

                                                    <Menu
                                                        id={`submenu-${id}`}
                                                        anchorEl={anchorEl}
                                                        open={isOpen}
                                                        onClose={handleMenuClose}
                                                        disablePortal // ✅ Prevent jumping layout due to portal
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        PaperProps={{
                                                            onMouseEnter: () => {
                                                                if (closeTimeout.current) clearTimeout(closeTimeout.current);
                                                            },
                                                            onMouseLeave: () => {
                                                                closeTimeout.current = setTimeout(() => {
                                                                    handleMenuClose();
                                                                }, 300);
                                                            },
                                                            sx: {
                                                                mt: 2,
                                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                                border: '1px solid #eee',
                                                                background: '#fff',
                                                                borderRadius: 1,
                                                                maxHeight: 300,
                                                                overflowY: 'auto',
                                                            },
                                                        }}
                                                        MenuListProps={{ disablePadding: true }}
                                                    >
                                                        {subMenu.map((sub) => (
                                                            <MenuItem
                                                                key={sub.id}
                                                                disableRipple
                                                                onClick={handleMenuClose}
                                                                sx={{
                                                                    '&:hover': {
                                                                        backgroundColor: '#f5f5f5',
                                                                        transition: 'all 0.2s ease-in-out',
                                                                    },
                                                                }}
                                                            >
                                                                <NavLink
                                                                    to={sub.path}
                                                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit',
                                                                        width: '100%',
                                                                        display: 'block',
                                                                    }}
                                                                >
                                                                    {sub.title}
                                                                </NavLink>
                                                            </MenuItem>
                                                        ))}
                                                    </Menu>
                                                </div>
                                            ) : (
                                                <NavLink
                                                    to={path}
                                                    className={({ isActive }) => {
                                                        if (isActive) return 'active';
                                                        if (activePaths && activePaths.some((p) => location.pathname.startsWith(p)))
                                                            return 'active';
                                                        return '';
                                                    }}
                                                >
                                                    {title}
                                                </NavLink>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="right-element">
                                <div className="header__content">
                                    <div className="whatsapp-burger">
                                        <NavLink
                                            to={`https://wa.me/${properties.whatsapp.replace('+', '')}?text=${encodeURIComponent(properties.whatsappMessage)}`}
                                            className={({ isActive }) => (isActive ? 'active' : '')}
                                        >
                                            <img src="/assets/images/whatsapp.png" alt="WhatsApp Us" />
                                        </NavLink>
                                    </div>
                                    <div className="header__menu">
                                        <div id="google_translate_element"></div>
                                        <div
                                            className="header__menu-burger btn-menu"
                                            onClick={toggleMenu}
                                            data-burger-menu=""
                                        >
                                            <div className="header__menu-burger-container">
                                                <div className="header__menu-burger">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20">
                                                        <g>
                                                            <path
                                                                fill="currentColor"
                                                                d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1z"
                                                            />
                                                        </g>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="full-block mobile-nav open">
                    <div className="full-block overlay">
                        <div className="mobile-nav-inner">
                            <div className="menu-holder-inside">
                                <div className="inner-header-1">
                                    <a href="/" className="logo">
                                        <img width="710" height="96" src={LOGO} className="attachment-full size-full" alt="" />
                                    </a>

                                    <div className="mobile-buttons">
                                        <a href="#" className="btn-menu open" onClick={toggleMenu}>
                                            <span className="menu-icon">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </span>
                                        </a>
                                    </div>
                                </div>

                                <Navigation hidePopup={hidePopup} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
