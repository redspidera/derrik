import DownloadRequestForm from "./DownloadRequestForm";
 interface DownloadModalProps {
  adId:  number;
  modalTitle: string; 
  modalFieldId: string | number; 
  isVisible: boolean; 
  onClose: () => void; 
}

const DownloadModal: React.FC<DownloadModalProps> = ({ adId, modalTitle, modalFieldId,  isVisible, onClose }) => {

  

  return (
    <div className={`modal fade ${isVisible ? 'in' : ''}`} id="downloadModal" tabIndex={-1} role="dialog" aria-labelledby="downloadModalLabel" aria-hidden={!isVisible} style={{ display: isVisible ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="downloadModalLabel">{modalTitle}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <img src="/img/close.png" alt="" />
            </button>
          </div>
          <div className="modal-body">
                      <DownloadRequestForm ad_id_number={adId} f_type={modalFieldId.toString()} heading={modalTitle} />
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;