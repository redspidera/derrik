import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FeaturesList = ({ features }) => {
    return (_jsxs("div", { className: "list list-check", children: [_jsx("h3", { children: "Features" }), _jsx("div", { className: "course-details", children: features.map((feature, index) => (_jsxs("p", { className: "course-detail", children: [_jsx("span", { className: "ime", "data-original-title": "", title: "", children: _jsx("i", { className: "fa fa-book", "data-original-title": "", title: "" }) }), _jsxs("span", { className: "rit-side feature-label", "data-original-title": "", title: "", children: [feature.name, ":", _jsx("span", { className: "feature-text", "data-original-title": "", title: "", children: _jsx("strong", { children: feature.value }) })] })] }, index))) })] }));
};
export default FeaturesList;
