import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetailTemplate from './property_detail/PropertyDetailTemplate';
import { Helmet } from 'react-helmet';
import { API_URL } from '@/Constants';
import LoadingDetail from './property_detail/LoadingDetail';
import SimilarProperties from './property_detail/SimilarProperties';
const PropertyDetail = () => {
    const { id } = useParams(); // Get the property ID from the URL
    const [property, setProperty] = useState(null); // Single property object, not an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`${API_URL}detail/slug/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch property details');
                }
                const data = await response.json();
                setProperty(data.data.record); // Assuming this is the correct structure of the response
            }
            catch (err) {
                setError('Failed to fetch property details');
            }
            finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProperty();
        }
    }, [id]);
    // SEO-friendly meta tags and structured data
    const seoTitle = property ? `${property.adTitle} - Real Estate | Kaye & Co` : 'Property Details';
    const seoDescription = property
        ? `${property.adTitle} - ${property.ad_description.substring(0, 160)}...`
        : 'Property details not available';
    const seoUrl = property ? `https://kayeandco.ae${property.DetailUrl}` : ''; // Use property.DetailUrl here
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": property?.adTitle,
        "description": property?.ad_description,
        "image": property?.ProfileImage, // Assuming ProfileImage is the main property image
        "price": property?.price,
        "url": seoUrl,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Downtown",
            "addressCountry": "AE"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "AED",
            "price": property?.price
        }
    };
    return (_jsxs("div", { children: [_jsxs(Helmet, { children: [_jsx("title", { children: seoTitle }), _jsx("meta", { name: "description", content: seoDescription }), _jsx("meta", { property: "og:title", content: seoTitle }), _jsx("meta", { property: "og:description", content: seoDescription }), _jsx("meta", { property: "og:image", content: property?.ProfileImage || '' }), _jsx("meta", { property: "og:url", content: seoUrl }), _jsx("script", { type: "application/ld+json", children: JSON.stringify(schemaMarkup) })] }), loading ? (_jsx(LoadingDetail, {})) : error ? (_jsx("p", { children: error })) : property ? (_jsxs(_Fragment, { children: [_jsx(PropertyDetailTemplate, { property: property }, `detail-{property.id}`), _jsx("div", { id: "foot" }), _jsxs("div", { id: "similar", children: [_jsx(SimilarProperties, { property: property }, `similar-{property.id}`), _jsx("div", { className: "cleafix" })] })] })) : (_jsx("p", { children: "Property not found" }))] }));
};
export default PropertyDetail;
