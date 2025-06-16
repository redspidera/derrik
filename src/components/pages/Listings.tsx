import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Define the Property Type
interface Property {
    title: string;
    image: string;
    company: string;
    url: string;
}

const Listings = ({ apiUrl }: { apiUrl:string }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalProperties, setTotalProperties] = useState<number>(0); // State for total properties
    const [searchKeyword, setSearchKeyword] = useState<string>(''); // State to store the search keyword
    const [bedrooms, setBedrooms] = useState<number | string>(''); // State for bedroom filter

    const navigate = useNavigate();
    const location = useLocation();

    // Fetch properties from the server with filters
    const fetchProperties = async (page: number, keyword: string = '', bedrooms: string = '') => {
        try {
            const response = await fetch(
                apiUrl +`?page=${page}&keyword=${encodeURIComponent(keyword)}&bedrooms=${encodeURIComponent(bedrooms)}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch properties');
            }

            const data = await response.json();
            setProperties(data.data.records); // Set the properties from the JSON data
            setTotalPages(data.data.total_pages); // Set the total number of pages
            setTotalProperties(parseInt(data.data.count, 10)); // Set total properties from the count
        } catch (err: any) {
            setError('Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    };

    // Handle page change
    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setLoading(true); // Set loading to true before fetching new data
            setCurrentPage(pageNumber);
        }
    };

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    // Trigger search on button click
    const handleSearchClick = () => {
        navigate(`?keyword=${encodeURIComponent(searchKeyword)}&bedrooms=${bedrooms}&page=1`); // Update URL with keyword and bedrooms filter
    };

    // Handle bedroom filter change
    const handleBedroomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

    return (
        <div>
            <h1>Property Listings</h1>

            {/* Display Total Properties */}
            <div className="total-properties">
                <p>Total Properties Found: {totalProperties}</p>
            </div>

            {/* Search and Bedroom Filter */}
            <div className="filter-container">
                <input
                    type="text"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    placeholder="Search by title"
                    className="search-input"
                />
             

                {/* Bedroom Filter */}
                <div className="bedroom-filter">
                    <label htmlFor="bedrooms">Bedrooms:</label>
                    <select
                        id="bedrooms"
                        value={bedrooms}
                        onChange={handleBedroomChange}
                        className="bedroom-select"
                    >
                        <option value="">All</option>
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                        <option value="4">4 Bedrooms</option>
                        <option value="5">5+ Bedrooms</option>
                    </select>
                </div>
                <button onClick={handleSearchClick} className="search-button">
                    Search
                </button>
            </div>

            {loading ? (
                <p>Loading...</p> // Show a loading message while data is being fetched
            ) : error ? (
                <p>{error}</p> // Show an error message if fetching fails
            ) : (
                <div className="property-list">
                    {properties.length === 0 ? (
                        <p>No properties found</p>
                    ) : (
                        properties.map((property, index) => (
                            <div key={index} className="property-item">
                                <img src={property.image} alt={property.title} />
                                <h2>{property.title}</h2>
                                <p>{property.company}</p>
                                <a
                                    href={property.url}
                                    rel="noopener noreferrer"
                                    className="view-more-link"
                                >
                                    View More
                                </a>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Listings;