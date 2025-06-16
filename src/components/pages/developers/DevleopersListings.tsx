import React, { useState, useEffect, useRef } from 'react';
import DeveloperCard, { BlogData } from './DeveloperCard'; 
import NoData from './NoData';
import { Helmet } from 'react-helmet';
import Skeleton from './Skeleton';
import BlogFilter from './BlogFilter';

// Types for API response and props
interface ApiResponse {
    data: {
        count: string;
        title: string;
        total_pages: number;
        current_page: number;
        banner_image: string;
        next_page: number | null;
        prev_page: number | null;
        records: BlogData[];
    };
}

interface BlogListProps {
    apiUrl: string;
}

interface FormData {
    keyword: string; 
} 

const DevleopersListings: React.FC<BlogListProps> = ({ apiUrl }) => {
     
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchedProperties, setFetchedProperties] = useState<BlogData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        keyword:   '',
         
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const previousPageRef = useRef<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [title, setTitle] = useState<string>('Blog : News & Trends');
    const [banner, setBanner] = useState<string>('/img/blog.jpg');
    const [propertyCount, setPropertyCount] = useState<number>(0);

    const formDataRef = useRef(formData);
    const previousFormDataRef = useRef<FormData>(formData);
    
    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setFormData({
            keyword: params.get('keyword') || '',
             
        });
        setCurrentPage(Number(params.get('page')) || 1);
    }, []);

    useEffect(() => {
        if (
            formData.keyword !== previousFormDataRef.current.keyword 
             
        ) {
            fetchProperties();
            previousFormDataRef.current = formData;
        }
    }, [formData, currentPage]);

    const fetchProperties = async () => {
      
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                keyword: formData.keyword,
               
                page: currentPage.toString(),
            });
            const url = `${apiUrl}?${params.toString()}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch properties');
            const data: ApiResponse = await response.json();

            setFetchedProperties(data.data.records || []);
            setTotalPages(data.data.total_pages);
            if (data.data.banner_image){
            setBanner(data.data.banner_image);
            }
            setTitle(data.data.title || 'Blog : News & Trends');
            setPropertyCount(Number(data.data.count) || 0);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setError('Failed to load properties. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
     
        const { name, value } = event.target;
        setFormData((prevData) => {
            const updatedFormData = {
                ...prevData,
                [name]: name === 'minPrice' || name === 'maxPrice' ? Number(value) : value,
            };
 
            const params = new URLSearchParams({
                keyword: updatedFormData.keyword,
                 
                page: '1', // Reset to page 1 when filters change
            });

            const basePath = window.location.pathname;
            const newUrl = `${basePath}?${params.toString()}`;

            window.history.pushState({}, '', newUrl);
            setCurrentPage(1);

            return updatedFormData;
        });
    };
    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const params = new URLSearchParams(window.location.search);
            params.set('page', page.toString());
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.pushState({}, '', newUrl);
            console.log(page+'currentPage' + currentPage)
             
            setCurrentPage(page);
        }
    };
 
   
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        fetchProperties();
    };
    useEffect(() => {
        if (currentPage !== previousPageRef.current) {
            
            previousPageRef.current = currentPage; // Update ref to track the current page
            fetchProperties(); // Trigger fetch if page has changed
        }
    }, [currentPage]);
    return (
        <div>
            <div className="section-dark page-banner list-banner-home for-listing-page more-height sect-blog" >
                <div
                    className="full-block page-banner-image"
                    style={{ backgroundImage: `url(${banner})` }}
                ></div>
                <div className="full-block overlay"></div>
                <div className="container h-100-per">
                    <div className="row disp-table h-100-per">
                        <div className="col-sm-12 h-100-per">
                            <div className="page-banner-content">
                                <div className="fancy-title-hold text-left clearfix">
                                    <h2 className="site-h2 mb-0">{title}</h2> 
                                </div>
                                <div className="property-search property-search-full">
                                    <BlogFilter
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                        handleSubmit={handleSubmit}
                                        setFormData={setFormData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error && <p>{error}</p>}
            <Helmet>
                <title>{title}</title> {/* Dynamically set the title */}
            </Helmet>
            <div id="blog" className="blog list-project pt25 mb25">
                <div className="container">
                    <div className="row">
                        <div className="col col-sm-12 p-my mb10">
                            <>
                                {fetchedProperties.length > 0 ? (
                                    <div className="fancy-title-hold text-left clearfix"> 
                                        <p className="text-right pr15">{propertyCount} records found</p>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </>
                        </div>
                    </div>
                    <div className="row article gy-4 posts-list grid">
                        {loading ? (
                           <>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </>
                            
                        ) : (
                            <>
                                <div className="inf-its row">
                                    {fetchedProperties.length > 0 ? (
                                        fetchedProperties.map((property, index) => (
                                            <DeveloperCard key={`${property.id}-${index}`} property={property} />
                                        ))
                                    ) : (
                                        <NoData />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <div className="clearfix"></div>
        </div>
    );
};

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const maxButtons = 5;
    let startPage = currentPage - Math.floor(maxButtons / 2);
    let endPage = currentPage + Math.floor(maxButtons / 2);

    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(maxButtons, totalPages);
    } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - maxButtons + 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <div className="custom-pagination">
            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
            )}

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {currentPage < totalPages && (
                <button onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
            )}
        </div>
    );
};

export default DevleopersListings;
