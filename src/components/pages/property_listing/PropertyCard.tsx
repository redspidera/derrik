import { NavLink} from 'react-router-dom';

// Define the PropertyData type
export type PropertyData = {
    id: string;
    ad_id : number,
    name: string;
    price: number;
    ProfileImage: string;
    TotalImage: number;
    DetailUrl: string;
    SaveFave: string;
    BedroomsTitle: string;
    BathroomsTitle: string;
    parking: string;
    LocationTitleOffering: string;
    AdTitle: string;
    priceWithCurrncy: string;
    agent_phone: string;
    agent_email: string;
    Whatsaplink: string;
    v_link?: string;
};

interface PropertyCardProps {
    property: PropertyData;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll to top
        });
    };
    const {
        ProfileImage,
        TotalImage,
        v_link,
        SaveFave,
        DetailUrl,
        BedroomsTitle,
        BathroomsTitle,
        parking,
        LocationTitleOffering,
        AdTitle,
        priceWithCurrncy,
        agent_phone,
        agent_email,
        Whatsaplink,
    } = property;
    const baseUrl = window.location.origin; 
    return (
        <div className="col col-sm-6 col-md-3 plr-3 p-card" data-add={AdTitle}>
            <div className="card card-property card-link taphover">
                <div className="card-image">
                    <div
                        className="full-block card-image-inner transition"
                        style={{ backgroundImage: `url(${ProfileImage})` }}
                    ></div>
                    <div className="full-block overlay transition"></div>
                    <div className="property-media">
                        <span>
                            <i className="fa fa-camera"></i> {TotalImage}
                        </span>
                    </div>
                    {v_link && (
                        <div className="3d-tour-icon">
                            <svg
                                viewBox="0 0 15 15"
                                width="25"
                                height="25"
                                className="button_icon-style3"
                            >
                                <use xlinkHref="#viewd-3d"></use>
                            </svg>
                            <span className="tour-label">3D Tour</span>
                        </div>
                    )}
                    <div className="card-hover transition">
                        <span className="icon-click"></span>
                        <span className="click-text">
                            <span className="gold">Click</span> to explore
                        </span>
                        <span className="arrow transition"></span>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: SaveFave }} />
                    <NavLink to={`${baseUrl}${DetailUrl}`} onClick={scrollToTop} className="full-block" aria-label="View Property Details" ></NavLink>
 
                </div>

                <div className="property-icons">
                    {BedroomsTitle && (
                        <div className="property-icon">
                            <div className="d-align-center">
                                <span className="shado  ">
                                <img
                                    src="/img/icon-bedroom.svg"
                                    alt="Bedrooms"
                                />
                                </span>
                               
                                <span className="b-value-parent"> <span className="b-value">{BedroomsTitle !== 'Studio' ? BedroomsTitle : ''}</span>  <span>{BedroomsTitle !== 'Studio' ? 'Bedrooms' : 'Studio'}</span></span>
                            </div>
 
                        </div>
                    )}
                    {BathroomsTitle && (
                        <div className="property-icon">
                            <div className="d-align-center property-icon-flex">
                                <span className="shado">
                                <img
                                    src="/img/icon-bathroom.svg"
                                    alt="Bathrooms"
                                />
                                </span>
                                <span className="b-value-parent"> <span className="b-value">{BathroomsTitle}</span>  <span>Bathrooms</span></span>
                            </div>
                            
                        </div>
                    )}
                    {parking && (
                        <div className="property-icon">
                            <div className="d-align-center">
                                <span className="shado">
                                <img
                                    src="/img/icon-reception.svg"
                                    alt="Parking"
                                />
                                </span>
                                <span className="b-value-parent"> <span className="b-value">{parking}</span>  <span>Parking</span></span>
                                
                            </div> 
                        </div>
                    )}
                </div>

                <div className="card-content card-contentts pb-0">
                    <h3>
                        <NavLink to={`${baseUrl}${DetailUrl}`} onClick={scrollToTop}></NavLink>
                        
                    </h3>
                    {LocationTitleOffering && (
                        <p dangerouslySetInnerHTML={{ __html: LocationTitleOffering }} />
                    )}
                    <p className="price">{priceWithCurrncy}</p>
                </div>

                <div className="actions mt-0">
                    <a
                        className="btn btn-outline-secondary"
                        href={`tel:${agent_phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Call ${agent_phone}`}
                    >
                        <img alt="Call" src="/img/telephone.png" />
                        <span>Call</span>
                    </a>
                    <a
                        className="btn btn-outline-secondary"
                        href={`mailto:${agent_email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Email ${agent_email}`}
                    >
                        <img alt="Email" src="/img/email.png" />
                        <span>Email</span>
                    </a>
                    <a
                        href={Whatsaplink}
                        target="_blank"
                        className="btn btn-outline-secondary whatsapp-color"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                    >
                        <img alt="WhatsApp" src="/img/whatsapp.png" />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
