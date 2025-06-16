/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PUBLIC_URL: string;
    readonly VITE_PROJECT_NAME: string;
    readonly VITE_HOME_VIDEO: string;
    readonly VITE_SITE_URL: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_LOGO: string;
    readonly VITE_LOGO_WHITE: string;
    readonly VITE_CONTACT_EMAIL: string;
    readonly VITE_CONTACT_PHONE: string;
    readonly VITE_CONTACT_ADDRESS: string;
    readonly VITE_API_URL: string;
    readonly VITE_APP_NAME: string;
    readonly VITE_SUPPORT_EMAIL: string;
    readonly VITE_THEME_COLOR: string;
    // Add more as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
