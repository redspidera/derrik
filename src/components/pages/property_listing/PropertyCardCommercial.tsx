import { NavLink } from 'react-router-dom';
export type PropertyData = {
    id: string;
    ad_id: number,
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
    sectionName: string;
    builtArea: string;
    RentalPeriod?: string;
    categoryName?: string;
    v_link?: string;
    currency?: string;
};

interface PropertyCardProps {
    property: PropertyData;
}

const PropertyCardCommercial: React.FC<PropertyCardProps> = ({ property }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll to top
        });
    };
    const {
        ProfileImage,
        sectionName,
        BedroomsTitle,
        DetailUrl,
        BathroomsTitle,
        currency,
        RentalPeriod,
        builtArea,

        LocationTitleOffering,
        AdTitle,
        priceWithCurrncy,

    } = property;
    const baseUrl = window.location.origin;
    return (
        <>
            <div className="card cp-wrap rounded-4 border-0 mb-3 h-100 ">
              
                <div className="row d-flex h-100">
                    <div className="col-lg-6 text-center h-100">
                        <NavLink to={`${baseUrl}${DetailUrl}`} className="d-block h-100" onClick={scrollToTop}>
                            <img src={ProfileImage} alt={AdTitle} className="img-fluid h-100" />
                        </NavLink>

                    </div>
                    <div className="col-lg-6 mt-3 mt-lg-0 p-4 m-pad-commercial">
                        <h4 className="fs-5 w-full text-capitalize">
                            <NavLink to={`${baseUrl}${DetailUrl}`} onClick={scrollToTop}>
                                {AdTitle}
                            </NavLink></h4>
                        <div className="d-flex mb-2 mt-3 loc-info">
                            <span className="text-dark pe-3 loc-dflex">
                                <i className="bi bi-geo-alt-fill"></i> {LocationTitleOffering}
                            </span>
                            <div className="">
                            <span
                                className="badge rounded-pill text-bg-dark"
                                style={{ lineHeight: "14px", fontWeight: "normal" }}
                            >
                                {sectionName}
                            </span>
                            </div>
                        </div>
                        <div className="d-flex mt-3 fw-bold price-color1">
                            <span className="text-dark pe-3">{currency}</span>
                            <span>
                                {priceWithCurrncy}{RentalPeriod && (
                                    <sub className="text-secondary">/{RentalPeriod}</sub>
                                )}
 

                            </span>
                        </div>
                        <div className="d-flex mt-4 j-c-s-b">
                            <div className="col11">
                                <div className="d-flex mt-3 mb-3 align-items-center gp-2">
                                    <span className="text-dark pe-3"><img src="/assets/images/bed.svg" alt="" /></span>
                                    <span>{BedroomsTitle} </span>
                                </div>
                            </div>
                            <div className="col11">
                                <div className="d-flex mt-3 mb-3 align-items-center gp-2">
                                    <span className="text-dark pe-3"><img src="/assets/images/bath.svg" alt="" /></span>
                                    <span>{BathroomsTitle} </span>
                                </div>
                            </div>
                            {builtArea && (
                                <div className="col11">
                                    <div className="d-flex mt-3 mb-3 align-items-center gp-2">
                                        <span className="text-dark pe-3"><img src="/assets/images/sqft.svg" alt="" /></span>

                                        <span dangerouslySetInnerHTML={{ __html: builtArea }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default PropertyCardCommercial; 