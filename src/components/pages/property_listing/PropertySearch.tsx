import React, { useState, useEffect } from 'react';

const PropertySearch = () => {
  const [sect, setSect] = useState('for-sale');
  const [category, setCategory] = useState('');
  const [minBeds, setMinBeds] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [tour3d, setTour3d] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [communities, setCommunities] = useState<string[]>([]); // Communities state
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <div className="property-search property-search-full">
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 form-group clearfix">
          <label htmlFor="sect">Property Type</label>
          <select
            id="sect"
            value={sect}
            onChange={(e) => setSect(e.target.value)}
          >
            <option value="for-sale">For Sale</option>
            <option value="for-rent">For Rent</option>
          </select>
        </div>

        <div className="col-sm-6 form-group clearfix">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="col-sm-6 form-group clearfix">
          <label htmlFor="minBeds">Min Beds</label>
          <input
            type="number"
            id="minBeds"
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value)}
          />
        </div>

        <div className="col-sm-6 form-group clearfix">
          <label htmlFor="maxBeds">Max Beds</label>
          <input
            type="number"
            id="maxBeds"
            value={maxBeds}
            onChange={(e) => setMaxBeds(e.target.value)}
          />
        </div>

        <div className="col-sm-6 form-group clearfix">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="col-sm-6 form-group clearfix">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="col-sm-6 form-group clearfix">
          <label htmlFor="tour3d">3D Tour</label>
          <input
            type="checkbox"
            id="tour3d"
            checked={tour3d}
            onChange={(e) => setTour3d(e.target.checked)}
          />
        </div>

        <div className="col-sm-6 form-group clearfix">
          <label htmlFor="keyword">Search by Keyword</label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by Community or Building"
          />
        </div>

        <div className="col-sm-6 form-group clearfix">
          <label>Community</label>
          <div className="dropdown">
            <button onClick={toggleFilter}>Select Community</button>
            {isFilterOpen && (
              <ul>
                {communities.length > 0 ? (
                  communities.map((community, index) => (
                    <li key={index} onClick={() => setKeyword(community)}>
                      {community}
                    </li>
                  ))
                ) : (
                  <li>No communities found</li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearch;
