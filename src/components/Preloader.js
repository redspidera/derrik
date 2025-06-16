import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Preloader = () => {
    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 1)', // Slight white overlay
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999999, // Ensure it stays on top
    };
    const spinnerStyle = {
        width: '50px',
        height: '50px',
        border: '6px solid #eb212e',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    };
    return (_jsxs("div", { style: containerStyle, children: [_jsx("div", { style: spinnerStyle }), _jsx("style", { children: `
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        ` })] }));
};
export default Preloader;
