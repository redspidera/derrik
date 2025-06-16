import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Amenities = ({ amenities }) => {
    if (amenities.length === 0) {
        return null; // Do not render anything if there are no amenities
    }
    return (_jsxs("div", { className: "section scrolable  pt-0 mt50", id: "amenities", children: [_jsx("div", { className: "featured-title-hold text-center clearfix mb20", children: _jsx("h3", { className: "site-h1 animate mt-3 mb-3", children: _jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Project Amenities" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }) }) }), _jsx("ul", { className: "avalia-units amenities-li amenity-list mt30", children: _jsx("li", { className: "row", children: amenities.map((amenity, index) => (_jsx("div", { className: "col-sm-3", children: _jsx("div", { className: "amenity1", children: _jsxs("p", { className: "am-conta", children: [_jsx("i", { className: `fa amenity-none ${amenity.iconList}` }), " ", _jsx("span", { className: "am-dtsil", children: amenity.amenitiesName })] }) }) }, index))) }) })] }));
};
export default Amenities;
