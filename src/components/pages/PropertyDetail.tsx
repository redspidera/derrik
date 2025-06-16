import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetailTemplate, { PropertyData } from './property_detail/PropertyDetailTemplate.tsx';
import { Helmet } from 'react-helmet';
import { API_URL } from '@/Constants';
//import LoadingDetail from './property_detail/LoadingDetail.tsx';
import FullPageLoader from '@/components/utility/FullPageLoader';
import SimilarProperties from './property_detail/SimilarProperties.tsx';
 

const PropertyDetail = () => {
    const { id } = useParams<{ id: string }>(); // Get the property ID from the URL
    
    const [property, setProperty] = useState<PropertyData | null>(null); // Single property object, not an array
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`${API_URL}detail/slug/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch property details');
                }
                const data = await response.json();
               
                setProperty(data.data.record); // Assuming this is the correct structure of the response
               
            } catch (err) {
                setError('Failed to fetch property details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

 

    // SEO-friendly meta tags and structured data
    const seoTitle = property ? `${property.adTitle}` : 'Property Details';
    const seoDescription = property
        ? `${property.adTitle} - ${property.ad_description.substring(0, 160)}...`
        : 'Property details not available';
    const seoUrl = property ? `${property.DetailUrl}` : ''; // Use property.DetailUrl here

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
                <p>{error}</p>
            ) : property ? (
                <>
                    <PropertyDetailTemplate key={`detail-{property.id}`} property={property} />
                    <div id="foot"></div>
                    <div id="similar">
                                <SimilarProperties key={`similar-{property.id}`} property={property} />
                        <div className="cleafix"></div>
                    </div>
                </>
            ) : (
                <p>Property not found</p>
            )}
        </div>
    );
};

export default PropertyDetail;
