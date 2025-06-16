interface RegulatoryInfo {
    pNumbers: string;
    rera: string;
    ded: string;
    brn: string;
    qr: string;
}

interface Props {
    regulatoryInfo: RegulatoryInfo;
}

const RegulatorySection: React.FC<Props> = ({ regulatoryInfo }) => {
   
    const { pNumbers, rera, ded, brn, qr } = regulatoryInfo;
    // Filter out empty values from regulatoryInfo
  
    return (
        <div className="qrcode">
            <div className="dld-qr1">
                {qr && (
                    <a target="_blank" rel="noopener noreferrer">
                        <img
                            alt="Dubai Land Department validation qr code"
                            src={`${qr}`}
                            style={{ width: 120 }}
                        />
                    </a>
                )}
            </div>

            <div className="title1">
                <p>
                    This Listing has been verified by
                    <br />
                    <b>Dubai Land Department.</b>
                </p>

                <ul className="row">
                    {rera && (
                        <li key={rera}>
                            <label className="reg-info-label">
                                RERA
                            </label>
                            <span>{rera}</span>
                        </li>
                    )}
                    {pNumbers && (
                        <li key={pNumbers}>
                            <label className="reg-info-label">
                                Permit Number
                            </label>
                            <span>{pNumbers}</span>
                        </li>
                    )}
                    {ded && (
                        <li key={ded}>
                            <label className="reg-info-label">
                                DED
                            </label>
                            <span>{ded}</span>
                        </li>
                    )}
                    {brn && (
                        <li key={brn}>
                            <label className="reg-info-label">
                                werwer
                            </label>
                            <span>{brn}</span>
                        </li>
                    )}


                </ul>
            </div>
        </div>
    );
};

export default RegulatorySection;
