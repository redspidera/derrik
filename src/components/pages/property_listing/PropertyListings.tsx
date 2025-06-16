import   { useState, useEffect, useRef, useMemo } from 'react';
import PropertyCard2, { PropertyData } from './PropertyCard2.tsx';
import NoPropertyListings from './NoPropertyListings.tsx';
/*import PropertyFilter from './PropertyFilter';*/
import PropertyForm from '../home/PropertyForm.tsx';
import { Helmet } from 'react-helmet'; 
import FullPageLoader from '@/components/utility/FullPageLoader';
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography } from '@mui/material';
// Types for API response and props
interface ApiResponse {
    data: {
        count: string;
        title: string;
        total_pages: number;
        current_page: number;
        next_page: number | null;
        prev_page: number | null;
        records: PropertyData[];
    };
}

interface PropertyListProps {
    apiUrl: string;
}

interface PropertyListFormData {
    sectorType: string;
    listingType: string;
    propertyType: string;
    community: string;
    developer: string;
    furnishing: string;
    year: string;
    minPrice: number;
    maxPrice: number;
    areaMin: number;
    areaMax: number;
    amenities: string;
    tourTypes: string;
    keywords: string;
    bedrooms: string;
    bathrooms: string;
    occupant_status: string;
}

const PropertyList: React.FC<PropertyListProps> = ({ apiUrl }) => {
    const location = useLocation();
    const path = window.location.pathname;
    const [loading, setLoading] = useState<boolean>(false);
    const [sectorType, setSectorType] = useState<string>('');
    const [fetchedProperties, setFetchedProperties] = useState<PropertyData[]>([]);
    const [error, setError] = useState<string | null>(null);
    // const params = new URLSearchParams(window.location.search);
    const segments = useMemo(() => {
        const paths = location.pathname.split("/").filter(Boolean); // remove empty
        const params: Record<string, string> = {};

        paths.forEach((segment) => {
        const [key, ...valueParts] = segment.split("-");
        if (key && valueParts.length > 0) {
            params[key] = valueParts.join("-");
        }
        });

        return params;
    }, [location.pathname]);
    const [formData, setFormData] = useState<PropertyListFormData>({
        sectorType: path.startsWith('/for-rent') ? 'rent' : 'sale',
        propertyType: segments.propertyType || '',
        listingType: segments.listingType || '',  
        community: segments.community || '', 
        developer: segments.developer || '', 
        keywords: segments.keywords || '', 
        year: segments.year || '', 
        furnishing: segments.furnishing || '', 
        minPrice: Number(segments.minPrice) || 0,  
        maxPrice: Number(segments.maxPrice) || 0,  
        areaMin: Number(segments.areaMin) || 0,  
        areaMax: Number(segments.areaMax) || 0,  
        amenities: segments.amenities  || '',
        tourTypes: segments.tourTypes  || '',
        bedrooms: segments.beds || '',  
        bathrooms: segments.baths || '', 
        occupant_status: segments.status || '',  
        
    });
    //console.log(sectorType)
    const previousPageRef1 = useRef<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    const [totalPages, setTotalPages] = useState<number>(1);
    const [title, setTitle] = useState<string>('Properties'); // Default title
    const [propertyCount, setPropertyCount] = useState<number>(0); // Track property count
    const formDataRef = useRef(formData);
    const previousFormDataRef = useRef<PropertyListFormData>(formData);
    
    useEffect(() => {
        
        if (path.startsWith('/for-sale')) {
            setSectorType('for-sale');
        } else if (path.startsWith('/for-rent')) {
            setSectorType('for-rent');
        }
    }, []);
 useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);

    useEffect(() => {
        console.log(formData);
            if (  
                formData.sectorType !== previousFormDataRef.current.sectorType ||
                formData.propertyType !== previousFormDataRef.current.propertyType ||
                formData.listingType !== previousFormDataRef.current.listingType ||
                formData.minPrice !== previousFormDataRef.current.minPrice  ||
                formData.maxPrice !== previousFormDataRef.current.maxPrice  || 
                formData.amenities !== previousFormDataRef.current.amenities  ||
                formData.tourTypes !== previousFormDataRef.current.tourTypes  ||
                formData.keywords !== previousFormDataRef.current.keywords  ||
                formData.areaMin !== previousFormDataRef.current.areaMin  ||
                formData.furnishing !== previousFormDataRef.current.furnishing  ||
                formData.areaMax !== previousFormDataRef.current.areaMax  ||
                formData.community !== previousFormDataRef.current.community  ||
                formData.developer !== previousFormDataRef.current.developer  ||
                formData.year !== previousFormDataRef.current.year  ||
                formData.bedrooms !== previousFormDataRef.current.bedrooms ||
                formData.bathrooms !== previousFormDataRef.current.bathrooms ||
                formData.occupant_status !== previousFormDataRef.current.occupant_status 
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
                sectorType: formData.sectorType,
                propertyType: formData.propertyType,
                listingType: formData.listingType,
                community: formData.community,
                minPrice: formData.minPrice.toString(),
                maxPrice: formData.maxPrice.toString(),                
                amenities: formData.amenities.toString(),
                tourTypes: formData.tourTypes.toString(),
                keywords: formData.keywords.toString(),
                areaMin: formData.areaMin.toString(),
                areaMax: formData.areaMax.toString(),                
                furnishing: formData.furnishing.toString(),                
                bedrooms: formData.bedrooms,
                bathrooms: formData.bathrooms,
                developer: formData.developer,
                year: formData.year,
                occupant_status: formData.occupant_status,
                page: currentPage.toString(),
            });
        
            const url = `${apiUrl}?${params.toString()}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch properties');
            const data: ApiResponse = await response.json();

            setFetchedProperties(data.data.records || []);
            setTotalPages(data.data.total_pages);
            setTitle(data.data.title || 'Properties');
            setPropertyCount(Number(data.data.count) || 0); 
        } catch (error) {
            console.error('Error fetching properties:', error);
            setError('Failed to load properties. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    /*
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        
        const { name, value } = event.target;
        setFormData((prevData) => {
            const updatedFormData = {
                ...prevData,
                [name]: name === 'minPrice' || name === 'maxPrice' ? Number(value) : value,
            };
            console.log(updatedFormData.listingType)
            const params = new URLSearchParams({
                listingType: updatedFormData.listingType,
                propertyType: updatedFormData.propertyType,
                minPrice: updatedFormData.minPrice.toString(),
                maxPrice: updatedFormData.maxPrice.toString(),
                bedrooms: updatedFormData.bedrooms,
                page: '1', // Reset to page 1 when filters change
            });

            const basePath = (updatedFormData.sectorType ==  'for-sale') ? '/for-sale' : '/for-rent';
            const newUrl = `${basePath}?${params.toString()}`;

            window.history.pushState({}, '', newUrl);
           
            setCurrentPage((currentPage == 0) ? 1 : 0);
            return updatedFormData;
        });
    };
    */

    const handlePageChange = (page: number) => {
        
        if (page !== currentPage) {

            window.scrollTo({ top: 0, behavior: 'smooth' });
            const params = new URLSearchParams(window.location.search);
            params.set('page', page.toString());
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.pushState({}, '', newUrl);
            console.log(page + 'currentPage' + currentPage)

            setCurrentPage(page);
        }
    };
    /*
    const handleButtonclick = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(formData);
        event.preventDefault();
        //fetchProperties();
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchProperties();
    };
    */
   
    useEffect(() => {
            if (currentPage !== previousPageRef1.current) {
                previousPageRef1.current = currentPage; // Update ref to track the current page
                fetchProperties(); // Trigger fetch if page has changed
            }
        }, [currentPage]);


    return (
         <div>
            <div className="section-dark page-banner list-banner-home for-listing-page only-property not-mob" id={sectorType} >
                <div className="full-block page-banner-image"></div>
                <div className="full-block overlay"></div>
                <div className="container">
                    <div className="row disp-table">
                        <div className="col-sm-12">
                            <div className="page-banner-content">
                                <div className="property-search property-search-full">
                                    {/*
                                    <PropertyFilter
                                        formData={formData}
                                        handleInputChange={handleInputChange}
                                        handleSubmit={handleSubmit}
                                        setFormData={setFormData} 
                                    />
                                     */}
                                    <PropertyForm origin="list" 
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
            <div className="section page-section listing-page-m pt20">
                <div className="container">
                    <div className=" ">
                        <div className="col  mb15 p-my">
                           
                            <>
                                {fetchedProperties.length > 0 ? (
                                   <>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={9}>
                                                {fetchedProperties.length > 0 ? (
                                                    <Box>
                                                        <Typography variant="h5" fontWeight={600} gutterBottom>
                                                            {title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {propertyCount} properties found
                                                        </Typography>
                                                    </Box>
                                                ) : (
                                                    <Box />
                                                )}
                                            </Grid>
                                        </Grid>
                                   </>
                                ) : (
                                     <div></div>
                                )}
                            </>
                          
                        </div>
                    </div>
                    <div className="row">
                        {loading ? (
                            <>
                                <div className="fancy-title-hold text-left clearfix">
                                    <div className="col-sm-9 ml5">
                                        <h2
                                            className="site-h2 mb-0 skeleton-item"
                                            style={{ width: '150px', marginBottom: '15px', height: '30px' }}
                                        >
                                            &nbsp;
                                        </h2>
                                        <div className="m5"></div>
                                        <div
                                            className="skeleton-item"
                                            style={{ width: '100px', marginBottom: '15px', height: '15px' }}
                                        >
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <FullPageLoader />
                                </div>
                            </>
                        ) : !Array.isArray(fetchedProperties) || fetchedProperties.length === 0 ? (
                            <NoPropertyListings />
                        ) : (
                                    <div className="parent-div">
                                        <Grid container spacing={3}>
                                            {fetchedProperties.map((property, index) => (
                                                <Grid
                                                    item
                                                    key={`${property.id ?? index}-${index}`}
                                                    xs={12}  // full width on extra-small screens (mobile)
                                                    sm={6}   // 2 columns on small screens (≥600px)
                                                    md={4}   // 3 columns on medium screens (≥900px)
                                                    lg={3}   // 4 columns on large screens (≥1200px)
                                                >
                                                    <PropertyCard2 property={property} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
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

    // Define maximum number of page buttons to show
    const maxButtons = 5;
    let startPage = currentPage - Math.floor(maxButtons / 2);
    let endPage = currentPage + Math.floor(maxButtons / 2);

    // Ensure that the range doesn't go out of bounds
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

export default PropertyList;