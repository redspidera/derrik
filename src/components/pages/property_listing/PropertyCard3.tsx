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
    builtArea: string;
    LocationTitleOffering: string;
    AdTitle: string;
    priceWithCurrncy: string;
    agent_phone: string;
    agent_email: string;
    Whatsaplink: string;
    RentalPeriod?: string;
    categoryName?: string;
    v_link?: string;
    currency?: string;
};

interface PropertyCardProps {
    property: PropertyData;
}

const PropertyCard2: React.FC<PropertyCardProps> = ({ property }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll to top
        });
    };
    const {
        ProfileImage,

        SaveFave,
        builtArea,
        DetailUrl,
        BedroomsTitle,
        BathroomsTitle,
        categoryName,
        currency,
        RentalPeriod,

        LocationTitleOffering,
        AdTitle,
        priceWithCurrncy,

    } = property;
    const baseUrl = window.location.origin;
    return (
        <>
            <div className="card cp-wrap rounded-4 border-0 the-new-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <div className="img-wrap">
                            <NavLink to={`${baseUrl}${DetailUrl}`} onClick={scrollToTop}>
                                <img src={ProfileImage} alt="" className="img-fluid" />
                            </NavLink>
                            <span className="img-badge-br">{categoryName}</span>
                            <div dangerouslySetInnerHTML={{ __html: SaveFave }} />
                        </div>
                    </div>
                    <div className="col-sm-12  mt-lg-0 p-4" style={{ backgroundColor: '#f5f5f5' }}>
                        <div className="d-flex fw-bold price-color1">
                            <span className="text-dark pe-3  ">{currency}</span>
                            <span>{priceWithCurrncy}{RentalPeriod && (
                                <sub className="text-secondary">/{RentalPeriod}</sub>
                            )}</span>
                        </div>
                        <h4 className="fs-5 w-full capitalize mt-3"><NavLink to={`${baseUrl}${DetailUrl}`} onClick={scrollToTop}>{AdTitle}</NavLink></h4>
                        <div className="d-flex mb-2 mt-3">
                            <span className="text-dark pe-3 loc-info"><i className="bi bi-geo-alt-fill"></i>  {LocationTitleOffering && (
                                <span dangerouslySetInnerHTML={{ __html: LocationTitleOffering }} />
                            )}</span>
                        </div>

                    </div>
                </div>
                <div className="row border-1 border-top   d-flex j-space-between">
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
        </>
    );
};

export default PropertyCard2; 