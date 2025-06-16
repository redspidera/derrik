// Constants.tsx
// Dynamically load all environment variables from `import.meta.env`
const ENV = import.meta.env;
// Explicitly typing the constants for your project
export const WEBROOT_MAIN = ENV.VITE_PUBLIC_URL || '';
export const WEBROOT = `${WEBROOT_MAIN}/src`;
export const PROJECT_NAME = ENV.VITE_PROJECT_NAME || 'Rs Dubai REAL ESTATE L.L.C.';
export const HOME_VIDEO = ENV.VITE_HOME_VIDEO || 'http://localhost:5173/public/FHD.mov';
export const SITE_URL = ENV.VITE_SITE_URL || 'https://www.kayeandco.ae/';
export const API_BASE_URL = ENV.VITE_API_BASE_URL || 'https://api.example.com';
export const LOGO = ENV.VITE_LOGO || '/img/logo-red.png';
export const LOGO_WHITE = ENV.VITE_LOGO_WHITE || '/img/logo-white.png';
export const CONTACT_EMAIL = ENV.VITE_CONTACT_EMAIL || 'info@rsworkspace.net';
export const CONTACT_PHONE = ENV.VITE_CONTACT_PHONE || '+971 5 551 5475';
export const CONTACT_ADDRESS = ENV.VITE_CONTACT_ADDRESS || `2410, Burlington Tower, Business Bay, Dubai, UAE
                            Monday-Saturday 9.00 am–6.00 pm`;
export const API_URL = ENV.VITE_API_URL || 'https://backend.realestate.rsworkspace.net/api/index.php/site/';
export const APP_NAME = ENV.VITE_APP_NAME || 'EstateAgency';
export const SUPPORT_EMAIL = ENV.VITE_SUPPORT_EMAIL || 'support@example.com';
export const THEME_COLOR = ENV.VITE_THEME_COLOR || '#3498db';
