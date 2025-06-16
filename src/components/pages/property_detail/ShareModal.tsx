import ShareComponent from "../offplan_detail/ShareComponent.tsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    ad_id: string;
    detailUrlAbsolute: string;
    adTitle: string;
  };
}

const ShareModal = ({ isOpen, onClose, property }: ModalProps) => {
  if (!isOpen) return null; // Only render when open

  return (
    <div className="modal show" tabIndex={-1} role="dialog" id="sharemodal" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={onClose}
            >
              <img src="/img/close.png" alt="Close" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <div className="main_title_3">
              <span></span>
              <h2>
                Share this <span className="d-block">listing</span>
              </h2>

              <ShareComponent
                key={`ShareComponent1-${property.ad_id}`}
                url={property.detailUrlAbsolute}
                adTitle={property.adTitle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
