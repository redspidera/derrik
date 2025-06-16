import { NavLink } from "react-router-dom"
import { useState, useEffect } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";

import { Typography, Button } from '@mui/material';

interface Properties {
  heading: string;
  image1: string;
  image2: string;
  content: string; 
  call_to_action_link: string; 
  call_to_action: string; 
}
interface  Props { 
  apiUrl: string;
}
const AboutSection = ({ apiUrl }: Props) => { 
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
        });
    }, []);
        const [properties, setProperties] = useState<Properties | null>(null);
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
            const fetchProperties = async () => {
                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    setProperties(data); // Assuming the data is in the expected format
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching properties:", error);
                    setLoading(false);
                }
            };
    
            fetchProperties();
        }, [apiUrl]);
        if (loading || !properties) return null;
  return (
      <section id="about" className="about-sec1 section pt-5 the-about-fluid justify">
      <div className="container pt-lg-5 text-left">
        <div className="row d-flex d-flex-column-mob">
          <div
            className="col-lg-5 pe-lg-5"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="item-heigh-1-about">
           
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,           // margin bottom to space below heading
                  color: 'primary.main',
                }}
                data-aos="fade-up" data-aos-delay="200"
              >
                {properties?.heading}
              </Typography>
              <Typography
                variant="body1"

                sx={{
                  color: 'text.primary',
                }}
                data-aos="fade-up" data-aos-delay="300"
                component="div"       // use div because content may contain block elements
                dangerouslySetInnerHTML={{ __html: properties?.content || '' }}
              /> 
               <div className="mt-4"></div>
                                          <Button
                                              component={NavLink}
                to={properties?.call_to_action_link||'#'}
                                              variant="contained"
                                              size="large"
                                             
                                              sx={{
                                                  mt: 14,
                                                  fontSize: '1rem',
                                                  bgcolor: 'background.paper',   // uses theme.palette.background.paper
                                                  color: 'primary.contrastText',         // uses theme.palette.text.primary
                                                  textTransform: 'none',
                                                  boxShadow: 'none',
                                                  '&:hover': {
                                                      bgcolor: 'action.hover',    // uses theme.palette.action.hover 
                                                      boxShadow: 'none',
                                                    color: 'primary.contrastText',  
                                                  },
                                              }}
                                              data-aos="fade-up"
                                              data-aos-delay="400"
                                          >
                                              {properties?.call_to_action}
                                          </Button> 
            </div>
          </div>

          <div
            className="col-lg-3 ps-lg-5 f-w-mob"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <img
              src={properties?.image1}
              className="img-fluid rounded-4"
              alt="About section small"
            />
          </div>

          <div
            className="col-lg-4 ps-lg-15 f-w-mob"
            data-aos="zoom-in"
            data-aos-delay="550"
          >
            <div className="content">
              <img
                src={properties?.image2}
                className="img-fluid rounded-4"
                alt="About section large"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
