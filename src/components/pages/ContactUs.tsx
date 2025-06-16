import   { useEffect, useState } from 'react';
import ContactUsTop from '../utility/ContactUsTop';
import ContactUsForm from '../utility/ContactUsForm';
import FullPageLoader from '../utility/FullPageLoader';
 
interface Properties {
    phone: string;
    email: string;
    headerTitle: string;
    sub_title: string;
    admin_email: string;
    address: string;
    opening: string;
    alt_phone: string;
    whatsappText: string;
    whatsappNumber: string;
    telephone: string;
    alt_telephone: string;
    heading: string;
    banner: string;
    dexcription: string;
    content: string | null;
}

interface FooterProps {
    apiUrl: string;
}

const ContactUs = ({ apiUrl }: FooterProps) => {
    const [properties, setProperties] = useState<Properties | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setProperties(data);
            } catch (err) {
                console.error('Error loading contact properties:', err);
            }
        };
        fetchProperties();
    }, [apiUrl]);

    const contactInfo = {
        phone: properties?.phone,
        email: properties?.email,
        whatsappLink: `https://wa.me/${properties?.whatsappNumber}`,
        whatsappText: properties?.whatsappText,
        address: properties?.address,
        heading: properties?.heading,
        description: properties?.dexcription,
    };

    return (
        <>
            {properties? (
            <>
            <div className="contact-top">
                {properties && <ContactUsTop {...contactInfo} />}
            </div>

            <div className="contact-us head-sect article-main">
                <div className="section-dark page-banner list-banner-home more-height sect-blog half-height">
                    <div className="full-block page-banner-image" style={{ backgroundImage: `url(${properties?.banner})` }}></div>
                    <div className="full-block overlay"></div>
                    {properties?.headerTitle && (
                        <div className="container h-100">
                            <div className="row disp-table h-100">
                                <div className="col col-md-12 h-100">
                                    <div className="page-banner-content h-100">
                                        <div className="fancy-title-hold text-initial clearfix">
                                            <h2 className="fancy-title animate animated">
                                                {properties.headerTitle}
                                                {properties.sub_title && <span className="sub-title-fnt">{properties.sub_title}</span>}
                                            </h2>
                                                  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <section className="frm-cnt1">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 contact-us-0">
                                {properties?.content ? (
                                    
                                        <div dangerouslySetInnerHTML={{ __html: properties.content }} />
                                    
                                ) : (
                                    <p></p>
                                )}
                            </div>
                            <div className="col-sm-6 contact-fid">
                                {properties?.admin_email && <ContactUsForm adminEmail={properties.admin_email} />}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </>
            ) : (
                    <FullPageLoader />
            )}
        </>
    );
};

export default ContactUs;
