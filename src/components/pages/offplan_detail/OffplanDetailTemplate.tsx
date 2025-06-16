import { useState } from 'react'; 
//import { NavLink, useNavigate } from 'react-router-dom'; 
import TopOffplanBanner from './TopOffplanBanner.tsx';
import ProjectSection from './ProjectSection.tsx';
import ProjectDescription from './ProjectDescription.tsx';
import ImageGallery from './ImageGallery.tsx';
import BrochureRequest from './BrochureRequest.tsx';
import Amenities from './Amenities.tsx';
import PaymentPlan from './PaymentPlan.tsx';
import FloorPlan from './FloorPlan.tsx';
import DownloadModal from './DownloadModal.tsx';
import AboutSectionBottom from './AboutSectionBottom.tsx';
import ShareComponent from './ShareComponent.tsx';
import FAQComponent from './FAQComponent.tsx';
import SimilarProperties from './SimilarProperties.tsx';


export type PropertyData = {
    id: string;
    ad_description: string;
    DetailUrl: string;
    ProfileImage: string;
    price: string;
    ad_id: number;
    bgImage: string;
    bgImageMobile: string;
    adTitle: string;

    agent_logo: string;
    agent_name: string;
    mobile_number: string;
    ReferenceNumberTitle: string;
    detailUrlAbsolute: string;

    logo: string;
    caption: string;
    startingPrice: string;
    paymentPlanTitle: string;
    handover: string;

    pNumbers: string;
    rera: string;
    ded: string;
    brn: string;
    qr: string;
 
    developerName: string;
    locationLatitude: string;
    locationLongitude: string;
    communityTitle: string;
    shortDescription: string;
    adDescription: string;
    dRight: string;

    location_latitude: number;
    bImage: string;
    images:[];
    amenities: Array<{
        iconList: string;
        amenitiesName: string;
    }>;
    features_list: Array<{
        name: string;
        value: string;
    }>;
    paymentPlans: Array<{
        description: string;
        percentage: string;
    }>;
    faq: Array<{
        title: string;
        file: string;
    }>;
    floorPlans: Array<{
        floor_file: string; 
        floor_title: string; 
    }>;
    similarProperties: Array<{
        bg_img: string;
        ad_title: string;
        community_name: string;
        PriceTitleDetail: string;
        mobile_number: string;
        ReferenceNumberTitle: string;
        detailUrlAbsolute: string;
        detailUrl: string;
        location_latitude: string;
        location_longitude: string;
    }>;
    c_img: string;
    c_description: string;
};

interface PropertyCardProps {
    property: PropertyData;
}
const OffplanDetailTemplate: React.FC<PropertyCardProps> = ({ property }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalFieldId, setModalFieldId] = useState('0');
    const openModal = (title: string, fieldId: string) => {
        setModalTitle(title);
        setModalFieldId(fieldId);
        setIsModalVisible(true);
        document.body.classList.add('modal-open');
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalVisible(false);
        document.body.classList.remove('modal-open');
    };
    const propertyInfo = {
        adTitle: property.adTitle,
        developerName: property.developerName,
        locationLatitude: property.locationLatitude,
        locationLongitude: property.locationLongitude,
        communityTitle: property.communityTitle,
        shortDescription: property.shortDescription,
        adDescription: property.adDescription,
        dRight: property.dRight,
    } 
    return (
         
        <>
            <div id="pagepiling" className="new-frmat">
                <TopOffplanBanner property={property} key={`TopOffplanBanner-${property.ad_id}`} />
            </div>
            
            <ProjectSection 
                logo={property.logo} 
                adTitle={property.adTitle}
                caption={property.caption}
                startingPrice={property.startingPrice} 
                paymentPlanTitle={property.paymentPlanTitle}
                handover={property.handover} 
                pNumbers={property.pNumbers} 
                rera={property.rera} 
                ded={property.ded} 
                brn={property.brn} 
                qr={property.qr} 
                key={`ProjectSection-${property.ad_id}`}
                 />
            <ProjectDescription {...propertyInfo} key={`ProjectDescription-${property.ad_id}`} />
            <ImageGallery images={property.images} key={`ImageGallery-${property.ad_id}`}  />
            <div className="clearfix mb50"></div>
            <BrochureRequest bImage={property.bImage} ad_id_number={property.ad_id} key={`BrochureRequest-${property.ad_id}`}  />
            <Amenities amenities={property.amenities} key={`Amenities-${property.ad_id}`}  />
            <div className="payment-top">
                <PaymentPlan key={`PaymentPlan-${property.ad_id}`}  adTitle={property.adTitle} paymentPlans={property.paymentPlans} openModal={openModal} />
            </div>
            <div className="payment-top">
                <FloorPlan key={`FloorPlan-${property.ad_id}`}  adTitle={property.adTitle} floorPlans={property.floorPlans} openModal={openModal} />
            </div>
            <div className="about-set-bottom">
                <AboutSectionBottom key={`AboutSectionBottom-${property.ad_id}`} c_img={property.c_img} c_description={property.c_description}  />
            </div>
            <div className="share-co">
                <ShareComponent key={`ShareComponent-${property.ad_id}`} url={property.detailUrlAbsolute} adTitle={property.adTitle} />
            </div> 
            <div className="share-co">
                <FAQComponent key={`FAQComponent-${property.ad_id}`} faq={property.faq} adTitle={property.adTitle} />
            </div> 
            <div className="similar-p mb50">
                <SimilarProperties key={`SimilarProperties-${property.ad_id}`} similarProperties={property.similarProperties}/>
            </div>
            <div>
                <DownloadModal
                    key={`DownloadModal-${property.ad_id}`}
                    adId={property.ad_id}
                    modalTitle={modalTitle}
                    modalFieldId={modalFieldId}
                    isVisible={isModalVisible}
                    onClose={closeModal}
                />
            </div>

        </>
    );
};

export default OffplanDetailTemplate;
