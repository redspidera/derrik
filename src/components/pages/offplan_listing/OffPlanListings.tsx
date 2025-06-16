import React, { useState, useEffect, useRef, useMemo } from 'react';
import OffplanCard, { OffplanData } from './OffplanCard.tsx';
//import OffplanFilter from './OffplanFilter';
import PropertyForm from '../home/PropertyForm.tsx';
import NoPropertyListings from './NoPropertyListings.tsx';
import { Helmet } from 'react-helmet';
//import PropertyCardLoading from './PropertyCardLoading.tsx';
import FullPageLoader from '@/components/utility/FullPageLoader.tsx';
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
        records: OffplanData[];
    };
}

interface PropertyListProps {
    apiUrl: string;
}

interface OffPlanListFormData {
    sectorType: string;
    listingType: string;
    propertyType: string;
    community: string;
    developer: string;
    year: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
    bathrooms: string;
    areaMin: number,
    areaMax: number,
    occupant_status: string,
    keywords: string;
    amenities: string;
    furnishing: string;
    tourTypes: string;
}

const OffPlanListings: React.FC<PropertyListProps> = ({ apiUrl }) => {

    const [loading, setLoading] = useState<boolean>(true); // Start as true
    const [fetchedProperties, setFetchedProperties] = useState<OffplanData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const params = new URLSearchParams(window.location.search);

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

    const [formData, setFormData] = useState<OffPlanListFormData>({
        sectorType: 'offplan',
        propertyType: params.get('propertyType') || '',
        listingType: params.get('listingType') || '',
        community: params.get('community') || '',
        developer: params.get('developer') || '',
        year: params.get('year') || '',
        minPrice: Number(segments.minPrice) || 0,
        maxPrice: Number(segments.maxPrice) || 0,
        areaMin: Number(segments.areaMin) || 0,
        areaMax: Number(segments.areaMax) || 0,
        bedrooms: segments.beds || '',
        bathrooms: segments.baths || '',
        keywords: segments.keywords || '',
        occupant_status: segments.status || '',
        furnishing: segments.furnishing || '',
        amenities: segments.amenities || '',
        tourTypes: segments.tourTypes || ''
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const previousPageRef1 = useRef<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [title, setTitle] = useState<string>('Properties');
    const [propertyCount, setPropertyCount] = useState<number>(0);

    const formDataRef = useRef(formData);
    const previousFormDataRef = useRef<OffPlanListFormData>(formData);

    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);

    useEffect(() => {
        if (
            formData.sectorType !== previousFormDataRef.current.sectorType ||
            formData.propertyType !== previousFormDataRef.current.propertyType ||
            formData.listingType !== previousFormDataRef.current.listingType ||
            formData.minPrice !== previousFormDataRef.current.minPrice ||
            formData.maxPrice !== previousFormDataRef.current.maxPrice ||
            formData.areaMin !== previousFormDataRef.current.areaMin ||
            formData.areaMax !== previousFormDataRef.current.areaMax ||
            formData.community !== previousFormDataRef.current.community ||
            formData.developer !== previousFormDataRef.current.developer ||
            formData.year !== previousFormDataRef.current.year ||
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
                areaMin: formData.areaMin.toString(),
                areaMax: formData.areaMax.toString(),
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
            setFetchedProperties([]);  // Clear properties on error
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const params = new URLSearchParams(window.location.search);
            params.set('page', page.toString());
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.pushState({}, '', newUrl);

            setCurrentPage(page);
        }
    };

    useEffect(() => {
        if (currentPage !== previousPageRef1.current) {
            previousPageRef1.current = currentPage; // Update ref to track the current page
            fetchProperties(); // Trigger fetch if page has changed
        }
    }, [currentPage]);

    return (
        <div>
            <div className="section-dark page-banner list-banner-home for-listing-page only-property not-mob">
                <div className="full-block page-banner-image"></div>
                <div className="full-block overlay"></div>
                <div className="container">
                    <div className="row disp-table">
                        <div className="col-sm-12">
                            <div className="page-banner-content">
                                <div className="property-search property-search-full">
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
            <div id="blog" className="blog list-project pt25 new-offplan-lst">
                <div className="container">
                    {loading ? (
                        <>
                            <FullPageLoader />
                        </>
                    ) : (
                        <>
                            <div className="row">
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
                                            <></>
                                        )}
                                    </>
                                </div>
                            </div>
                            <Grid container spacing={4} className="posts-list mb50">
                                {fetchedProperties.length > 0 ? (
                                    fetchedProperties.map((property, index) => (
                                        <Grid
                                            item
                                            key={`${property.id}-${index}`}
                                            xs={12}   // full width on mobile
                                            sm={6}    // 2 columns on small screens (≥600px)
                                            md={6}    // 3 columns on medium screens (≥900px)
                                            lg={4}    // 3 columns on large screens (≥1200px)
                                            xl={4}    // 4 columns on extra large screens (≥1536px)
                                        >
                                            <OffplanCard property={property} />
                                        </Grid>
                                    ))
                                ) : (
                                    !loading && !error && <NoPropertyListings />
                                )}
                            </Grid>
                        </>
                    )}
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

export default OffPlanListings;
