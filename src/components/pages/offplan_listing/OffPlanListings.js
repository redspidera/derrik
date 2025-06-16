import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import OffplanCard from './OffplanCard';
//import OffplanFilter from './OffplanFilter';
import PropertyForm from '../home/PropertyForm';
import NoPropertyListings from './NoPropertyListings';
import { Helmet } from 'react-helmet';
import PropertyCardLoading from './PropertyCardLoading';
const OffPlanListings = ({ apiUrl }) => {
    const [loading, setLoading] = useState(false);
    const [fetchedProperties, setFetchedProperties] = useState([]);
    const [error, setError] = useState(null);
    const params = new URLSearchParams(window.location.search);
    const [formData, setFormData] = useState({
        sectorType: 'offplan',
        propertyType: params.get('propertyType') || '',
        listingType: params.get('listingType') || '',
        community: params.get('community') || '',
        developer: params.get('developer') || '',
        year: params.get('year') || '',
        minPrice: Number(params.get('minPrice')) || 0,
        maxPrice: Number(params.get('maxPrice')) || 0,
        bedrooms: params.get('bedrooms') || '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const previousPageRef1 = useRef(0);
    const [totalPages, setTotalPages] = useState(1);
    const [title, setTitle] = useState('Properties');
    const [propertyCount, setPropertyCount] = useState(0);
    const formDataRef = useRef(formData);
    const previousFormDataRef = useRef(formData);
    useEffect(() => {
        formDataRef.current = formData;
    }, [formData]);
    useEffect(() => {
        if (formData.sectorType !== previousFormDataRef.current.sectorType ||
            formData.propertyType !== previousFormDataRef.current.propertyType ||
            formData.listingType !== previousFormDataRef.current.listingType ||
            formData.minPrice !== previousFormDataRef.current.minPrice ||
            formData.maxPrice !== previousFormDataRef.current.maxPrice ||
            formData.community !== previousFormDataRef.current.community ||
            formData.developer !== previousFormDataRef.current.developer ||
            formData.year !== previousFormDataRef.current.year ||
            formData.bedrooms !== previousFormDataRef.current.bedrooms) {
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
                minPrice: formData.minPrice.toString(),
                maxPrice: formData.maxPrice.toString(),
                bedrooms: formData.bedrooms,
                developer: formData.developer,
                year: formData.year,
                page: currentPage.toString(),
            });
            const url = `${apiUrl}?${params.toString()}`;
            const response = await fetch(url);
            if (!response.ok)
                throw new Error('Failed to fetch properties');
            const data = await response.json();
            setFetchedProperties(data.data.records || []);
            setTotalPages(data.data.total_pages);
            setTitle(data.data.title || 'Properties');
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
    useEffect(() => {
        if (currentPage !== previousPageRef1.current) {
            previousPageRef1.current = currentPage; // Update ref to track the current page
            fetchProperties(); // Trigger fetch if page has changed
        }
    }, [currentPage]);
    return (_jsxs("div", { children: [_jsxs("div", { className: "section-dark page-banner list-banner-home for-listing-page only-property", children: [_jsx("div", { className: "full-block page-banner-image" }), _jsx("div", { className: "full-block overlay" }), _jsx("div", { className: "container", children: _jsx("div", { className: "row disp-table", children: _jsx("div", { className: "col-sm-12", children: _jsx("div", { className: "page-banner-content", children: _jsx("div", { className: "property-search property-search-full", children: _jsx(PropertyForm, { origin: "list", setFormData: setFormData }) }) }) }) }) })] }), error && _jsx("p", { children: error }), _jsxs(Helmet, { children: [_jsx("title", { children: title }), " "] }), _jsx("div", { id: "blog", className: "blog list-project pt25 new-offplan-lst", children: _jsxs("div", { className: "container", children: [_jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12 p-my mb10", children: _jsx(_Fragment, { children: fetchedProperties.length > 0 ? (_jsxs("div", { className: "fancy-title-hold text-left clearfix", children: [_jsx("h2", { className: "site-h2 mb-0", children: title }), _jsxs("p", { children: [propertyCount, " properties found"] })] })) : (_jsx("div", {})) }) }) }), _jsx("div", { className: "row gy-4 posts-list grid", children: loading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "fancy-title-hold text-left clearfix", children: _jsxs("div", { className: "col-sm-9 ml5", children: [_jsx("h2", { className: "site-h2 mb-0 skeleton-item", style: { 'width': '150px', 'marginBottom': '15px', 'height': '30px' }, children: "\u00A0" }), _jsx("div", { className: "m5" }), _jsx("div", { className: "skeleton-item", style: { 'width': '100px', 'marginBottom': '15px', 'height': '15px' }, children: "\u00A0" })] }) }), _jsxs("div", { className: "row", children: [_jsx(PropertyCardLoading, {}), _jsx(PropertyCardLoading, {}), _jsx(PropertyCardLoading, {}), _jsx(PropertyCardLoading, {})] })] })) : (_jsx(_Fragment, { children: fetchedProperties.length > 0 ? (fetchedProperties.map((property, index) => (_jsx(OffplanCard, { property: property }, `${property.id}-${index}`)))) : (_jsx(NoPropertyListings, {})) })) })] }) }), _jsx("div", { className: "clearfix" }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: handlePageChange }), _jsx("div", { className: "clearfix" })] }));
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
export default OffPlanListings;
