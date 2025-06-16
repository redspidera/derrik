import { useState } from 'react';
import BrochureRequestForm from './BrochureRequestForm';

interface BrochureRequestProps {
  bImage: string; // Image URL for the brochure
  ad_id_number: number; // Image URL for the brochure
    // Base URL for fallback image
}

const BrochureRequest: React.FC<BrochureRequestProps> = ({ bImage, ad_id_number }) => {
  // State to handle image load error
  const [imageSrc, setImageSrc] = useState<string>(bImage ?   bImage    : `/img/brd.png`);

  const handleImageError = () => {
    setImageSrc(`/img/brd.png`);
  };

  return (
      <div className="section scrolable pt0 mt-50 pb0 brochure-bg" id="brochure"  >
      
      <div className="container">
        <div className="row download-brochure pb0">
          {/* Left Column: Form Section */}
          <div className="col-sm-5" id="rsult-request">
            
            {/* Placeholder FormComponent */}
                      <BrochureRequestForm ad_id_number={ad_id_number} />
          </div>

          {/* Right Column: Image Section */}
          <div className="col-sm-7 right-mod">
            <div className="black-tran"></div>
            <img 
              src={imageSrc} 
              onError={handleImageError} 
              alt="Brochure Preview" 
              style={{ maxHeight: '352px' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureRequest;
