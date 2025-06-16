import { useState } from "react";
import { PropertyData } from './PropertyDetailTemplate';
import ShareModal from "./ShareModal.tsx";
interface adProps {
    property: PropertyData;
}

const PropertyEnquiryCard2: React.FC<adProps> = ({ property }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const toggleOppen = (target: EventTarget | null) => {
        const button = (target as HTMLElement)?.closest('button');
        const callClick = button?.querySelector('.call-clixk') as HTMLElement;
        if (callClick) {
            callClick.style.display = callClick.style.display === 'block' ? 'none' : 'block';
        }
    };

    return (
        <>
       
        <div id="send-enquiry-left-block-content-wrapper1">
            {property.adTitle && (
                <p className="location">{property.adTitle}</p>
            )}

            {property.priceWithCurrncy && (
                <div className="price">
                    <span className="unit-price-div">{property.priceWithCurrncy}</span>
                </div>
            )}

            <div className="team-detail">
                <div className="h-section-team">
                    {property.agent_image && (
                        <div className="img-sect-team">
                            <a href="#">
                                <img
                                    src={property.agent_image}
                                    alt={property.agent_name || 'Agent'}
                                    className="a-imag-1"
                                />
                            </a>
                        </div>
                    )}

                    <div className="detail-sect-team">
                        {property.agent_name && (
                            <div className="h1">
                                <a href="#">{property.agent_name}</a>
                            </div>
                        )}

                        {property.designation && <h3>{property.designation}</h3>}

                        {property.brn && (
                            <p className="language-know">
                                <label className="agent-br">Agent BRN:</label> <span>{property.brn}</span>
                            </p>
                        )}

                        {property.agent_language && (
                            <p className="language-know">
                                <label className="agent-br">Languages Known: </label>
                                <span>{property.agent_language}</span>
                            </p>
                        )}

                        {property.agent_email && (
                            <p className="language-know">
                                <label className="agent-br">Email: </label>
                                <span>
                                    <a href={`mailto:${property.agent_email}`}>{property.agent_email}</a>
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div className="contact-btn" style={{ display: 'flex' }}>
                        {property.agent_phone && (
                            <button
                                style={{ marginLeft: '15px', position: 'relative', flex: 1 }}
                                className="flx1 call-now btnPrimaryGreen whitein"
                                id="call-now"
                            >
                                <div onClick={(e) => toggleOppen(e.target)} id="now-click">
                                    Call Now <i className="bi bi-x-square-fill"></i>
                                </div>

                                <div className="call-clixk" style={{ display: 'none' }}>
                                    <div className="call-us-title">Call Us</div>
                                    <div>
                                        <a href={`tel:+${property.agent_phone}`}>{property.agent_phone}</a>
                                    </div>

                                    {property.SystemRefNo && (
                                        <div className="desc-ref">
                                            <p>Please quote property reference</p>
                                            <div className="ment--ref">{property.SystemRefNo}</div>
                                            <p>when calling us</p>
                                        </div>
                                    )}
                                </div>
                            </button>
                        )}

                        {property.Whatsaplink && (
                            <a
                                href={property.Whatsaplink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-secondary"
                            >
                                <i className="bi bi-whatsapp"></i> WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
            <div id="share-mew">
            <button
                id="PDPShareButton"
                type="button"
                className="iconMail phl btn btnSml btnDefault phmXxsVisible"
                onClick={openModal}
                aria-label="Share Property" // Accessibility
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512.001"
                    width="16"
                    height="16"
                    fill="currentColor"
                >
                    <g>
                        <path
                            d="M361.824 344.395c-24.531 0-46.633 10.593-61.972 27.445l-137.973-85.453A83.321 83.321 0 0 0 167.605 256a83.29 83.29 0 0 0-5.726-30.387l137.973-85.457c15.34 16.852 37.441 27.45 61.972 27.45 46.211 0 83.805-37.594 83.805-83.805C445.629 37.59 408.035 0 361.824 0c-46.21 0-83.804 37.594-83.804 83.805a83.403 83.403 0 0 0 5.726 30.386l-137.969 85.454c-15.34-16.852-37.441-27.45-61.972-27.45C37.594 172.195 0 209.793 0 256c0 46.21 37.594 83.805 83.805 83.805 24.53 0 46.633-10.594 61.972-27.45l137.97 85.454a83.408 83.408 0 0 0-5.727 30.39c0 46.207 37.593 83.801 83.804 83.801s83.805-37.594 83.805-83.8c0-46.212-37.594-83.805-83.805-83.805zm-53.246-260.59c0-29.36 23.887-53.246 53.246-53.246s53.246 23.886 53.246 53.246c0 29.36-23.886 53.246-53.246 53.246s-53.246-23.887-53.246-53.246zM83.805 309.246c-29.364 0-53.25-23.887-53.25-53.246s23.886-53.246 53.25-53.246c29.36 0 53.242 23.887 53.242 53.246s-23.883 53.246-53.242 53.246zm224.773 118.95c0-29.36 23.887-53.247 53.246-53.247s53.246 23.887 53.246 53.246c0 29.36-23.886 53.246-53.246 53.246s-53.246-23.886-53.246-53.246z"
                        />
                    </g>
                </svg> Share
            </button>
            </div>
            
            <ShareModal isOpen={isModalOpen} onClose={closeModal}
                property={{
                    ad_id: property.ad_id.toString(), // Convert `ad_id` to string
                    detailUrlAbsolute: property.detailUrlAbsolute,
                    adTitle: property.adTitle,
                }}
            />
            </>

    );
};

export default PropertyEnquiryCard2;
