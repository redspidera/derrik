import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const Listings = ({ apiUrl }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProperties, setTotalProperties] = useState(0); // State for total properties
    const [searchKeyword, setSearchKeyword] = useState(''); // State to store the search keyword
    const [bedrooms, setBedrooms] = useState(''); // State for bedroom filter
    const navigate = useNavigate();
    const location = useLocation();
    // Fetch properties from the server with filters
    const fetchProperties = async (page, keyword = '', bedrooms = '') => {
        try {
            const response = await fetch(apiUrl + `?page=${page}&keyword=${encodeURIComponent(keyword)}&bedrooms=${encodeURIComponent(bedrooms)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch properties');
            }
            const data = await response.json();
            setProperties(data.data.records); // Set the properties from the JSON data
            setTotalPages(data.data.total_pages); // Set the total number of pages
            setTotalProperties(parseInt(data.data.count, 10)); // Set total properties from the count
        }
        catch (err) {
            setError('Failed to fetch properties');
        }
        finally {
            setLoading(false);
        }
    };
    // Handle page change
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setLoading(true); // Set loading to true before fetching new data
            setCurrentPage(pageNumber);
        }
    };
    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };
    // Trigger search on button click
    const handleSearchClick = () => {
        navigate(`?keyword=${encodeURIComponent(searchKeyword)}&bedrooms=${bedrooms}&page=1`); // Update URL with keyword and bedrooms filter
    };
    // Handle bedroom filter change
    const handleBedroomChange = (e) => {
        setBedrooms(e.target.value);
    };
    // UseEffect to fetch properties based on query params
    useEffect(() => {
        setLoading(true); // Set loading before fetching data
        const queryParams = new URLSearchParams(location.search);
        const keyword = queryParams.get('keyword') || ''; // Get keyword from URL
        const page = parseInt(queryParams.get('page') || '1', 10); // Get current page from URL
        const bedrooms = queryParams.get('bedrooms') || ''; // Get bedrooms from URL
        setCurrentPage(page); // Set page from URL
        setSearchKeyword(keyword); // Set search keyword from URL
        setBedrooms(bedrooms); // Set bedroom filter from URL
        fetchProperties(page, keyword, bedrooms); // Fetch properties based on the URL query params
    }, [location.search]); // Rerun when URL query params change
    return (_jsxs("div", { children: [_jsx("h1", { children: "Property Listings" }), _jsx("div", { className: "total-properties", children: _jsxs("p", { children: ["Total Properties Found: ", totalProperties] }) }), _jsxs("div", { className: "filter-container", children: [_jsx("input", { type: "text", value: searchKeyword, onChange: handleSearchChange, placeholder: "Search by title", className: "search-input" }), _jsxs("div", { className: "bedroom-filter", children: [_jsx("label", { htmlFor: "bedrooms", children: "Bedrooms:" }), _jsxs("select", { id: "bedrooms", value: bedrooms, onChange: handleBedroomChange, className: "bedroom-select", children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "1", children: "1 Bedroom" }), _jsx("option", { value: "2", children: "2 Bedrooms" }), _jsx("option", { value: "3", children: "3 Bedrooms" }), _jsx("option", { value: "4", children: "4 Bedrooms" }), _jsx("option", { value: "5", children: "5+ Bedrooms" })] })] }), _jsx("button", { onClick: handleSearchClick, className: "search-button", children: "Search" })] }), loading ? (_jsx("p", { children: "Loading..." }) // Show a loading message while data is being fetched
            ) : error ? (_jsx("p", { children: error }) // Show an error message if fetching fails
            ) : (_jsx("div", { className: "property-list", children: properties.length === 0 ? (_jsx("p", { children: "No properties found" })) : (properties.map((property, index) => (_jsxs("div", { className: "property-item", children: [_jsx("img", { src: property.image, alt: property.title }), _jsx("h2", { children: property.title }), _jsx("p", { children: property.company }), _jsx("a", { href: property.url, rel: "noopener noreferrer", className: "view-more-link", children: "View More" })] }, index)))) })), _jsxs("div", { className: "pagination", children: [_jsx("button", { onClick: () => paginate(currentPage - 1), disabled: currentPage === 1, children: "Previous" }), _jsxs("span", { children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { onClick: () => paginate(currentPage + 1), disabled: currentPage === totalPages, children: "Next" })] })] }));
};
export default Listings;
