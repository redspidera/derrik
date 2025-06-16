import { useState } from "react";
import { PropertyData } from "@/components/pages/property_detail/PropertyDetailTemplate";
import ShareModal from "./ShareModal";

interface PropertyCardProps {
    property: PropertyData;
}

const EnquireSection: React.FC<PropertyCardProps> = ({ property }) => {
    const [isCallOpen, setIsCallOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleCallOpen = () => setIsCallOpen((prev) => !prev);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="">
            <ul className="contact-btn">
                {/* Call Now Button */}
                <li>
                    <button
                        type="button"
                        className="position-re flx1 call-now btnPrimaryGreen whitein"
                        id="call-now"
                        onClick={toggleCallOpen}
                        aria-expanded={isCallOpen} // Accessibility
                    >
                        <div id="now-click">
                            <img src="/img/phone.png" alt="Phone Icon" /> Call Now{" "}
                            <i className="bi bi-x-square-fill"></i>
                        </div>
                        {isCallOpen && (
                            <div className="call-click">
                                <div className="call-us-title">Call Us</div>
                                <div>
                                    <a href={`tel:+${property.agent_phone}`}>
                                        {property.agent_phone}
                                    </a>
                                </div>
                                <div className="desc-ref">
                                    <p>Please quote property reference</p>
                                    <div className="ment--ref">{property.SystemRefNo}</div>
                                    <p>when calling us</p>
                                </div>
                            </div>
                        )}
                    </button>
                </li>

                {/* Share Button */}
                <li>
                    <button
                        id="PDPShareButton"
                        type="button"
                        className="iconMail phl btn btnSml btnDefault phmXxsVisible"
                        onClick={openModal}
                        aria-label="Share Property" // Accessibility
                    >
                        <img src="/img/send.png" alt="Share Icon" /> Share
                    </button>
                </li>
            </ul>

            {/* Share Modal */}
            <ShareModal isOpen={isModalOpen} onClose={closeModal}  
                property={{
                    ad_id: property.ad_id.toString(), // Convert `ad_id` to string
                    detailUrlAbsolute: property.detailUrlAbsolute,
                    adTitle: property.adTitle,
                }}
            />
        </div>
    );
};

export default EnquireSection;
