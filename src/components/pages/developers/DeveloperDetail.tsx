import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom'; 
import { Helmet } from 'react-helmet';
import { API_URL, PROJECT_NAME, SITE_URL } from '@/Constants';
 
import LoadingBlog from './LoadingBlog';
import ShareComponent from '../offplan_detail/ShareComponent';
 
export type BlogData = {
    id: string;
    category: string;
    Image: string;
    Title: string;
    DetailUrl: string;
    ShortDescription: string;
    Description: string;
    DatePublished: string;
    DateModified: string;
    AuthorName: string;
    AbsoluteURL: string;
    DateNew: string;

    latest: Array<{
        slug: string;
        title: string;
        image: string;
    }>;
};
interface BlogProps {
    title: string,
    description: string,
    DateNew: string,
    Image: string,
    absoluteUrl: string, 
};

 
 
const BlogTemplate = ({ title, description, absoluteUrl ,  DateNew }: BlogProps) => {
    return (
        <>

            <div id="content">
                <div className="breadcrumbs mt0">
                    <div className="container" style={{ marginBottom: '0px' }}>
                        <div className="row">
                            <div className="col col-sm-12">
                                <span>
                                    <span>
                                        <NavLink to="/">Home</NavLink> <i className="fa fa-angle-right"></i>
                                        <NavLink to="/articles/news-media">Blogs</NavLink> <i className="fa fa-angle-right"></i>
                                        <span className="breadcrumb_last" aria-current="page">
                                            {title}
                                        </span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section page-section blllog-detail">
                    <div className="container">
                        <div className="mainDiv">
                            <div id="headerNewplace" style={{ display: 'none' }}></div>
                            <div id="pageContainer" className="container margin-top-240">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <div className="singlepost">

                                            <h1>{title}</h1>
                                            <div className="postmeta">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                            <i className="fa fa-calendar"></i> {DateNew}
                                                        </a>
                                                    </li>
                                                   
                                                </ul>
                                            </div>
                                            <div className="post-content post-details service-details" id="reading-contetn">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: description
                                                    }}
                                                />
                                            </div>
                                            <div className="share-co">
                                                <ShareComponent url={absoluteUrl} adTitle={title} />
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="col-lg-1"></div>
                                    
                                </div>

                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

  
 

const DeveloperDetail = () => {

    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<BlogData | null>(null);
    const [categoryId, setCategoryId] = useState<string>('');
    const [banner, setBanner] = useState<string>('/img/blog.jpg');
    const [needBannerDiv, setNeedBannerDiv] = useState<boolean>(true);
    const [load_ing, setLoad_ing] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    

    useEffect(() => {
        const controller = new AbortController(); // 1. Create AbortController (moved outside of fetchProperty)
       
        const fetchProperty = async () => {
           
            try { 
                setLoad_ing(true);
                const response = await fetch(`${API_URL}article_detail/slug/${id}`, { signal: controller.signal }); // 2. Attach signal
                if (!response.ok) {
                    throw new Error('Failed to fetch property details');
                }  
                
                const data = await response.json();
                setProperty(data.data.record);
                setNeedBannerDiv(data.data.record.need_banner);
                setBanner(data.data.record.banner_image);
                setCategoryId(data.data.record.category);
                setLoad_ing(false);
            } catch (err) {
                //setLoad_ing(false);
                if (err instanceof Error && err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError('Failed to fetch property details');
                }
            } finally {
                
            }
        };

        if (id) {
            fetchProperty();
        }

        // 3. Cleanup on component unmount or id change
        return () => {
            controller.abort(); // Abort fetch when the component unmounts or `id` changes
        };

    }, [id]); // When `id` changes, it triggers this useEffect

    // SEO-friendly meta tags and structured data
    const seoTitle = property ? `${property.Title} - ${PROJECT_NAME}` : 'Article Details';
    const seoDescription = property ? `${property.Title} - ${property.ShortDescription.substring(0, 160)}...` : 'Property details not available';
    const seoUrl = property ? `${property.AbsoluteURL}` : '';

    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": property?.Title,
        "description": property?.ShortDescription,
        "image": property?.Image,
        "url": seoUrl,
        "datePublished": property?.DatePublished, // Example: "2024-12-14"
        "dateModified": property?.DateModified, // Optional: Last modified date
        "author": {
            "@type": "Person",
            "name": property?.AuthorName, // Example: "John Doe"
            "url": property?.AbsoluteURL // Optional: Link to author profile
        },
        "publisher": {
            "@type": "Organization",
            "name": PROJECT_NAME, // Example: "Tech Blog Inc."
            "logo": {
                "@type": "ImageObject",
                "url": property?.Image // Example: "https://example.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": SITE_URL
        },
        "articleBody": property?.Description // Optional: Full article content (for enhanced SEO)
    };
  
    return (
        <div>
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={property?.Image || ''} />
                <meta property="og:url" content={seoUrl} />
                <script type="application/ld+json">
                    {JSON.stringify(schemaMarkup)}
                </script>
            </Helmet>
            {needBannerDiv && (
                <div 
                    className={`${categoryId} head-sect article-main `}
                >
                <div className="section-dark page-banner list-banner-home for-listing-page more-height sect-blog" >
                    <div
                        className="full-block page-banner-image as"
                            style={{ backgroundImage: `url(${banner})`  }}
                    >
                    </div>
                </div>
            </div>
            )}
            {load_ing ? (
                <LoadingBlog />
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : property ? (
                <>
                    <div className="article-main-wrapper">
                        {property?.category === 'blog' && (
                            <BlogTemplate
                                title={property?.Title}
                                description={property?.Description}
                                DateNew={property?.DateNew}
                                absoluteUrl={property?.AbsoluteURL}
                                Image={property?.Image}
                                 
                            />
                        )}
                   
                         
                    </div>
                </>
            ) : (
                // Only show "Property not found" if loading is false, error is false, and property is null or undefined.
                !load_ing && !error && !property && <p>Property not found</p>
            )}


        </div>
    );
};

export default DeveloperDetail;

