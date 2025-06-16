import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom'; 
import { Helmet } from 'react-helmet';
import { API_URL, PROJECT_NAME, SITE_URL } from '@/Constants';
import AboutService from './AboutService';
import WhyChoose from './WhyChoose.tsx';
import OppositeSliders from './OppositeDirectionSliders';
//import LoadingBlog from './LoadingBlog'; 
import ShareComponent from '../offplan_detail/ShareComponent';
import FullPageLoader from '@/components/utility/FullPageLoader';
import TestimonailListings from '../testimonial/TestimonailListings.tsx';

//import OurTeams from '../home/OurTeams';
export type BlogData = {
    id: string;
    category: string;
    Image: string;
    Title: string;
    sub_title: string;
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
    latest: LatestBlogItem[]
};

interface AboutProps {
    title: string,
    description: string
};

interface ContentProps {
    title: string,
    description: string
};
interface DetailContentProps {
    content: string,
};
const calculateReadingTime = ({ content }: DetailContentProps) => {
    const wordsPerMinute = 200; // Average words per minute
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
};
const BlogTemplate = ({ title, description, absoluteUrl ,  DateNew, latest }: BlogProps) => {
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
                                                    <li id="reading-time">
                                                        Reading Time: {calculateReadingTime({ content: description })} minutes
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
                                    <div className="col-lg-4">

                                        <LatestUpdates latest={latest} />

                                    </div>
                                </div>

                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

const AboutTemplate = ({  description }: AboutProps) => {
    return (
        <div id="content" className="about__services">
            {/* Breadcrumbs */}
            <div className="section page-section about-sect-e ">
                <div className="container">
                    <div className="mainDiv">
                        <div id="headerNewplace" style={{ display: 'none' }}></div>
                        <div id="pageContainer" className="container margin-top-240">
                            <div className="container_content">
                                <div className="bottom_line_2 crmbrimg">
                                    <span></span>
                                    <span></span>
                                </div>

                                {/* Unit Content */}
                                <div className="unit_lowerer">
                                    <div className="overview-control-div">
                                        <div className="stagc-loc-txt">
                                            <span className="stagc-loc-txt-span2">
                                                {/* Render article content with YouTube embed */}
                                                {description && (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: description.replace(
                                                                '[YOUTUBE]',
                                                                ``
                                                            ),
                                                        }}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/*
                                <OurTeams apiUrl={`${API_URL}teams`} />
                                */}

                                {/* End Content */}
                                <div style={{ clear: 'both' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AboutService apiUrl={`${API_URL}about_us_service`} />

            {/* Main Content Section */}
           
        </div>
    );
};
interface AboutProps1 {
    title: string,
        description?: string; 
    propertyId?: string; 
    slider1?: string[]; // optional
    slider2?: string[];
}

const OurStorytemplate = ({ description, slider1, slider2, propertyId, title  }: AboutProps1) => {
    // Check if sliders exist and are non-empty
   
 
    return (
        <div id="content" className="about__services container">
            {/* Breadcrumbs */}
             
            <div className="section page-section ouestory-sect-e ">
                <div className=" ">
                    <div className="hidden"> {title}</div>
                    <div className="mainDiv">
                        <div id="headerNewplace" style={{ display: 'none' }}></div>
                        <div id="pageContainer" className=" margin-top-240">
                            <div className="container_content">
                                <div className="bottom_line_2 crmbrimg">
                                    <span></span>
                                    <span></span>
                                </div>

                                {/* Unit Content */}
                                <div className="unit_lowerer">
                                    <div className="overview-control-div whyww">
                                        <div className="stagc-loc-txt">
                                            <span className="stagc-loc-txt-span2">
                                                {description && (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: description.replace('[YOUTUBE]', ''),
                                                        }}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                  
                                </div> 
                                {propertyId && propertyId=='484' &&(
                                <div className="why-coose">
                                        <WhyChoose apiUrl={`${API_URL}choose_us_why`} />
                                </div>
                                )}
                                {propertyId && propertyId == '498' && (
                                    <div className="mt50">
                                         <TestimonailListings apiUrl={`${API_URL}testimonial__list`} />
                                    </div>
                                 )}
                                {/* Conditionally render OppositeSliders */}
                                
                                    <OppositeSliders
                                    slider1={slider1 ?? []}
                                        slider2={slider2 ?? []}
                                    />
                                 
                                {/* End Content */}
                                <div style={{ clear: 'both' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
        </div>
    );
  };
interface LatestBlogItem {
    slug:string;
    title:string;
    image:string;
}
interface LatestBlogProps {
    latest: LatestBlogItem[];
}

const LatestUpdates = ({ latest = [] }: LatestBlogProps) => {
    if (!latest.length) {
        return null; // Return nothing if latest are empty
    }

    return (
        <div className="widget">
            <div className="widget-title">
                <div className="featured-title-hold text-center clearfix mb15"><h3 className="site-h1 animate"><div className="line-container-parent"><div className="lines-container flex-end"><div className="line small-line"></div><div className="line big-line"></div></div><h5 className="line-text">Latest Updates</h5><div className="lines-container"><div className="line small-line"></div><div className="line big-line"></div></div></div></h3></div>
            </div>

            <ul className="comments-list">
                {latest.map((item, index) => (
                    <li key={index}>
                        <div className="alignleft">
                            <NavLink to={`/article/${item.slug}`}>
                                <img src={item.image} alt={item.title} />
                            </NavLink>
                        </div>
                        <div className="alignRight">
                        <h3>
                            <NavLink to={`/article/${item.slug}`} title={item.title}>
                                {item.title}
                            </NavLink>
                        </h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ContentTemplate = ({ title, description }: ContentProps) => {
    return (
        <div className="section page-section content-page">
            <div className="container">
                <div className="content-template">
                    <h1>{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </div>
        </div>
    );
};

const ArticleDetail = () => {

    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<BlogData | null>(null);
    const [categoryId, setCategoryId] = useState<string>('');
    const [banner, setBanner] = useState<string>('');
    const [needBannerDiv, setNeedBannerDiv] = useState<boolean>(true);
    const [load_ing, setLoad_ing] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [slider1, setSlider1] = useState([]);
    const [slider2, setSlider2] = useState([]);

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

                const slider = data?.data?.record?.slider;

                if (slider?.slider1) {
                    setSlider1(slider.slider1); 
                }  
                if (slider?.slider2) { 
                    setSlider2(slider.slider2);
                }  
               
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
            
            {load_ing ? (
                <FullPageLoader />
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : property ? (
                <>
                            {needBannerDiv && (
                                <div
                                    className={`${categoryId} head-sect article-main `}
                                >
                                    <div className="section-dark page-banner list-banner-home   more-height sect-blog half-height" >
                                        <div
                                            className="full-block page-banner-image as"
                                            style={{ backgroundImage: `url(${banner})` }}
                                        >
                                        </div>
                                        <div className="full-block overlay"></div>
                                        {property?.category && (
                                            <div className="container h-100">
                                                <div className="row disp-table h-100">
                                                    <div className="col col-md-12 h-100">
                                                        <div className="page-banner-content h-100">
                                                            <div className="page-banner-content h-100">
                                                                <div className="fancy-title-hold text-initial clearfix">
                                                                    {property?.category !== 'blog' && (
                                                                        <h2 className="fancy-title animate animated">
                                                                            {property?.Title}

                                                                            {property.sub_title && (
                                                                                <span className="sub-title-fnt">
                                                                                    {property.sub_title}
                                                                                </span>
                                                                            )}
                                                                        </h2>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            )}
                    <div className="article-main-wrapper">
                        {property?.category === 'blog' && (
                            <BlogTemplate
                                title={property?.Title}
                                description={property?.Description}
                                DateNew={property?.DateNew}
                                absoluteUrl={property?.AbsoluteURL}
                                Image={property?.Image}
                                latest={property?.latest}
                            />
                        )}
                        {property?.category === 'about' && (
                            <>
                            <AboutTemplate
                                title={property?.Title}
                                description={property?.Description}
                            />
                                  
                            </>
                        )}
                                {property?.category === 'our-story' && (
                            <>
                            <OurStorytemplate
                                            propertyId={property?.id}
                                title={property?.Title}
                                description={property?.Description}
                                slider1={slider1}
                                slider2={slider2}
                            />
                                  
                            </>
                        )}
                        {property?.category === 'content' && (
                            <ContentTemplate
                                title={property?.Title}
                                description={property?.Description}
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

export default ArticleDetail;

