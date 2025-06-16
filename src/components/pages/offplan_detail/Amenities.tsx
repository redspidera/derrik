import React from 'react';

interface Amenity {
iconList: string; // Icon class
amenitiesName: string; // Amenity name
}

interface AmenitiesProps {
amenities: Amenity[]; // Array of amenities passed as a prop
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
    if (amenities.length === 0) {
        return null; // Do not render anything if there are no amenities
    }
    return (
    <div className="section scrolable  pt-0 mt50" id="amenities">
        <div className="featured-title-hold text-center clearfix mb20">
            <h3 className="site-h1 animate mt-3 mb-3">
                <div className="line-container-parent">
                    <div className="lines-container flex-end">
                        <div className="line small-line"></div>
                        <div className="line big-line"></div>
                    </div>
                    <h5 className="line-text">Project Amenities</h5>
                    <div className="lines-container">
                        <div className="line small-line"></div>
                        <div className="line big-line"></div>
                    </div>
                </div>
            </h3>
        </div>
            <ul className="avalia-units amenities-li amenity-list mt30">
            <li className="row">
                {amenities.map((amenity, index) => (
                <div className="col-sm-3" key={index}>
                    <div className="amenity1">
                        <p className="am-conta">
                            <i className={`fa amenity-none ${amenity.iconList}`}></i> <span className="am-dtsil">{amenity.amenitiesName}</span>
                        </p>
                    </div>
                </div>
                ))}
            </li>
        </ul>
    </div>
    );
    };

    export default Amenities;