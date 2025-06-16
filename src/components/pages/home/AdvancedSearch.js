import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Select from 'react-select';
import { Range, getTrackBackground } from 'react-range';
import axios from 'axios';
const locationOptions = [
    { value: 'new-york', label: 'New York' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'houston', label: 'Houston' },
    { value: 'miami', label: 'Miami' },
];
const propertyTypeOptions = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'villa', label: 'Villa' },
];
const AdvancedSearch = () => {
    // State for filters
    const [location, setLocation] = useState(null);
    const [propertyType, setPropertyType] = useState(null);
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [priceRange, setPriceRange] = useState([50000, 500000]); // Min, Max price range
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    // Function to handle search click
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/search', {
                location: location?.value,
                propertyType: propertyType?.value,
                bedrooms,
                bathrooms,
                priceRange,
            });
            setResults(response.data);
        }
        catch (error) {
            console.error('Error fetching properties:', error);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "advanced-search", children: [_jsx("h2", { children: "Advanced Search" }), _jsxs("div", { className: "search-filters", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Location" }), _jsx(Select, { options: locationOptions, value: location, onChange: (selectedOption) => setLocation(selectedOption), placeholder: "Select Location" })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Property Type" }), _jsx(Select, { options: propertyTypeOptions, value: propertyType, onChange: (selectedOption) => setPropertyType(selectedOption), placeholder: "Select Property Type" })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Bedrooms" }), _jsx("input", { type: "number", min: "1", value: bedrooms, onChange: (e) => setBedrooms(Math.max(1, Number(e.target.value))) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Bathrooms" }), _jsx("input", { type: "number", min: "1", value: bathrooms, onChange: (e) => setBathrooms(Math.max(1, Number(e.target.value))) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Price Range" }), _jsx(Range, { step: 1000, min: 50000, max: 1000000, values: priceRange, onChange: (values) => setPriceRange(values), renderTrack: ({ props, children }) => (_jsx("div", { ...props, style: {
                                        height: '6px',
                                        width: '100%',
                                        background: getTrackBackground({
                                            values: priceRange,
                                            colors: ['#548BF4', '#ccc'],
                                            min: 50000,
                                            max: 1000000,
                                        }),
                                    }, children: children })), renderThumb: ({ props }) => (_jsx("div", { ...props, style: {
                                        height: '20px',
                                        width: '20px',
                                        backgroundColor: '#548BF4',
                                        borderRadius: '50%',
                                    } })) }), _jsxs("div", { className: "price-values", children: [_jsxs("span", { children: ["$", priceRange[0].toLocaleString()] }), " -", _jsxs("span", { children: ["$", priceRange[1].toLocaleString()] })] })] })] }), _jsx("button", { className: "search-button", onClick: handleSearch, disabled: loading, children: loading ? 'Searching...' : 'Search' }), results.length > 0 && (_jsxs("div", { className: "search-results", children: [_jsx("h3", { children: "Search Results" }), _jsx("ul", { children: results.map((result) => (_jsxs("li", { children: [_jsx("h4", { children: result.title }), _jsxs("p", { children: ["Location: ", result.location] }), _jsxs("p", { children: ["Price: $", result.price.toLocaleString()] }), result.imageUrl && (_jsx("img", { src: result.imageUrl, alt: result.title, style: { width: '150px', height: 'auto' } }))] }, result.id))) })] })), results.length === 0 && !loading && (_jsx("p", { children: "No results found for the selected filters." }))] }));
};
export default AdvancedSearch;
