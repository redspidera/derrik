import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const RegulatorySection = ({ regulatoryInfo }) => {
    const { pNumbers, rera, ded, brn, qr } = regulatoryInfo;
    // Filter out empty values from regulatoryInfo
    return (_jsxs("div", { className: "qrcode", children: [_jsx("div", { className: "dld-qr1", children: qr && (_jsx("a", { target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { alt: "Dubai Land Department validation qr code", src: `${qr}`, style: { width: 120 } }) })) }), _jsxs("div", { className: "title1", children: [_jsxs("p", { children: ["This Listing has been verified by", _jsx("br", {}), _jsx("b", { children: "Dubai Land Department." })] }), _jsxs("ul", { className: "row", children: [rera && (_jsxs("li", { children: [_jsx("label", { className: "reg-info-label", children: "RERA" }), _jsx("span", { children: rera })] }, rera)), pNumbers && (_jsxs("li", { children: [_jsx("label", { className: "reg-info-label", children: "Permit Number" }), _jsx("span", { children: pNumbers })] }, pNumbers)), ded && (_jsxs("li", { children: [_jsx("label", { className: "reg-info-label", children: "DED" }), _jsx("span", { children: ded })] }, ded)), brn && (_jsxs("li", { children: [_jsx("label", { className: "reg-info-label", children: "werwer" }), _jsx("span", { children: brn })] }, brn))] })] })] }));
};
export default RegulatorySection;
