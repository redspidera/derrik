import React from 'react';
import { NavLink } from 'react-router-dom';

// Define the interface for the props
interface AreaGuide {
  title: string;
  slug: string;
  image: string;
}

interface AreaGuidesSectionProps {
  latest: AreaGuide[];
}

const AreaGuidesSection: React.FC<AreaGuidesSectionProps> = ({ latest }) => {
  return (
    <section className="ads-sect new-sect other-areas">
      <div className="container">
        <div className="project-title project-info-title">
          <ul className="about-g-t">
            <li>Other Communities</li>
          </ul>
        </div>

        <div className="inf-its row">
          {latest.map((area, index) => (
            <div className="col-sm-3" key={index}>
              <div className="the-inner">
                      <NavLink to={area.slug} className="mor-a-list"></NavLink>
                
                <div
                  className="img-info"
                  style={{ backgroundImage: `url(${area.image})` }}
                ></div>
                <h4>{area.title}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginBottom: '60px' }}>
         
          <NavLink to="/communities" className="btn btn-primary"> View All Communities</NavLink>
        </div>
      </div>
    </section>
  );
};

export default AreaGuidesSection;