import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OffplanDetailTemplate, { PropertyData } from './offplan_detail/OffplanDetailTemplate.tsx';
import { Helmet } from 'react-helmet';
import { API_URL } from '@/Constants';
import FullPageLoader from '../utility/FullPageLoader.tsx';

const OffplanDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<PropertyData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
     
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
            } catch (err) {
                setError('Failed to fetch property details');
            } finally {
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

    return (
        <div>
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={property?.ProfileImage || ''} />
                <meta property="og:url" content={seoUrl} />
                <script type="application/ld+json">
                    {JSON.stringify(schemaMarkup)}
                </script>
            </Helmet>

            {loading ? (
                <FullPageLoader />
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : property ? (
                <>
                            <OffplanDetailTemplate key={`OffplanDetailTemplate-${property.ad_id}`}  property={property} />
                    <div id="foot"></div>
                  
                </>
            ) : (
                <p>Property not found</p>
            )}
        </div>
    );
};

export default OffplanDetail;
