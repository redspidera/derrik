import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TestimonialCard = ({ property }) => {
    const { image, Title, ShortDescription, } = property;
    return (_jsx("div", { className: "col-sm-4 team-member admin", "data-category": "admin", children: _jsxs("div", { className: "card card-tertiary", "data-id": "459", children: [_jsxs("h5", { children: [_jsx("div", { className: "testi-imgs", children: _jsx("img", { src: image, alt: Title }) }), Title] }), _jsxs("span", { className: "ps-block__rating-items mb-6", style: { fontSize: '14px' }, children: [_jsx("i", { className: "fa fa-star" }), _jsx("i", { className: "fa fa-star" }), _jsx("i", { className: "fa fa-star" }), _jsx("i", { className: "fa fa-star" }), _jsx("i", { className: "fa fa-star" })] }), _jsx("div", { style: { minHeight: '50px' }, className: "pt-3 text-contetn-reveiew", dangerouslySetInnerHTML: { __html: ShortDescription } }), _jsx("div", { className: "d-flex" })] }) }));
};
export default TestimonialCard;
