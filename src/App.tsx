import React, { useState, useEffect, Suspense } from 'react'; // Import React explicitly
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Preloader from './components/Preloader.tsx'; 
import Head from './components/layouts/Head.tsx';
import ScrollToTop from '@/components/ScrollToTop.tsx'; 
import BottomBar from './components/utility/BottomBar.tsx';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/theme.tsx';
const API_URL = import.meta.env.VITE_API_URL;
const SITE_URL = import.meta.env.VITE_SITE_URL;
const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME;
const LOGO = import.meta.env.VITE_LOGO; 
const WEBROOT = import.meta.env.VITE_PUBLIC_URL;
// Dynamically import components
const Home = React.lazy(() => import('./components/pages/Home.tsx'));
const About = React.lazy(() => import('./components/pages/About.tsx'));
const PropertyListings = React.lazy(() => import('./components/pages/property_listing/PropertyListings.tsx'));
const Blog = React.lazy(() => import('./components/pages/Blog.tsx'));
const PropertyDetail = React.lazy(() => import('./components/pages/PropertyDetail.tsx'));
const SendCV = React.lazy(() => import('./components/utility/SendCV.tsx')); 
const OffplanDetail = React.lazy(() => import('./components/pages/OffplanDetail.tsx'));
const OffPlanListings = React.lazy(() => import('./components/pages/offplan_listing/OffPlanListings.tsx'));
const BlogListings = React.lazy(() => import('./components/pages/blogs/BlogListings.tsx'));
const AreaGuidesListings = React.lazy(() => import('./components/pages/area_guides/AreaGuidesListings.tsx'));
const NewsEventsListings = React.lazy(() => import('./components/pages/news/NewsEventsListings.tsx'));
const TeamListings = React.lazy(() => import('./components/pages/area_guides/TeamsListings.tsx'));
const ArticleDetail = React.lazy(() => import('./components/pages/blogs/ArticleDetail.tsx'));
const AreaGuideDetail = React.lazy(() => import('./components/pages/area_guides/AreaGuideDetail.tsx'));
const NewsDetail = React.lazy(() => import('./components/pages/area_guides/NewsDetail.tsx'));
const ListYourPropertyContent = React.lazy(() => import('./components/pages/area_guides/ListYourPropertyContent.tsx'));
const ContactUs = React.lazy(() => import('./components/pages/ContactUs.tsx'));
const LandingPage = React.lazy(() => import('./components/pages/LandingPage.tsx'));
const FAQList = React.lazy(() => import('./components/pages/FAQList.tsx'));
const PropertyManagementService = React.lazy(() => import('./components/pages/PropertyManagementService.tsx'));
const ListYourProperty = React.lazy(() => import('./components/pages/ListYourProperty.tsx'));
const AboutCv = React.lazy(() => import('./components/utility/AboutCv.tsx'));
const PropertyValuation = React.lazy(() => import('./components/pages/property_valuation/PropertyValuation.tsx'));
const DevleopersListings = React.lazy(() => import('./components/pages/developers/DevleopersListings.tsx'));
const DeveloperDetail = React.lazy(() => import('./components/pages/developers/DeveloperDetail.tsx'));
const TestimonailListings = React.lazy(() => import('./components/pages/testimonial/TestimonailListings.tsx'));
 
 
const App = () => {
  const [loadingPreloader, setLoadingPreloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingPreloader(false); // Hide the Preloader after 2 seconds
    }, 2000);
  }, []);

  return (
    <> 
        <ScrollToTop />
        {loadingPreloader && <Preloader />}
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* optional, normalize CSS */}
    
        <Header LOGO={LOGO} apiUrl={`${API_URL}footer_variables`} />
        <Head WEBROOT={WEBROOT} PROJECT_NAME={PROJECT_NAME} SITE_URL={SITE_URL} />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home API_URL={API_URL}   />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs apiUrl={`${API_URL}contact_variable`} />} />
            <Route path="/fr" element={<LandingPage apiUrl={`${API_URL}get_landing_page?code=fr`} />} />
            <Route path="/ru" element={<LandingPage apiUrl={`${API_URL}get_landing_page?code=ru`} />} />
            <Route path="/es" element={<LandingPage apiUrl={`${API_URL}get_landing_page?code=es`} />} />
            <Route path="/en" element={<LandingPage apiUrl={`${API_URL}get_landing_page?code=en`} />} />
            <Route path="/faqs" element={<FAQList apiUrl={`${API_URL}faq_items`} />} />
            <Route path="/property-management-services" element={<PropertyManagementService baseUrl={`${API_URL}`} apiUrl={`${API_URL}property_management`} />} />
            <Route path="/list-your-property-form" element={<ListYourProperty />} />
            <Route path="/list-your-property" element={<ListYourPropertyContent />} />
            <Route path="/about-us/careers" element={<AboutCv />} />
            <Route path="/list-a-property/property-valuation" element={<PropertyValuation />} />
            <Route path="/contact-us/send-your-cv" element={<SendCV />} />
            <Route path="/listings" element={<PropertyListings apiUrl={`${API_URL}listings`} />} />
            <Route
              path="/for-sale"
              element={<PropertyListings key="sale" apiUrl={`${API_URL}listings/sect/1`} />}
            />
            <Route
              path="/for-rent"
              element={<PropertyListings key="rent" apiUrl={`${API_URL}listings/sect/2`} />}
            />
            <Route
              path="/for-sale/*"
              element={<PropertyListings key="sale" apiUrl={`${API_URL}listings/sect/1`} />}
            />
            <Route
              path="/for-rent/*"
              element={<PropertyListings key="rent" apiUrl={`${API_URL}listings/sect/2`} />}
            />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/offplan-properties-for-sale"
              element={<OffPlanListings apiUrl={`${API_URL}offplanlistings`} />}
            />
            <Route
              path="/articles/news-media"
              element={<BlogListings apiUrl={`${API_URL}blogs_list`} />}
            />
        
            <Route
              path="/communities"
              element={<AreaGuidesListings apiUrl={`${API_URL}area__list`} />}
            />
            <Route
              path="/news-events"
            element={<NewsEventsListings apiUrl={`${API_URL}news__list`} />}
            />
          <Route
            path="/about-us/our-teams"
            element={<TeamListings apiUrl={`${API_URL}teams__list`} />}
          />
          <Route path="/community/:id.html" element={<AreaGuideDetail />} />
          <Route path="/event/:id.html" element={<NewsDetail />} />
            <Route
              path="/testimonials"
              element={<TestimonailListings apiUrl={`${API_URL}testimonial__list`} />}
            />
            <Route
              path="/developers"
              element={<DevleopersListings apiUrl={`${API_URL}developers__list`} />}
            />
            <Route path="/developer/:id.html" element={<DeveloperDetail />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/about-us/:id" element={<ArticleDetail />} />
            <Route path="/rent/:id.html" element={<PropertyDetail />} />
            <Route path="/sale/:id.html" element={<PropertyDetail />} />
            <Route
              path="/offplan-project/:community/:sub_community/:id.html"
              element={<OffplanDetail />}
            />
            <Route
              path="/offplan-project/:community/:id.html"
              element={<OffplanDetail />}
            />
          </Routes>
        </Suspense> 
      <Footer apiUrl={`${API_URL}footer_variables/lang/en`} />
      <BottomBar />
        {/* your app components */}
      </ThemeProvider>
    </>
  );
};

export default App;
