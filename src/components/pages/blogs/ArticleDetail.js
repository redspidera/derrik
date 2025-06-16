import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { API_URL, PROJECT_NAME, SITE_URL } from '@/Constants';
import LoadingBlog from './LoadingBlog';
import ShareComponent from '../offplan_detail/ShareComponent';
import OurTeams from '../home/OurTeams';
;
;
;
;
const calculateReadingTime = ({ content }) => {
    const wordsPerMinute = 200; // Average words per minute
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
};
const BlogTemplate = ({ title, description, absoluteUrl, DateNew, latest }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { id: "content", children: [_jsx("div", { className: "breadcrumbs mt0", children: _jsx("div", { className: "container", style: { marginBottom: '0px' }, children: _jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12", children: _jsx("span", { children: _jsxs("span", { children: [_jsx(NavLink, { to: "/", children: "Home" }), " ", _jsx("i", { className: "fa fa-angle-right" }), _jsx(NavLink, { to: "/articles/news-media", children: "Blogs" }), " ", _jsx("i", { className: "fa fa-angle-right" }), _jsx("span", { className: "breadcrumb_last", "aria-current": "page", children: title })] }) }) }) }) }) }), _jsx("div", { className: "section page-section blllog-detail", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "mainDiv", children: [_jsx("div", { id: "headerNewplace", style: { display: 'none' } }), _jsx("div", { id: "pageContainer", className: "container margin-top-240", children: _jsxs("div", { className: "row", children: [_jsx("div", { className: "col-lg-7", children: _jsxs("div", { className: "singlepost", children: [_jsx("h1", { children: title }), _jsx("div", { className: "postmeta", children: _jsxs("ul", { children: [_jsx("li", { children: _jsxs("a", { href: "#", children: [_jsx("i", { className: "fa fa-calendar" }), " ", DateNew] }) }), _jsxs("li", { id: "reading-time", children: ["Reading Time: ", calculateReadingTime({ content: description }), " minutes"] })] }) }), _jsx("div", { className: "post-content post-details service-details", id: "reading-contetn", children: _jsx("div", { dangerouslySetInnerHTML: {
                                                                    __html: description
                                                                } }) }), _jsx("div", { className: "share-co", children: _jsx(ShareComponent, { url: absoluteUrl, adTitle: title }) })] }) }), _jsx("div", { className: "col-lg-1" }), _jsx("div", { className: "col-lg-4", children: _jsx(LatestUpdates, { latest: latest }) })] }) })] }) }) })] }) }));
};
const AboutTemplate = ({ title, description }) => {
    return (_jsxs("div", { id: "content", children: [_jsx("div", { className: "breadcrumbs", children: _jsx("div", { className: "container", children: _jsx("div", { className: "row", children: _jsx("div", { className: "col col-sm-12", children: _jsxs("span", { children: [_jsx(NavLink, { to: "/", children: "Home" }), " ", _jsx("i", { className: "fa fa-angle-right" }), _jsx("span", { className: "breadcrumb_last", "aria-current": "page", children: title })] }) }) }) }) }), _jsx("div", { className: "section page-section", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "mainDiv", children: [_jsx("div", { id: "headerNewplace", style: { display: 'none' } }), _jsx("div", { id: "pageContainer", className: "container margin-top-240", children: _jsxs("div", { className: "container_content", children: [_jsxs("div", { className: "bottom_line_2 crmbrimg", children: [_jsx("span", {}), _jsx("span", {})] }), _jsx("div", { className: "unit_lowerer", children: _jsx("div", { className: "overview-control-div", children: _jsx("div", { className: "stagc-loc-txt", children: _jsx("span", { className: "stagc-loc-txt-span2", children: description && (_jsx("div", { dangerouslySetInnerHTML: {
                                                                __html: description.replace('[YOUTUBE]', ``),
                                                            } })) }) }) }) }), _jsx(OurTeams, { apiUrl: `${API_URL}teams` }), _jsx("div", { style: { clear: 'both' } })] }) })] }) }) })] }));
};
const LatestUpdates = ({ latest = [] }) => {
    if (!latest.length) {
        return null; // Return nothing if latest are empty
    }
    return (_jsxs("div", { className: "widget", children: [_jsx("div", { className: "widget-title", children: _jsx("div", { className: "featured-title-hold text-center clearfix mb15", children: _jsx("h3", { className: "site-h1 animate", children: _jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Latest Updates" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }) }) }) }), _jsx("ul", { className: "comments-list", children: latest.map((item, index) => (_jsxs("li", { children: [_jsx("div", { className: "alignleft", children: _jsx(NavLink, { to: `/article/${item.slug}`, children: _jsx("img", { src: item.image, alt: item.title }) }) }), _jsx("div", { className: "alignRight", children: _jsx("h3", { children: _jsx(NavLink, { to: `/article/${item.slug}`, title: item.title, children: item.title }) }) })] }, index))) })] }));
};
const ContentTemplate = ({ title, description }) => {
    return (_jsx("div", { className: "section page-section", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "content-template", children: [_jsx("h1", { children: title }), _jsx("p", { children: description })] }) }) }));
};
const ArticleDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [banner, setBanner] = useState('/img/blog.jpg');
    const [needBannerDiv, setNeedBannerDiv] = useState(true);
    const [load_ing, setLoad_ing] = useState(true);
    const [error, setError] = useState('');
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
            }
            catch (err) {
                //setLoad_ing(false);
                if (err instanceof Error && err.name === 'AbortError') {
                    console.log('Fetch aborted');
                }
                else {
                    setError('Failed to fetch property details');
                }
            }
            finally {
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
    return (_jsxs("div", { children: [_jsxs(Helmet, { children: [_jsx("title", { children: seoTitle }), _jsx("meta", { name: "description", content: seoDescription }), _jsx("meta", { property: "og:title", content: seoTitle }), _jsx("meta", { property: "og:description", content: seoDescription }), _jsx("meta", { property: "og:image", content: property?.Image || '' }), _jsx("meta", { property: "og:url", content: seoUrl }), _jsx("script", { type: "application/ld+json", children: JSON.stringify(schemaMarkup) })] }), needBannerDiv && (_jsx("div", { className: `${categoryId} head-sect article-main `, children: _jsx("div", { className: "section-dark page-banner list-banner-home   more-height sect-blog", children: _jsx("div", { className: "full-block page-banner-image as", style: { backgroundImage: `url(${banner})` } }) }) })), load_ing ? (_jsx(LoadingBlog, {})) : error ? (_jsx("p", { className: "error-message", children: error })) : property ? (_jsx(_Fragment, { children: _jsxs("div", { className: "article-main-wrapper", children: [property?.category === 'blog' && (_jsx(BlogTemplate, { title: property?.Title, description: property?.Description, DateNew: property?.DateNew, absoluteUrl: property?.AbsoluteURL, Image: property?.Image, latest: property?.latest })), property?.category === 'about' && (_jsx(AboutTemplate, { title: property?.Title, description: property?.Description })), property?.category === 'content' && (_jsx(ContentTemplate, { title: property?.Title, description: property?.Description }))] }) })) : (
            // Only show "Property not found" if loading is false, error is false, and property is null or undefined.
            !load_ing && !error && !property && _jsx("p", { children: "Property not found" }))] }));
};
export default ArticleDetail;
