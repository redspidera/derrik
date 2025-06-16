import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DownloadRequestForm from "./DownloadRequestForm";
const DownloadModal = ({ adId, modalTitle, modalFieldId, isVisible, onClose }) => {
    return (_jsx("div", { className: `modal fade ${isVisible ? 'in' : ''}`, id: "downloadModal", tabIndex: -1, role: "dialog", "aria-labelledby": "downloadModalLabel", "aria-hidden": !isVisible, style: { display: isVisible ? 'block' : 'none' }, children: _jsx("div", { className: "modal-dialog", role: "document", children: _jsxs("div", { className: "modal-content", children: [_jsxs("div", { className: "modal-header", children: [_jsx("h5", { className: "modal-title", id: "downloadModalLabel", children: modalTitle }), _jsx("button", { type: "button", className: "close", onClick: onClose, "aria-label": "Close", children: _jsx("img", { src: "/img/close.png", alt: "" }) })] }), _jsx("div", { className: "modal-body", children: _jsx(DownloadRequestForm, { ad_id_number: adId, f_type: modalFieldId.toString(), heading: modalTitle }) })] }) }) }));
};
export default DownloadModal;
