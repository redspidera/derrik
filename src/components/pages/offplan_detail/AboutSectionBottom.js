import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const sanitizeHTML = (html) => {
    // Remove all style attributes using a regular expression
    return html.replace(/ style="[^"]*"/g, '');
};
const AboutSectionBottom = ({ c_img, c_description }) => {
    const sanitizedDescription = sanitizeHTML(c_description.trim());
    return (_jsx("div", { id: "section2n", className: "section-hm new-sect descrp2 mt50 pb50", children: _jsx("div", { className: "container", children: _jsx("div", { className: "row at-center1", children: _jsxs("div", { className: "col-sm-12 d-min-height cm-loc", children: [c_img && c_description && (_jsx("img", { src: `${c_img}`, id: "lc-image11", alt: "Advertisement" })), _jsx("div", { style: { marginTop: '10px' }, children: c_description && (_jsx("div", { dangerouslySetInnerHTML: { __html: sanitizedDescription.trim() } })) })] }) }) }) }));
};
export default AboutSectionBottom;
