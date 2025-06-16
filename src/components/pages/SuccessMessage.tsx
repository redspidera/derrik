interface SuccessMessageProps {
  responseMessage: string; // The message to be displayed
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ responseMessage }) => {
  return (
      <div className="success-message">
          <img src="/img/verified.gif" alt="Success Icon" className="success-icon" />

          <div className="message-content">
              <h2>Success!</h2>
              <p>{responseMessage}</p>
          </div>
      </div>
  );
};
export default SuccessMessage;