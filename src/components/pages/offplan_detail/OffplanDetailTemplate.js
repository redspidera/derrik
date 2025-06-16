import { createElement as _createElement } from "react";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
//import { NavLink, useNavigate } from 'react-router-dom'; 
import TopOffplanBanner from './TopOffplanBanner';
import ProjectSection from './ProjectSection';
import ProjectDescription from './ProjectDescription';
import ImageGallery from './ImageGallery';
import BrochureRequest from './BrochureRequest';
import Amenities from './Amenities';
import PaymentPlan from './PaymentPlan';
import FloorPlan from './FloorPlan';
import DownloadModal from './DownloadModal';
import AboutSectionBottom from './AboutSectionBottom';
import ShareComponent from './ShareComponent';
import FAQComponent from './FAQComponent';
import SimilarProperties from './SimilarProperties';
const OffplanDetailTemplate = ({ property }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalFieldId, setModalFieldId] = useState('0');
    const openModal = (title, fieldId) => {
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
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { id: "pagepiling", className: "new-frmat", children: _jsx(TopOffplanBanner, { property: property }, `TopOffplanBanner-${property.ad_id}`) }), _jsx(ProjectSection, { logo: property.logo, adTitle: property.adTitle, caption: property.caption, startingPrice: property.startingPrice, paymentPlanTitle: property.paymentPlanTitle, handover: property.handover, pNumbers: property.pNumbers, rera: property.rera, ded: property.ded, brn: property.brn, qr: property.qr }, `ProjectSection-${property.ad_id}`), _createElement(ProjectDescription, { ...propertyInfo, key: `ProjectDescription-${property.ad_id}` }), _jsx(ImageGallery, { images: property.images }, `ImageGallery-${property.ad_id}`), _jsx("div", { className: "clearfix mb50" }), _jsx(BrochureRequest, { bImage: property.bImage, ad_id_number: property.ad_id }, `BrochureRequest-${property.ad_id}`), _jsx(Amenities, { amenities: property.amenities }, `Amenities-${property.ad_id}`), _jsx("div", { className: "payment-top", children: _jsx(PaymentPlan, { adTitle: property.adTitle, paymentPlans: property.paymentPlans, openModal: openModal }, `PaymentPlan-${property.ad_id}`) }), _jsx("div", { className: "payment-top", children: _jsx(FloorPlan, { adTitle: property.adTitle, floorPlans: property.floorPlans, openModal: openModal }, `FloorPlan-${property.ad_id}`) }), _jsx("div", { className: "about-set-bottom", children: _jsx(AboutSectionBottom, { c_img: property.c_img, c_description: property.c_description }, `AboutSectionBottom-${property.ad_id}`) }), _jsx("div", { className: "share-co", children: _jsx(ShareComponent, { url: property.detailUrlAbsolute, adTitle: property.adTitle }, `ShareComponent-${property.ad_id}`) }), _jsx("div", { className: "share-co", children: _jsx(FAQComponent, { faq: property.faq, adTitle: property.adTitle }, `FAQComponent-${property.ad_id}`) }), _jsx("div", { className: "similar-p mb50", children: _jsx(SimilarProperties, { similarProperties: property.similarProperties }, `SimilarProperties-${property.ad_id}`) }), _jsx("div", { children: _jsx(DownloadModal, { adId: property.ad_id, modalTitle: modalTitle, modalFieldId: modalFieldId, isVisible: isModalVisible, onClose: closeModal }, `DownloadModal-${property.ad_id}`) })] }));
};
export default OffplanDetailTemplate;
