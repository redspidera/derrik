import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
const PropertySearch = () => {
    const [sect, setSect] = useState('for-sale');
    const [category, setCategory] = useState('');
    const [minBeds, setMinBeds] = useState('');
    const [maxBeds, setMaxBeds] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [tour3d, setTour3d] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [communities, setCommunities] = useState([]); // Communities state
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    useEffect(() => {
        // Example API call to fetch communities data
        const fetchCommunities = async () => {
            // Replace with your API call
            const response = await fetch('/api/communities');
            const data = await response.json();
            setCommunities(data);
        };
        fetchCommunities();
    }, []); // Empty dependency array means this runs once when the component mounts
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            sect,
            category,
            minBeds,
            maxBeds,
            minPrice,
            maxPrice,
            tour3d,
            keyword,
        };
        console.log(formData);
    };
    const toggleFilter = () => {
        setIsFilterOpen(prevState => !prevState);
    };
    return (_jsx("div", { className: "property-search property-search-full", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "col-sm-6 form-group clearfix", children: [_jsx("label", { htmlFor: "sect", children: "Property Type" }), _jsxs("select", { id: "sect", value: sect, onChange: (e) => setSect(e.target.value), children: [_jsx("option", { value: "for-sale", children: "For Sale" }), _jsx("option", { value: "for-rent", children: "For Rent" })] })] }), _jsxs("div", { className: "col-sm-6 form-group clearfix", children: [_jsx("label", { htmlFor: "category", children: "Category" }), _jsxs("select", { id: "category", value: category, onChange: (e) => setCategory(e.target.value), children: [_jsx("option", { value: "apartment", children: "Apartment" }), _jsx("option", { value: "villa", children: "Villa" }), _jsx("option", { value: "land", children: "Land" })] })] }), _jsxs("div", { className: "col-sm-6 form-group clearfix", children: [_jsx("label", { htmlFor: "minBeds", children: "Min Beds" }), _jsx("input", { type: "number", id: "minBeds", value: minBeds, onChange: (e) => setMinBeds(e.target.value) })] }), _jsxs("div", { className: "col-sm-6 form-group clearfix", children: [_jsx("label", { htmlFor: "maxBeds", children: "Max Beds" }), _jsx("input", { type: "number", id: "maxBeds", value: maxBeds, onChange: (e) => setMaxBeds(e.target.value) })] }), _jsxs("div", { className: "col-sm-6 form-group clearfix", children: [_jsx("label", { htmlFor: "minPrice", children: "Min Price" }), _jsx("input", { type: "number", id: "minPrice", value: minPrice, onChange: (e) => setMinPrice(e.target.value) })] }), _jsxs("div", { className: "col-sm-6 form-group clearfix", children: [_jsx("label", { htmlFor: "maxPrice", children: "Max Price" }), _jsx("input", { type: "number", id: "maxPrice", value: maxPrice, onChange: (e) => setMaxPrice(e.target.value) })] }), _jsxs("div", { className: "col-sm-6 form-group clearfix", children: [_jsx("label", { htmlFor: "tour3d", children: "3D Tour" }), _jsx("input", { type: "checkbox", id: "tour3d", checked: tour3d, onChange: (e) => setTour3d(e.target.checked) })] }), _jsxs("div", { className: "col-sm-6 form-group clearfix", children: [_jsx("label", { htmlFor: "keyword", children: "Search by Keyword" }), _jsx("input", { type: "text", id: "keyword", value: keyword, onChange: (e) => setKeyword(e.target.value), placeholder: "Search by Community or Building" })] }), _jsxs("div", { className: "col-sm-6 form-group clearfix", children: [_jsx("label", { children: "Community" }), _jsxs("div", { className: "dropdown", children: [_jsx("button", { onClick: toggleFilter, children: "Select Community" }), isFilterOpen && (_jsx("ul", { children: communities.length > 0 ? (communities.map((community, index) => (_jsx("li", { onClick: () => setKeyword(community), children: community }, index)))) : (_jsx("li", { children: "No communities found" })) }))] })] }), _jsx("div", { className: "form-group", children: _jsx("button", { type: "submit", children: "Submit" }) })] }) }));
};
export default PropertySearch;
