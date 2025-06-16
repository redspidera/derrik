const PropertyCardLoading = () => {
  return (
    <div className="col-lg-4 main-li">
      <article className="d-flex flex-column">
        <div
          className="post-img lozad"
           
        >
          <span className="dev_logo d-logo-s">
            <img
              src="/img/buildings.png"
              alt="Developer Logo"
            />
          </span>
          <ul className="attrribute-ul hide d-none">
            <li></li>
          </ul>
          <a
            className="view-link-offplan ske;eton-item"
            
          >
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary css-1abvrni-MuiButtonBase-root-MuiButton-root"
              type="button"
            >
              <span className="MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium css-1jsm74t-MuiButton-startIcon">
                
              </span>
              View
            </button>
          </a>
        </div>
        <div className="contentcls">
          <div className="row">
            <div className="col-sm-12">
              <div className="row mt5 mb5 spl-margin-list">
                <div className="col-sm-12 locpointer-detail flex-1 skeleton-item">
                  <img src="/img/placeholder.png" alt="Location Pointer" className="locpointer" />
                  <span className="min-2dth-150">&nbsp;&nbsp;</span>
                </div>
              </div>
              <h2 className="title sp-pr-ce-detail">
                <a
                   className="skeleton-item"
                >
                  
                </a>
                <div className="price-text at-latest flex-1">
                  <span className="startingfrom skeleton-item"> </span>
                  <div className="white-space-nowrap skeleton-item">
                    <span data-id="1400000.00">AED</span> 1,400,000
                  </div>
                </div>
              </h2>
            </div>
          </div>
          <div className="row">
            <div
              className="col-sm-4"
              style={{ display: 'none', alignItems: 'center', justifyContent: 'center' }}
            >
              <div className="read-more w-100 align-center" style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <a
                   
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PropertyCardLoading;
