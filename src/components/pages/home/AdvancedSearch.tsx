import { useState } from 'react';
import Select from 'react-select';
import { Range, getTrackBackground } from 'react-range';
import axios from 'axios';

// Type for options used in the Select dropdowns
interface Option {
    value: string;
    label: string;
}

// Type for the property search results
interface PropertyResult {
    id: number;
    title: string;
    location: string;
    price: number;
    imageUrl: string; // If you have images for each property
}

const locationOptions: Option[] = [
    { value: 'new-york', label: 'New York' },
    { value: 'los-angeles', label: 'Los Angeles' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'houston', label: 'Houston' },
    { value: 'miami', label: 'Miami' },
];

const propertyTypeOptions: Option[] = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'villa', label: 'Villa' },
];

const AdvancedSearch = () => {
    // State for filters
    const [location, setLocation] = useState<Option | null>(null);
    const [propertyType, setPropertyType] = useState<Option | null>(null);
    const [bedrooms, setBedrooms] = useState<number>(1);
    const [bathrooms, setBathrooms] = useState<number>(1);
    const [priceRange, setPriceRange] = useState<number[]>([50000, 500000]); // Min, Max price range
    const [loading, setLoading] = useState<boolean>(false);
    const [results, setResults] = useState<PropertyResult[]>([]);

    // Function to handle search click
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.post<PropertyResult[]>('/api/search', {
                location: location?.value,
                propertyType: propertyType?.value,
                bedrooms,
                bathrooms,
                priceRange,
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="advanced-search">
            <h2>Advanced Search</h2>

            <div className="search-filters">

                {/* Location Filter */}
                <div className="filter-group">
                    <label>Location</label>
                    <Select
                        options={locationOptions}
                        value={location}
                        onChange={(selectedOption) => setLocation(selectedOption)}
                        placeholder="Select Location"
                    />
                </div>

                {/* Property Type Filter */}
                <div className="filter-group">
                    <label>Property Type</label>
                    <Select
                        options={propertyTypeOptions}
                        value={propertyType}
                        onChange={(selectedOption) => setPropertyType(selectedOption)}
                        placeholder="Select Property Type"
                    />
                </div>

                {/* Bedrooms Filter */}
                <div className="filter-group">
                    <label>Bedrooms</label>
                    <input
                        type="number"
                        min="1"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Math.max(1, Number(e.target.value)))} // Prevent less than 1
                    />
                </div>

                {/* Bathrooms Filter */}
                <div className="filter-group">
                    <label>Bathrooms</label>
                    <input
                        type="number"
                        min="1"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Math.max(1, Number(e.target.value)))} // Prevent less than 1
                    />
                </div>

                {/* Price Range Filter */}
                <div className="filter-group">
                    <label>Price Range</label>
                    <Range
                        step={1000}
                        min={50000}
                        max={1000000}
                        values={priceRange}
                        onChange={(values) => setPriceRange(values)}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    height: '6px',
                                    width: '100%',
                                    background: getTrackBackground({
                                        values: priceRange,
                                        colors: ['#548BF4', '#ccc'],
                                        min: 50000,
                                        max: 1000000,
                                    }),
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    height: '20px',
                                    width: '20px',
                                    backgroundColor: '#548BF4',
                                    borderRadius: '50%',
                                }}
                            />
                        )}
                    />
                    <div className="price-values">
                        <span>${priceRange[0].toLocaleString()}</span> -
                        <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                </div>

            </div>

            <button
                className="search-button"
                onClick={handleSearch}
                disabled={loading}
            >
                {loading ? 'Searching...' : 'Search'}
            </button>

            {/* Search Results */}
            {results.length > 0 && (
                <div className="search-results">
                    <h3>Search Results</h3>
                    <ul>
                        {results.map((result) => (
                            <li key={result.id}>
                                <h4>{result.title}</h4>
                                <p>Location: {result.location}</p>
                                <p>Price: ${result.price.toLocaleString()}</p>
                                {result.imageUrl && (
                                    <img
                                        src={result.imageUrl}
                                        alt={result.title}
                                        style={{ width: '150px', height: 'auto' }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {results.length === 0 && !loading && (
                <p>No results found for the selected filters.</p>
            )}
        </div>
    );
};

export default AdvancedSearch;
