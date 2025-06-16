import React, { useState, useEffect, useRef } from 'react';
import EventCard, { EventData } from './EventCard'; 
import NoDataCard from './NoDataCard';
import { Helmet } from 'react-helmet';
import FullPageLoader from '@/components/utility/FullPageLoader';
//import EventFilter from './EventFilter'; 
import {
    Grid,
    Typography,
} from '@mui/material'; 

interface ApiResponse {
    data: {
        count: string;
        title: string;
        sub_title: string;
        total_pages: number;
        current_page: number;
        need_banner: boolean;
        banner_image: string;
        next_page: number | null;
        prev_page: number | null;
        records: EventData[];
    };
}

interface NewsEventsListProps {
    apiUrl: string;
}

interface FormData {
    keyword: string; 
} 

const NewsEventsListings: React.FC<NewsEventsListProps> = ({ apiUrl }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchedEvents, setFetchedEvents] = useState<EventData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({ keyword: '' });
    const [needBannerDiv, setNeedBannerDiv] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const previousPageRef = useRef<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [title, setTitle] = useState<string>('News & Events');
    const [subTitle, setSubTitle] = useState<string>('');
    const [banner, setBanner] = useState<string>('');
    //const [eventCount, setEventCount] = useState<number>(0);

    const formDataRef = useRef(formData);
    const previousFormDataRef = useRef<FormData>(formData);

    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setFormData({ keyword: params.get('keyword') || '' });
        setCurrentPage(Number(params.get('page')) || 1);
    }, []);

    useEffect(() => {
        if (formData.keyword !== previousFormDataRef.current.keyword) {
            fetchEvents();
            previousFormDataRef.current = formData;
        }
    }, [formData, currentPage]);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                keyword: formData.keyword,
                page: currentPage.toString(),
            });
            const url = `${apiUrl}?${params.toString()}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch events');
            const data: ApiResponse = await response.json();

            setFetchedEvents(data.data.records || []);
            setTotalPages(data.data.total_pages);
            setNeedBannerDiv(data.data.need_banner);
            setBanner(data.data.banner_image);
            setTitle(data.data.title || 'News & Events');
            setSubTitle(data.data.sub_title || '');
            //setEventCount(Number(data.data.count) || 0);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to load events. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    /*
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => {
            const updatedFormData = { ...prevData, [name]: value };
            const params = new URLSearchParams({ keyword: updatedFormData.keyword, page: '1' });
            window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
            setCurrentPage(1);
            return updatedFormData;
        });
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        fetchEvents();
    };
    */
    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const params = new URLSearchParams(window.location.search);
            params.set('page', page.toString());
            window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        if (currentPage !== previousPageRef.current) {
            previousPageRef.current = currentPage;
            fetchEvents();
        }
    }, [currentPage]);

    return (
        <div>
            {error && <p>{error}</p>}
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {loading ? (
                <FullPageLoader />
            ) : (
                <>
                    {needBannerDiv && (
                        <div className="section-dark page-banner list-banner-home more-height half-height sect-blog">
                            <div className="full-block page-banner-image" style={{ backgroundImage: `url(${banner})` }}></div>
                            <div className="full-block overlay"></div>
                            <div className="container h-100-per">
                                <div className="row disp-table h-100-per">
                                    <div className="col-sm-12 h-100-per">
                                        <div className="page-banner-content">
                                            <div className="text-in-writer">
                                                <div className="fancy-title-hold text-left clearfix">
                                                    <h2 className="fancy-title animate">{title}<span className="sub-title-fnt">{subTitle}</span></h2>
                                                </div>
                                            </div>
                                            <div className="property-search property-search-full hide d-none">
                                                {/*
                                                <EventFilter
                                                    formData={formData}
                                                        handleSubmit={handleSubmit}
                                                    handleInputChange={handleInputChange}
                                                    setFormData={setFormData}
                                                />
                                                */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="news-events pt25 mb25">
                        <div className="container mb-50">
                            {!needBannerDiv && (
                                <Grid item xs={12} md={6} mt={5} mb={3}>
                                    <Typography variant="overline" color="primary">Home / News & Events</Typography>
                                </Grid>
                            )}

                            <Grid container spacing={3}>
                                {fetchedEvents.length > 0 ? (
                                    fetchedEvents.map((event, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={`${event.id}-${index}`}>
                                            <EventCard event={event} />
                                        </Grid>
                                    ))
                                ) : (
                                            <Grid item xs={12}><NoDataCard /></Grid>
                                )}
                            </Grid>
                        </div>
                    </div>
                </>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    return (
        <div className="custom-pagination">
            {currentPage > 1 && <button onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>}
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && <button onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>}
        </div>
    );
};

export default NewsEventsListings;