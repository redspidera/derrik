import React, { useState } from 'react';

// Define the Filters type
interface Filters {
    location: string;
    minPrice: string;
    maxPrice: string;
    propertyType: string;
    bedrooms: string;
    bathrooms: string;
}

interface BayutSearchBarProps {
    onSearch: (filters: Filters) => void;
}

const BayutSearchBar: React.FC<BayutSearchBarProps> = ({ onSearch }) => {
    const [filters, setFilters] = useState<Filters>({
        location: '',
        minPrice: '',
        maxPrice: '',
        propertyType: '',
        bedrooms: '',
        bathrooms: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handleSearch = () => {
        onSearch(filters);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                name="location"
                placeholder="Location (e.g., Dubai, Abu Dhabi)"
                value={filters.location}
                onChange={handleChange}
                className="search-input"
            />

            <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={handleChange}
                className="search-input"
            />

            <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={handleChange}
                className="search-input"
            />

            <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleChange}
                className="search-select"
            >
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="penthouse">Penthouse</option>
            </select>

            <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleChange}
                className="search-select"
            >
                <option value="">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
            </select>

            <select
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleChange}
                className="search-select"
            >
                <option value="">Bathrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
            </select>

            <button onClick={handleSearch} className="search-button">
                Search
            </button>
        </div>
    );
};

export default BayutSearchBar;
