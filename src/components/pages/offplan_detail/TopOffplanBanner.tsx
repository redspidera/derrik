import {PropertyData} from '@/components/pages/offplan_detail/OffplanDetailTemplate'
import RegistrationForm from './RegistrationForm';
interface TopOffplanBannerProps {
    property: PropertyData; 
}
const TopOffplanBanner: React.FC<TopOffplanBannerProps> = ({ property  }) => {

   

    return (
        <div className="offplan-head-section"> 
            <div
                className="banner"
                style={{
                    backgroundImage: `url(${property.bgImageMobile && window.innerWidth <= 768 ? property.bgImageMobile : property.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    
                }}
            >
                <RegistrationForm property={property} />
            </div>
            
        </div>
    );
};



export default TopOffplanBanner;
