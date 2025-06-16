const Skeleton = () => {
  return (
    <div className="col col-sm-6 col-md-4 plr-3 p-card">
      <div className="card card-property skeleton-item card-link taphover">
        
        <div className="card-image skeleton-item">
          <div></div>
        </div>
        
        <div className="property-icons">
          <div className="property-icon">
            <div className="d-align-center">
              <span className="shado"></span>
              <span className="b-value-parent skeleton-item" style={{ backgroundColor: '#eee' }}>
                <span className="b-value">4</span>
                <span>Bedrooms</span>
              </span>
            </div>
          </div>
          
          <div className="property-icon">
            <div className="d-align-center property-icon-flex">
              <span className="shado"></span>
              <span className="b-value-parent skeleton-item">
                <span className="b-value">5</span>
                <span>Bathrooms</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="card-content card-contentts pb-0">
          <h3>
            <a  ></a>
          </h3>
          <p className="skeleton-item">&nbsp;&nbsp;</p>
          <p className="price skeleton-item" style={{ display: 'inline-block', width: '50px' }}>
            &nbsp;
          </p>
        </div>
        
        <div className="actions mt-0">
          <a 
            className="btn btn-outline-secondary skeleton-item" 
            target="_blank" 
            rel="noopener noreferrer" 
            
          >
            <span></span>
          </a>
          
          <a 
            className="btn btn-outline-secondary skeleton-item" 
            rel="noopener noreferrer" 
             
          ></a>
          
          <a 
            className="btn btn-outline-secondary whatsapp-color skeleton-item" 
            rel="noopener noreferrer" 
            aria-label="WhatsApp"
          ></a>
        </div>
      
      </div>
    </div>
  );
};

export default Skeleton;
