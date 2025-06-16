import React, { useState } from "react";

interface PropertyInfo {
  adTitle: string;
  developerName: string;
  locationLatitude: string;
  locationLongitude: string;
  communityTitle: string;
  shortDescription: string;
  adDescription: string;
  dRight: string;
}

const ProjectDescription: React.FC<PropertyInfo> = ({
  adTitle,
  developerName,
  locationLatitude,
  locationLongitude,
  communityTitle,
  shortDescription,
  adDescription,
  dRight,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div id="section2" className="section-hm bg-has new-sect project-sect-descript descrp2" style={{ paddingBottom: "60px" }}>
      <div className="container">
        <div className=" at-center1">
          <div className="col-sm-7 d-min-height pr15">
            <div className="project-title">
              <ul className="about-g-t more2">
                <li>{adTitle}</li>
              </ul>
              <li className="loct-detail">
                by {developerName} |{" "}
                <a
                  href={`https://www.google.com/maps/?q=${locationLatitude},${locationLongitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 15 15" className="button_icon-style3">
                    <use xlinkHref="#loc_svg"></use>
                  </svg>{" "}
                  {communityTitle}
                </a>{" "}
              </li>
            </div>

            <div className="description text">
              <div className="less-descript">
                {shortDescription.replace("#ffffff", "")}
              </div>
              {isExpanded && (
                <div className="more-descript">
                  {adDescription.replace("#ffffff", "")}
                </div>
              )}
            </div>

            <button className="read-more-btn" onClick={toggleDescription}>
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </div>

          <div className="col-sm-5">
            <div className="pl-3-desc">
              {dRight && <img src={`${dRight}`} alt="Ad" id="lc-image" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
