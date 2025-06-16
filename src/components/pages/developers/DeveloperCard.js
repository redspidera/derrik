import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const DeveloperCard = ({ property }) => {
    const { image, Title, DetailUrl, ShortDescription } = property;
    const baseUrl = window.location.origin;
    return (_jsx(_Fragment, { children: _jsx("div", { className: "col-sm-4", children: _jsxs("div", { className: "the-inner", children: [_jsx("a", { href: `${baseUrl}${DetailUrl}`, className: "mor-a-list" }), _jsx("div", { className: "img-info", style: { backgroundImage: `url(${image})` } }), _jsx("div", { className: "cls-gp-icon", children: _jsx("img", { src: ShortDescription, alt: "" }) }), _jsx("h4", { children: Title })] }) }) }));
};
export default DeveloperCard;
