import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MapView = ({ latitude, longitude }) => {
    const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=AIzaSyAuq0074pFpCc_GKeTNEIpLTrNbQWTFRBQ`;
    return (_jsxs("div", { id: "mapview", children: [_jsx("h3", { children: "Map View" }), _jsx("div", { style: { width: '100%', height: '450px' }, className: "mob-change-view", children: _jsx("iframe", { width: "100%", height: "100%", frameBorder: "0", style: { border: '0' }, src: googleMapsEmbedUrl, allowFullScreen: true, "aria-hidden": "false", tabIndex: 0 }) })] }));
};
export default MapView;
