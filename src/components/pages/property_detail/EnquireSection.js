import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import ShareModal from "./ShareModal";
const EnquireSection = ({ property }) => {
    const [isCallOpen, setIsCallOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const toggleCallOpen = () => setIsCallOpen((prev) => !prev);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (_jsxs("div", { className: "", children: [_jsxs("ul", { className: "contact-btn", children: [_jsx("li", { children: _jsxs("button", { type: "button", className: "position-re flx1 call-now btnPrimaryGreen whitein", id: "call-now", onClick: toggleCallOpen, "aria-expanded": isCallOpen, children: [_jsxs("div", { id: "now-click", children: [_jsx("img", { src: "/img/phone.png", alt: "Phone Icon" }), " Call Now", " ", _jsx("i", { className: "bi bi-x-square-fill" })] }), isCallOpen && (_jsxs("div", { className: "call-click", children: [_jsx("div", { className: "call-us-title", children: "Call Us" }), _jsx("div", { children: _jsx("a", { href: `tel:+${property.agent_phone}`, children: property.agent_phone }) }), _jsxs("div", { className: "desc-ref", children: [_jsx("p", { children: "Please quote property reference" }), _jsx("div", { className: "ment--ref", children: property.SystemRefNo }), _jsx("p", { children: "when calling us" })] })] }))] }) }), _jsx("li", { children: _jsxs("button", { id: "PDPShareButton", type: "button", className: "iconMail phl btn btnSml btnDefault phmXxsVisible", onClick: openModal, "aria-label": "Share Property" // Accessibility
                            , children: [_jsx("img", { src: "/img/send.png", alt: "Share Icon" }), " Share"] }) })] }), _jsx(ShareModal, { isOpen: isModalOpen, onClose: closeModal, property: {
                    ad_id: property.ad_id.toString(), // Convert `ad_id` to string
                    detailUrlAbsolute: property.detailUrlAbsolute,
                    adTitle: property.adTitle,
                } })] }));
};
export default EnquireSection;
