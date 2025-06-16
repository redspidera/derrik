import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OffplanDetailTemplate from './offplan_detail/OffplanDetailTemplate';
import { Helmet } from 'react-helmet';
import { API_URL } from '@/Constants';
import LoadingDetail from './offplan_detail/LoadingDetail';
const OffplanDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}offplan_detail/slug/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch property details');
                }
                const data = await response.json();
                setProperty(data.data.record);
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
    }, [id]); // 👈 id change will trigger re-fetch
    // SEO-friendly meta tags and structured data
    const seoTitle = property ? `${property.adTitle} - Real Estate | Kaye & Co` : 'Property Details';
    const seoDescription = property ? `${property.adTitle} - ${property.ad_description.substring(0, 160)}...` : 'Property details not available';
    const seoUrl = property ? `https://kayeandco.ae${property.DetailUrl}` : '';
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": property?.adTitle,
        "description": property?.ad_description,
        "image": property?.ProfileImage,
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
    return (_jsxs("div", { children: [_jsxs(Helmet, { children: [_jsx("title", { children: seoTitle }), _jsx("meta", { name: "description", content: seoDescription }), _jsx("meta", { property: "og:title", content: seoTitle }), _jsx("meta", { property: "og:description", content: seoDescription }), _jsx("meta", { property: "og:image", content: property?.ProfileImage || '' }), _jsx("meta", { property: "og:url", content: seoUrl }), _jsx("script", { type: "application/ld+json", children: JSON.stringify(schemaMarkup) })] }), loading ? (_jsx(LoadingDetail, {})) : error ? (_jsx("p", { className: "error-message", children: error })) : property ? (_jsxs(_Fragment, { children: [_jsx(OffplanDetailTemplate, { property: property }, `OffplanDetailTemplate-${property.ad_id}`), _jsx("div", { id: "foot" })] })) : (_jsx("p", { children: "Property not found" }))] }));
};
export default OffplanDetail;
