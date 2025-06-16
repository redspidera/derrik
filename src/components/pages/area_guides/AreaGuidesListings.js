import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import AreaGuideCard from './AreaGuideCard';
import NoData from './NoData';
import { Helmet } from 'react-helmet';
import Skeleton from './Skeleton';
import BlogFilter from './BlogFilter';
const AreaGuidesListings = ({ apiUrl }) => {
    const [loading, setLoading] = useState(false);
    const [fetchedProperties, setFetchedProperties] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        keyword: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const previousPageRef = useRef(0);
    const [totalPages, setTotalPages] = useState(1);
    const [title, setTitle] = useState('Blog : News & Trends');
    const [banner, setBanner] = useState('/img/blog.jpg');
    const [propertyCount, setPropertyCount] = useState(0);
    const formDataRef = useRef(formData);
    const previousFormDataRef = useRef(formData);
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
        if (formData.keyword !== previousFormDataRef.current.keyword) {
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
            if (!response.ok)
                throw new Error('Failed to fetch properties');
            const data = await response.json();
            setFetchedProperties(data.data.records || []);
            setTotalPages(data.data.total_pages);
            if (data.data.banner_image) {
                setBanner(data.data.banner_image);
            }
            setTitle(data.data.title || 'Blog : News & Trends');
            setPropertyCount(Number(data.data.count) || 0);
        }
        catch (error) {
            console.error('Error fetching properties:', error);
            setError('Failed to load properties. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    };
    const handleInputChange = (event) => {
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
    const handlePageChange = (page) => {
        if (page !== currentPage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            const params = new URLSearchParams(window.location.search);
            params.set('page', page.toString());
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.pushState({}, '', newUrl);
            console.log(page + 'currentPage' + currentPage);
            setCurrentPage(page);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchProperties();
    };
    useEffect(() => {
        if (currentPage !== previousPageRef.current) {
            previousPageRef.current = currentPage; // Update ref to track the current page
            fetchProperties(); // Trigger fetch if page has changed
        }
    }, [currentPage]);
    return (_jsxs("div", { children: [_jsxs("div", { className: "section-dark page-banner list-banner-home for-listing-page more-height sect-blog", children: [_jsx("div", { className: "full-block page-banner-image", style: { backgroundImage: `url(${banner})` } }), _jsx("div", { className: "full-block overlay" }), _jsx("div", { className: "container h-100-per", children: _jsx("div", { className: "row disp-table h-100-per", children: _jsx("div", { className: "col-sm-12 h-100-per", children: _jsxs("div", { className: "page-banner-content", children: [_jsx("div", { className: "fancy-title-hold text-left clearfix", children: _jsx("h2", { className: "site-h2 mb-0", children: title }) }), _jsx("div", { className: "property-search property-search-full", children: _jsx(BlogFilter, { formData: formData, handleInputChange: handleInputChange, handleSubmit: handleSubmit, setFormData: setFormData }) })] }) }) }) })] }), error && _jsx("p", { children: error }), _jsxs(Helmet, { children: [_jsx("title", { children: title }), " "] }), _jsx("div", { id: "blog", className: "blog list-project pt25 mb25", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12 p-my mb10", children: _jsx(_Fragment, { children: fetchedProperties.length > 0 ? (_jsx("div", { className: "fancy-title-hold text-left clearfix", children: _jsxs("p", { className: "text-right pr15", children: [propertyCount, " records found"] }) })) : (_jsx("div", {})) }) }) }), _jsx("div", { className: "row article gy-4 posts-list grid", children: loading ? (_jsxs(_Fragment, { children: [_jsx(Skeleton, {}), _jsx(Skeleton, {}), _jsx(Skeleton, {})] })) : (_jsx(_Fragment, { children: _jsx("div", { className: "inf-its row", children: fetchedProperties.length > 0 ? (fetchedProperties.map((property, index) => (_jsx(AreaGuideCard, { property: property }, `${property.id}-${index}`)))) : (_jsx(NoData, {})) }) })) })] }) }), _jsx("div", { className: "clearfix" }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange }), _jsx("div", { className: "clearfix" })] }));
};
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1)
        return null;
    const maxButtons = 5;
    let startPage = currentPage - Math.floor(maxButtons / 2);
    let endPage = currentPage + Math.floor(maxButtons / 2);
    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(maxButtons, totalPages);
    }
    else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - maxButtons + 1);
    }
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    return (_jsxs("div", { className: "custom-pagination", children: [currentPage > 1 && (_jsx("button", { onClick: () => onPageChange(currentPage - 1), children: "\u00AB" })), pageNumbers.map((page) => (_jsx("button", { className: page === currentPage ? 'active' : '', onClick: () => onPageChange(page), children: page }, page))), currentPage < totalPages && (_jsx("button", { onClick: () => onPageChange(currentPage + 1), children: "\u00BB" }))] }));
};
export default AreaGuidesListings;
