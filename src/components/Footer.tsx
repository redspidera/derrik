import { NavLink } from "react-router-dom"
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactStick from "./pages/ContactStick";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import NewsletterSubscribe from "./utility/NewsletterSubscribe";
//import { useLanguage } from '@/components/utility/LanguageContext.tsx';
import { faTiktok, faXTwitter, faFacebookF, faYoutube, faPinterestP, faInstagram } from '@fortawesome/free-brands-svg-icons';
const LOGO2 = import.meta.env.VITE_LOGO_WHITE;
interface Properties {
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    pintrest: string;
    about: string;
    aboutheading: string;
    address: string;
    phone: string;
    email: string;
    copy: string;
    whatsapp: string;
    whatsappMessage: string;
    quicklinks: string;
    contactus: string;
    design: string;
}

interface FooterProps {

    apiUrl: string;
}
type FooterLink = {
    label: string;
    url: string;
};

type FooterLinks = {
    section1: FooterLink[];
    section2: FooterLink[];
};
const Footer = ({ apiUrl }: FooterProps) => {
    const [properties, setProperties] = useState<Properties | null>(null);
    const [loading, setLoading] = useState(true);
    const [links, setLinks] = useState<FooterLinks>({
        section1: [],
        section2: []
    });
    const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE;
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProperties(data); // Assuming the data is in the expected format
                setLinks(data.links);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching properties:", error);
                setLoading(false);
            }
        };

        fetchProperties();
    }, [apiUrl]);
    if (loading || !properties) return null;
    return (
        <section className="footer_one" id="footer1">
            <div className="container">
                <div className="row">
               
                    <div className="clearfix"></div>
                    <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 pr0 pl0">
                        <div className="footer_about_widget center-t">
                            <a href="/" title="">
                                <img
                                    src={LOGO2}
                                    alt=""
                                    data-lazy-src="images/logo.svg"
                                    data-ll-status="loaded"
                                    className="entered lazyloaded"
                                />
                            </a>
                        </div>
                       
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">

                        <>
                            <div className="footer_qlink_widget">
                                <h4>{properties.quicklinks || 'Site'}</h4>
                                <ul className="list-unstyled">
                                    <div className="row mobile-fot-row1">
                                        <div className="col-sm-12 mobile-fot-c1">
                                            {links.section1.map((item, index) => (
                                                <li key={index}>
                                                    <NavLink to={item.url}>{item.label}</NavLink>
                                                </li>
                                            ))}
                                        </div>
                                   
                                    </div>
                                </ul>
                            </div>
                           
                        </>

                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <div className="footer_qlink_widget">
                            <h4>Resources</h4>
                            <ul className="list-unstyled">
                                <div className="row mobile-fot-row1">
                                    <div className="col-sm-6 mobile-fot-c2">
                                        {links.section2.map((item, index) => (
                                            <li key={index}>
                                                <NavLink to={item.url}>{item.label}</NavLink>
                                            </li>
                                        ))}
                                    </div>

                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-1 col-xl-1">
                        <div className="footer_qlink_widget text-right">
                            <NavLink to="/faqs">
                               <h4>FAQ's</h4>
                            </NavLink>
                            
                        </div>
                        <div className="footer_about_widget mt50">
                            <div className="rh_footer__social">
                                {properties.youtube && (
                                    <a href={properties.youtube} target="_blank" rel="nofollow">
                                        <FontAwesomeIcon icon={faYoutube} size="2x" />
                                    </a>
                                )}
                                {properties.facebook && (
                                    <a href={properties.facebook} target="_blank" rel="nofollow">
                                        <FontAwesomeIcon icon={faFacebookF} size="2x" />
                                    </a>
                                )}
                                {properties.instagram && (
                                    <a href={properties.instagram} target="_blank" rel="nofollow">
                                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                                    </a>
                                )}


                                {properties.pintrest && (
                                    <a href={properties.pintrest} target="_blank" rel="nofollow">
                                        <FontAwesomeIcon icon={faPinterestP} size="2x" />
                                    </a>
                                )}
                                {properties.pintrest && (
                                    <a href={properties.pintrest} target="_blank" rel="nofollow">
                                        <FontAwesomeIcon icon={faXTwitter} size="2x" />
                                    </a>
                                )}
                                {properties.tiktok && (
                                    <a href={properties.tiktok} target="_blank" rel="nofollow">
                                        <FontAwesomeIcon icon={faTiktok} size="2x" />
                                    </a>
                                )}
                                <a href={`https://wa.me/${CONTACT_PHONE}?text=Hello`}
                                    target="_blank" rel="nofollow">
                                    <i className="fa fa-whatsapp fa-2x"></i>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 pr0 pl0">
                    <div className="footer_about_widget">
                        <NewsletterSubscribe />
                        <div className="hide">
                            <h4>{properties.aboutheading}</h4>

                            {properties.about && (
                                <p>{properties.about}</p>
                            )}
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-7 col-lg-6 col-xl-6  ">
                       
                        <div className="footer_contact_widget footer_qlink_widget">
                            <h4 className="mb-4">{properties.contactus || 'Contact Us'}</h4>
                            <ul className="list-unstyled">
                                {properties.address && (
                                    <li style={{ display: 'flex', justifyContent: 'start', alignItems: 'start', gap: '8px' }}>
                                        <LocationOnIcon />
                                        {properties.address}
                                    </li>
                                )}
                            </ul>

                            <ul className="list-unstyled bottom-list footer-i-sec2">
                                {properties.email && (
                                    <li style={{ display: 'flex', justifyContent: 'start', alignItems: 'start', gap: '8px' }}>
                                        <EmailIcon />
                                        <a href={`mailto:${properties.email}`}>{properties.email}</a>
                                    </li>
                                )}
                                {properties.phone && (
                                    <li style={{ marginTop: '10px', display: 'flex', justifyContent: 'start', alignItems: 'start', gap: '8px' }}>
                                        <PhoneIcon />
                                        <a href={`tel:${properties.phone}`}>{properties.phone}</a>
                                    </li>
                                )}
                            </ul>

                        </div>
                       
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 pr0 pl0">
                        <div className="footer_about_widget copyright d-flex">

                            {properties.copy && (
                                <p className="col-sm-6">{properties.copy}</p>

                            )}

                            <div className="col-sm-6 pull-right text-right design-text">
                                <div className="row">
                                    <div className="col-sm-6">

                                    </div>
                                    <div className="col-sm-6"> {properties.design || 'Design by'} <a href="http://www.redspider.ae/" target="_blank"><img src="/img/redpider.svg" alt="redspider.ae" style={{ width: '33px', margin: '0px' }} /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ContactStick phone={properties.whatsapp} email={properties.email} whatsappMessage={properties.whatsappMessage} />
        </section>
    );
};

export default Footer;