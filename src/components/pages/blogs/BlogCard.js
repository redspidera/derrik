import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
const BlogCard = ({ property }) => {
    const { image, Title, DetailUrl, ShortDescription, } = property;
    const baseUrl = window.location.origin;
    return (_jsx("div", { className: "col-md-4 blg", children: _jsxs("article", { className: "blog", children: [image && (_jsx("figure", { children: _jsxs(NavLink, { to: baseUrl + DetailUrl, children: [_jsx("img", { src: image, alt: "" }), _jsx("div", { className: "preview", children: _jsx("span", { children: "Read More" }) })] }) })), _jsxs("div", { className: "post_info", children: [_jsx("h1", { children: _jsx(NavLink, { to: baseUrl + DetailUrl, children: Title }) }), _jsx("p", { children: ShortDescription })] })] }) }));
};
export default BlogCard;
