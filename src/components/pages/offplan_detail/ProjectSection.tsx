import RegulatorySection from "./RegulatorySection";

interface PropertyInfo {
    logo: string;
    adTitle: string;
    caption: string;
    startingPrice: string;
    paymentPlanTitle: string;
    handover: string;
    pNumbers: string;
    rera: string;
    ded: string;
    brn: string;
    qr: string;
}

const ProjectSection = ({
    logo,
    adTitle,
    caption,
    startingPrice,
    paymentPlanTitle,
    handover,
    pNumbers,
    rera,
    ded,
    brn,
    qr,
}: PropertyInfo) => {
    // Scroll function
    const scrollDiv = () => {
        const element = document.getElementById("section2");
        if (element) {
            element.scrollIntoView();
        }
    };

    // Prepare the regulatory info object
    const regulatoryInfo = { pNumbers, rera, ded, brn, qr };

    return (
        <div id="section1" className="section-hm hdr new-sect full first mb-40">
            <div className="container">
                <div className="  at-center">
                    <div className="col-sm-6 d-min-height">
                        <div className="d-logo">
                            <strong></strong>
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className="project-title">
                            <ul className="project-t">
                                <li>
                                    <h1>{adTitle}</h1>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="project-description">
                                {caption && <div dangerouslySetInnerHTML={{ __html: caption }} />}
                            </div>
                            <div className="cta-btn hide d-none">
                                <button type="button" onClick={scrollDiv} className="btn btn-primary btn-lg">
                                    Enquire Now
                                </button>
                            </div>
                        </div>
                        
                    </div>

                    <div className="col-sm-6 bg-black1">
                        <div className="black-tran"></div>
                        <div className="more-det">
                        <div className="prect-ifo">
                            <ul>
                                <li>
                                    <img src="/img/offplan/price.svg" alt="" />
                                    <div className="inf-sect">
                                        <div className="inf-sect-valu">
                                            <div dangerouslySetInnerHTML={{ __html: startingPrice }} />
                                        </div>
                                        <div className="inf-sect-lbl">STARTING PRICE</div>
                                    </div>
                                </li>
                                <li>
                                    <img src="/img/offplan/plan.svg" alt="" />
                                    <div className="inf-sect">
                                        <div className="inf-sect-valu">{paymentPlanTitle}</div>
                                        <div className="inf-sect-lbl">PAYMENT PLAN</div>
                                    </div>
                                </li>
                                <li>
                                    <img src="/img/offplan/key.svg" alt="" />
                                    <div className="inf-sect">
                                        <div className="inf-sect-valu">{handover || '-'}</div>
                                        <div className="inf-sect-lbl">HANDOVER</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="reg-info">
                            {/* Pass the whole regulatoryInfo object */}
                            <RegulatorySection regulatoryInfo={regulatoryInfo} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSection;
