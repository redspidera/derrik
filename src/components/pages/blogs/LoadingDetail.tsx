const Breadcrumbs = () => (
    <div className="breadcrumbs dt2 skeleton-item">
        <div className="container">
            <div className="row">
                <div className="col col-sm-12">
                    <span>
                        <button className="back-btn visibility-hidden">Back</button>
                        <span>
                            <a href="/" data-discover="true"> </a> <i className="fa fa-angle-right"></i>
                        </span>
                        <span>
                            <a href="/for-rent" data-discover="true"> </a><i className="fa fa-angle-right"></i>
                        </span>
                      </span>
                </div>
            </div>
        </div>
    </div>
);

  
const PropertyImages = () => (
    <div className="photo-5 banner_detail skeleton-item">
        <div className="photo-grid-5 photo-grid">
            <div className="photo1 photo-layer lozad loaded" ></div>
        </div>
        <div className="photo-grid-5 photo-grid bulk-layer">
            <div className="photo-grid">
                <div className="photo2 photo-layer lozad loaded" ></div>
                <div className="photo3 photo-layer lozad loaded"   ></div>
            </div>
            <div className="photo-grid">
                <div className="photo4 photo-layer lozad loaded"   ></div>
                <div className="photo5 photo-layer lozad loaded"  ></div>
                <span className="remaining visibility-hidden">+16</span>
            </div>
        </div>
    </div>
);

const EnquiryForm = () => (
    <form className="pure-form pure-form-aligned main-enquiry-form skeleton-item mt40">
        <fieldset>
            <legend className="visibility-hidden">Send Enquiry</legend>
            <div className="division visibility-hidden">
                <input type="hidden" name="ad_id" value="1843" />
                <input className="pure-input-1" placeholder="Name" name="name" type="text" />
                <input className="pure-input-1" placeholder="Email" name="email" type="text" />
                <input className="pure-input-1" placeholder="Phone" name="ph" type="text" />
            </div>
            <div className="division visibility-hidden">
                <textarea className="pure-input-1" placeholder="Message" name="message" defaultValue="Hello, I found your property on KAYE & CO REAL ESTATE L.L.C. Please send me more information about this property. Thank you."></textarea>
                <button className="button button-primary" type="submit">Send Enquiry</button>
            </div>
        </fieldset>
    </form>
);

const LoadingDetail = () => (
    <div className="inside-container">
        <Breadcrumbs />
        <div id="content">
            <div className="section page-section pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8" id="description">
                            <h1 className="site-h1 top-1  visibility-hidden">Fountain and Community View | Maid | Vacant</h1>
                            <div className="spl-desc  visibility-hidden">
                                <label className="d-block mb-0 price-tit visibility-hidden"><b>AED 360,000</b></label>
                            </div>
                           
                            <PropertyImages />
                            <p className="lead visibility-hidden">Property reference: MB-R-3334</p>
                        </div>
                        <div className="col-sm-4 left-padd-15">
                            <EnquiryForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default LoadingDetail;