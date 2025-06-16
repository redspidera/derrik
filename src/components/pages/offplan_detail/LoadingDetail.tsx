 const LoadingDetail = () => {
     
    return (
        <div>
            <div id="pagepiling" className="new-frmat">
                <div className="offplan-head-section">
                    <div
                        className="banner "
                        style={{
                            
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat"
                        }}
                    >
                        <div id="img" className="register_form_container">
                            <div className="align-frm">
                                <div className="align-frm-inner">
                                    <div className="register_form no-label fullwidthforms hidden-message less-opacity">
                                        <h6>Register your interest</h6>
                                        <form
                                            className="form bottom_leadContact leadContact phs"
                                            
                                        >
                                            <input type="hidden" name="ad_id" value="1595" />
                                            <div className="pure-control-group form-icon form-icon-person less-opacity">
                                                <input
                                                    className="pure-input-1"
                                                    placeholder="Name"
                                                    name="name"
                                                    type="text"
                                                     
                                                />
                                            </div>
                                            <div className="pure-control-group form-icon form-icon-mail less-opacity">
                                                <input
                                                    className="pure-input-1 skeleton-item"
                                                    placeholder="Email"
                                                    name="email"
                                                    type="email"
                                                    disabled
                                                    
                                                />
                                            </div>
                                            <div className="pure-control-group form-icon form-icon-mobile less-opacity">
                                                <input
                                                    className="pure-input-1"
                                                    placeholder="Phone"
                                                    name="phone"
                                                    type="text"
                                                    
                                                />
                                            </div>
                                            <div className="pure-control-group hide d-none">
                                                <textarea
                                                    className="pure-input-1"
                                                    placeholder="Message"
                                                    name="message"
                                                     
                                                />
                                            </div>
                                            <button  disabled className="primary_btn hover-pbg mt0 less-opacity">
                                                Submit
                                            </button>
                                            <p className="terms-privacy">
                                                By clicking Submit, you agree to our{" "}
                                                <a href="#nogo">Terms</a> &amp;{" "}
                                                <a href="#nogo">Privacy Policy.</a>
                                            </p>
                                        </form>
                                        <div className="offplan-card-agent pb0">
                                            <div className="agent_name_img">
                                                <img
                                                    src="/img/user.png"
                                                    alt="Agent"
                                                />
                                                <h6 className="agent-contact skeleton-item">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                                            </div>
                                            <div className="mail_agent">
                                                <div className="agent_contact-offplan">
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="#"
                                                    >
                                                        <img src="/img/whats.svg" alt="" />
                                                        <span className="social_name text-social skeleton-item">WhatsApp</span>
                                                    </a>
                                                    <a href="tel:+971501950988" className="phone">
                                                        <img src="/img/call.svg" alt="" />
                                                        <span className="social_name skeleton-item">Phone</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for downloads */}
          
        </div>
    );
};

export default LoadingDetail;
