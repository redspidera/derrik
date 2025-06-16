import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, WhatsappIcon, LinkedinIcon } from 'react-share';
const ShareComponent = ({ url, adTitle }) => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        })
            .catch((error) => {
            console.error('Failed to copy text: ', error);
        });
    };
    return (_jsx("div", { id: "section7", className: "section-hm new-sect descrp2 share-me pt50", style: { marginTop: '5px' }, children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row at-center", children: _jsx("div", { className: "col-sm-12 d-min-height", children: _jsx("div", { className: "project-title", children: _jsxs("ul", { className: "about-g-t more2", children: [_jsx("li", { children: "Get another opinion," }), _jsxs("li", { children: ["Share ", adTitle, " "] })] }) }) }) }), _jsx("div", { className: "share-info", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-sm-6", children: _jsx("div", { className: "copylink", children: _jsx("div", { className: "col-sm-12weft", children: _jsxs("div", { className: "input-group mb-3", children: [_jsx("input", { type: "text", className: "form-control", readOnly: true, id: "cpy_text", value: url }), _jsx("div", { className: "input-group-append", children: _jsx("span", { className: `input-group-text ${copied ? 'copied' : ''}`, id: "basic-addon2", onClick: copyToClipboard, children: copied ? 'Link Copied!' : 'Copy Link' }) })] }) }) }) }), _jsx("div", { className: "col-sm-6", children: _jsxs("div", { className: "social-share-buttons", children: [_jsx(FacebookShareButton, { url: url, children: _jsx(FacebookIcon, { size: 48, round: true }) }), _jsx(TwitterShareButton, { url: url, title: adTitle, children: _jsx(TwitterIcon, { size: 48, round: true }) }), _jsx(WhatsappShareButton, { url: url, title: adTitle, children: _jsx(WhatsappIcon, { size: 48, round: true }) }), _jsx(LinkedinShareButton, { url: url, title: adTitle, children: _jsx(LinkedinIcon, { size: 48, round: true }) })] }) })] }) })] }) }));
};
export default ShareComponent;
