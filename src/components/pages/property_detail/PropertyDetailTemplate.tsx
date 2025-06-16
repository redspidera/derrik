import { useState, useEffect } from 'react';
import BannerComponent from '../property_detail/BannerComponent.tsx' 
import FeaturesList from './FeaturesList.tsx';
import Amenities from './Amenities.tsx';
import Overview from './Overview.tsx';
import MapView from './MapView.tsx';
//import EnquiryForm from './EnquiryForm.tsx'; 
import ShareComponent from '../offplan_detail/ShareComponent.tsx';
import PropertyEnquiryCard from './PropertyEnquiryCard.tsx';
import PropertyInfo from './PropertyInfo.tsx';
import PropertyDetails from './PropertyDetails.tsx';
import PropertyBreadcrumbs from './PropertyBreadcrumbs.tsx';


export type PropertyData = {
    id: string;
    ad_id: number;
    section_id: number;
    community_id: number;
    name: string;
    community_name: string;
    sub_community_id: number;
    sub_community_slug: string;
    sub_community_name: string;
    community_slug: string;
    category_slug: string;
    category_name: string;
    price: number;
    ProfileImage: string;
    TotalImage: number;
    bedrooms: string;
    bathrooms: number;
    builtArea: string;
    DetailUrl: string;
    detailUrlAbsolute: string;
    SaveFave: string;
    BedroomsTitle: string;
    BathroomsTitle: string;
    parking: string;
    LocationTitleOffering: string;
    adTitle: string;
    priceWithCurrncy: string;
    agent_phone: string;
    agent_email: string;
    agent_language: string;
    Whatsaplink: string;
    category: string;
    builtup_area: string;
    SystemRefNo: string;
    v_link?: string;
    ad_description: string;
    tour3dLink: string;
    AdTitle: string;
    communityTitle: string;
    location_longitude: number;
    location_latitude: number;
    agent_name: string;
    agent_image: string;
    brn: string;
    RERA: string;
    designation: string;
    image_list:[];
    amenities: Array<{
        name: string;
        icon: string;
    }>;
    features_list: Array<{
        name: string;
        value: string;
    }>;
};

interface PropertyCardProps {
    property: PropertyData;
}

const PropertyDetailTemplate: React.FC<PropertyCardProps> = ({ property }) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    
    
    useEffect(() => {
        if (isVideoOpen) {
            document.body.classList.add('open-video');
        } else {
            document.body.classList.remove('open-video');
        }
        // Cleanup function to ensure the class is removed if the component unmounts
        return () => document.body.classList.remove('open-video');
    }, [isVideoOpen]);
   
    const open3dVideo = (url: string): void => {
        setVideoUrl(url);
        setIsVideoOpen(true);
    };
     
    const close3dVideo = (): void => {
        setIsVideoOpen(false);
        setVideoUrl('');
    };
    // Function to toggle the visibility of the call section
  
   
    return (
        <div className="inside-container">
       
            <PropertyBreadcrumbs property={property} />

        
           
            <div id="contetn">
                <div className="section page-section pt-0">
                    <div className="container">
                        <div className="row">
                             <div>
                                <PropertyDetails property={property} />
                             </div>
                            <div className="col-sm-12">
                                <BannerComponent key={`BannerComponent-${property.ad_id}`} images={property.image_list} />

                            </div>
                           
                        </div>
                        <div className="row detail-contetn-html">
                            <div className="col-sm-8" id="description">
                                
                                <PropertyInfo property={property} open3dVideo={open3dVideo} />
                                <FeaturesList key={`FeaturesList-${property.ad_id}`} features={property.features_list} />
                                <Overview key={`Overview-${property.ad_id}`} description={property.ad_description} />
                                {property.amenities && property.amenities.length > 0 && (
                                    <Amenities key={property.ad_id} amenities={property.amenities} />
                                )}
                                <MapView key={`MapView-${property.ad_id}`} latitude={property.location_latitude} longitude={property.location_longitude} />

                                <ShareComponent key={`ShareComponent-${property.ad_id}`} url={property.detailUrlAbsolute} adTitle={property.adTitle}/> 
                              
                            </div>
                            <div className="col-sm-4 left-padd-15 stick-fixed">
                                <PropertyEnquiryCard property={property} />
                                {/* 
                                <EnquiryForm key={`EnquiryForm-${property.ad_id}`}   ad_id_number={property.ad_id} property={property} />
                                */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {isVideoOpen && (
                <div className="bg-video">
                    <div className="close-link">
                        <a href="#" className=" " onClick={close3dVideo}>
                            <img src="/img/close-window.png" alt="" className="" />
                        </a>
                    </div>
                    <iframe
                        id="tour-3d-frame"
                        src={videoUrl} 
                        allowFullScreen
                        title="3D Tour"
                    ></iframe>
                 </div>
            )}
        </div>
        
    );
};

export default PropertyDetailTemplate;
