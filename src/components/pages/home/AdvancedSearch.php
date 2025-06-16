import React, { useState } from 'react';
import Select from 'react-select';
import { Range, getTrackBackground } from 'react-range';
import axios from 'axios';

interface Option {
  value: string;
  label: string;
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
  const [priceRange, setPriceRange] = useState<number[]>([50000, 500000]); // Min, Max
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
        priceRange
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
            onChange={(e) => setBedrooms(Number(e.target.value))}
          />
        </div>

        {/* Bathrooms Filter */}
        <div className="filter-group">
          <label>Bathrooms</label>
          <input
            type="number"
            min="1"
            value={bathrooms}
            onChange={(e) => setBathrooms(Number(e.target.value))}
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

      <button className="search-button" onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <h4>{result.title}</h4>
                <p>{result.location}</p>
                <p>${result.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
