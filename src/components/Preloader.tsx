import React from 'react';

const Preloader = () => {
    const containerStyle: React.CSSProperties = {
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

    const spinnerStyle: React.CSSProperties = {
        width: '50px',
        height: '50px',
      border: '6px solid #093083',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    };

    return (
        <div style={containerStyle}>
            <div style={spinnerStyle}></div>
            <style>
                {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
            </style>
        </div>
    );
};

export default Preloader;
