import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const ProjectDescription = ({ adTitle, developerName, locationLatitude, locationLongitude, communityTitle, shortDescription, adDescription, dRight, }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
    return (_jsx("div", { id: "section2", className: "section-hm bg-has new-sect project-sect-descript descrp2", style: { paddingBottom: "60px" }, children: _jsx("div", { className: "container", children: _jsxs("div", { className: " at-center1", children: [_jsxs("div", { className: "col-sm-7 d-min-height pr15", children: [_jsxs("div", { className: "project-title", children: [_jsx("ul", { className: "about-g-t more2", children: _jsx("li", { children: adTitle }) }), _jsxs("li", { className: "loct-detail", children: ["by ", developerName, " |", " ", _jsxs("a", { href: `https://www.google.com/maps/?q=${locationLatitude},${locationLongitude}`, target: "_blank", rel: "noopener noreferrer", children: [_jsx("svg", { viewBox: "0 0 15 15", className: "button_icon-style3", children: _jsx("use", { xlinkHref: "#loc_svg" }) }), " ", communityTitle] }), " "] })] }), _jsxs("div", { className: "description text", children: [_jsx("div", { className: "less-descript", children: shortDescription.replace("#ffffff", "") }), isExpanded && (_jsx("div", { className: "more-descript", children: adDescription.replace("#ffffff", "") }))] }), _jsx("button", { className: "read-more-btn", onClick: toggleDescription, children: isExpanded ? "Read Less" : "Read More" })] }), _jsx("div", { className: "col-sm-5", children: _jsx("div", { className: "pl-3-desc", children: dRight && _jsx("img", { src: `${dRight}`, alt: "Ad", id: "lc-image" }) }) })] }) }) }));
};
export default ProjectDescription;
