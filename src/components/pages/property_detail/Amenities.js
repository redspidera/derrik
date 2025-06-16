import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Amenities = ({ amenities }) => {
    return (_jsxs("div", { className: "list list-check", children: [_jsx("h3", { children: "Amenities" }), _jsx("div", { className: "course-details", children: amenities.map((amenity, index) => (_jsxs("p", { className: "course-detail amenities-list", children: [_jsx("span", { className: "ime", "data-original-title": "", title: "", children: _jsx("i", { className: "fa fa-book", "data-original-title": "", title: "" }) }), _jsxs("span", { className: "rit-side feature-label", "data-original-title": "", title: "", children: [amenity.name, ":"] })] }, index))) })] }));
};
export default Amenities;
