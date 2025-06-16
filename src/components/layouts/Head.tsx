import { Helmet } from 'react-helmet';

const Head = ({  PROJECT_NAME, SITE_URL }: { WEBROOT: string, PROJECT_NAME: string, SITE_URL : string }) => {
    return (
        <Helmet>
            <meta charSet="UTF-8" />
            
            <link media="all" href="/assets/css/preloader.css"  rel="stylesheet" />           
            <link media="all" href="/assets/css/app.min.css?q=71.2"  rel="stylesheet" />
            <link media="all" href="/assets/css/latest.css?q=71.2"  rel="stylesheet" />
            <title>{PROJECT_NAME}</title>
            <meta name="description" content={PROJECT_NAME} />
            <meta name="keywords" content={PROJECT_NAME} />
            <meta property="og:site_name" content={PROJECT_NAME} />
            <meta property="og:title" content={PROJECT_NAME} />
            <meta property="og:description" content={PROJECT_NAME} />
            <meta property="og:type" content="article" />
            <link rel="canonical" href={SITE_URL} />
            <meta property="og:url" content={SITE_URL} />
            <meta itemProp="image" content={`${SITE_URL}assets/img/new.jpg`} />
            <meta property="og:image" content={`${SITE_URL}assets/img/new.jpg`} />
            <link rel="alternate" href={SITE_URL} hrefLang="en" />
            <meta property="og:image:width" content="" />
            <meta property="og:image:height" content="" />
            <meta property="og:locale" content="en_US" />
            <meta name="twitter:widgets:csp" content="on" />
            <meta name="twitter:card" content="photo" />
            <meta name="twitter:url" content={SITE_URL} />
            <meta name="twitter:image" content={`${SITE_URL}assets/img/new.jpg`} />
            <meta name="twitter:title" content={PROJECT_NAME} />
            <meta name="twitter:description" content={PROJECT_NAME} />
            <meta name="twitter:site" content={PROJECT_NAME} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="shortcut icon" href="/assets/images/Fav-120.png" type="image/x-icon" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" type="text/css" media="all" />
            <link rel="stylesheet" id="gforms_formsmain_css-css" href="/assets/css/formsmain.min.css" type="text/css" media="all" />
            <link rel="stylesheet" id="gforms_ready_class_css-css" href="/assets/css/readyclass.min.css" type="text/css" media="all" />
            <link rel="stylesheet" id="gforms_browsers_css-css" href="/assets/css/browsers.min.css" type="text/css" media="all" />
          
           
            <link rel="stylesheet" id="fontawesome-css" href="/assets/font-awesome/4.7.0/css/font-awesome7661.css?ver=5.4.2" type="text/css" media="all" />
            <link rel="stylesheet" id="googlefonts-css" href="https://fonts.googleapis.com/css?family=Assistant%3A400%2C600%2C700%2C800&amp;ver=5.4.2" type="text/css" media="all" />
        </Helmet>
    );
};

export default Head;