import { useRef, useState, useEffect } from 'react'; 
import PropertyForm from './PropertyForm.tsx';
import BannerText from './BannerText.tsx'; 
import { useMediaQuery, useTheme } from '@mui/material';
interface Properties {
  video: string;
   
}
const HomeBanner = ({ apiUrl }: { apiUrl :string}) => {
 const [properties, setProperties] = useState<Properties | null>(null);
  const videoRef = useRef(null);
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));
 useEffect(() => {
         const fetchProperties = async () => {
             try {
               const response = await fetch(apiUrl );
                 const data = await response.json();
                 setProperties(data); // Assuming the data is in the expected format
                  ;
             } catch (error) {
                 console.error("Error fetching properties:", error);
                
             }
         };
 
         fetchProperties();
     }, [apiUrl]);
  return (
    <div className="section-dark page-banner home-banner">
      <div
        className="full-block page-banner-image"
        data-top="transform:translate3d(0px,0px,0px)"
        data-top-bottom="transform:translate3d(100px,0px,0px)"
        data-smooth-scrolling="off"
      ></div>
      
      <div
        className="banner-video"
        style={{
          display: 'block',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundImage: `url('/img/934kayeandco_web.jpg')`
        }}
      >
        <div className="vimeo-wrapper">
          {properties?.video && (
            <video
              id="front-banner-video"
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
              ref={videoRef}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            >
              <source src={properties.video} type="video/mp4" />
            </video>
          )}
          
        </div>
      </div>

      <div className="container h-100-m">
        <div className="row h-100-m">
          <div className="col col-md-12 h-100-m">
            <div className="page-banner-content site-home">
              <BannerText />
              {isNotMobile && <PropertyForm origin="home" />}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
