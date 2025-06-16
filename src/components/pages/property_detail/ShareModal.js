import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ShareComponent from "../offplan_detail/ShareComponent";
const ShareModal = ({ isOpen, onClose, property }) => {
    if (!isOpen)
        return null; // Do not render if modal is not open
    return (_jsx("div", { className: "modal show", tabIndex: -1, role: "dialog", id: "sharemodal", children: _jsx("div", { className: "modal-dialog", role: "document", children: _jsxs("div", { className: "modal-content", children: [_jsx("div", { className: "modal-header", children: _jsx("button", { type: "button", className: "close", "aria-label": "Close", onClick: onClose, children: _jsx("img", { src: "/img/close.png", alt: "", className: "" }) }) }), _jsx("div", { className: "modal-body", children: _jsxs("div", { className: "main_title_3", children: [_jsx("span", {}), _jsxs("h2", { children: ["Share this", _jsx("span", { className: "d-block", children: "listing" })] }), _jsx(ShareComponent, { url: property.detailUrlAbsolute, adTitle: property.adTitle }, `ShareComponent1-${property.ad_id}`)] }) })] }) }) }));
};
export default ShareModal;
