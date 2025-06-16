import   { useEffect, useState } from 'react';
import {   Typography } from '@mui/material';
interface Service {
  title: string;
  image: string;
  alt: string;
  items: string[];
}
interface Props {
    apiUrl: string;
}

const AboutService = ({ apiUrl }: Props) => { 
    
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
          const response = await fetch(apiUrl); // Replace with your actual endpoint
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="about__services-wrapper pb-4 pt-32 tablet:pb-20 tablet:pt-40">
      <div className=" "  >
        <h2 className="mb-8 text-center text-white tablet:mb-20 hide d-none">OUR SERVICES</h2>
        <div className="about__services">
          {services.map((service, index) => (
            <div className="about__services-item" key={index}>
              <div className="about__services-item__img">
                <img
                  data-aos="fade-right" data-aos-delay="200"
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  className="about__services-item__img-inner"
                  style={{ visibility: 'visible' }}
                />
              </div>
              <div className="about__services-item__text">
                <div className="about__services-item__text-inner">
                  <h3 className="mb-6 text-2xl xlPc:text-4xl" data-aos="fade-up" data-aos-delay="100">{service.title}</h3>
                  <ul className="text-base font-thin xlPc:text-2xl" role="list">
                    {service.items.map((item, idx) => (
                      <li className="services__item-li" key={idx} data-aos="fade-up" data-aos-delay="200">

                        <Typography
                          variant="body1"
                          mt={4}
                          sx={{
                            color: 'primary.dark',
                            textAlign: 'justify',
                            mb: 3,
                          }}
                          data-aos="fade-up" data-aos-delay="400"
                          component="div"       // use div because content may contain block elements
                          dangerouslySetInnerHTML={{ __html: item || '' }}
                        />
 
                      </li>
                    ))}
                  </ul>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutService;
