import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
interface DeviceContextType {
    isMobile: boolean;
}
// Create the Device Context
const DeviceContext = createContext<DeviceContextType | undefined>(undefined);
interface DeviceProviderProps {
    children: ReactNode; // `children` prop is typed as ReactNode
}

// Device Provider Component
export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateDeviceType = () => {
            setIsMobile(window.innerWidth <= 768); // Set mobile breakpoint
        };

        // Initial check
        updateDeviceType();

        // Update on window resize
        window.addEventListener('resize', updateDeviceType);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', updateDeviceType);
    }, []);

    return (
        <DeviceContext.Provider value={{ isMobile }}>
            {children}
        </DeviceContext.Provider>
    );
};

// Custom Hook to Access Device Context
export const useDevice = () => useContext(DeviceContext);