import React, { useState } from "react";
import axios from 'axios';
import { SITE_URL, API_URL } from '@/Constants'
import { PropertyData} from '@/components/pages/offplan_detail/OffplanDetailTemplate';
import SuccessMessage from "../SuccessMessage";
interface adProps {
      
    property: PropertyData;
}

type FormDataType = {
    name: string;
    email: string;
    ph: string;
    ad_id: string; // Convert to string for URLSearchParams compatibility
    message: string;
};

const RegistrationForm: React.FC<adProps> = ({   property }) => {
    
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: '',
        ph: '',
        ad_id: property.ad_id.toString(), // Convert ad_id to string
        message: `I found this project ${property?.adTitle} on ${SITE_URL}. Please contact me. Thank you.`,
    });
     
   

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({}); // For form validation
    const [successNotification, setSuccessNotification] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setSuccessNotification('');
              const { name, value } = e.target;
              setFormData((prevData) => ({
                  ...prevData,
                  [name]: value,
              }));
              setErrors((prevErrors) => ({
                  ...prevErrors,
                  [name]: '', // Set the error for the specific field to an empty string
              }));
          };
    const validateForm = () => {
        const formErrors: Record<string, string> = {};
        if (!formData.name.trim()) formErrors.name = 'Name is required';
        if (!formData.email.trim()) formErrors.email = 'Email is required';
        if (!formData.ph.trim()) formErrors.ph = 'Phone is required';
        if (!formData.ad_id) formErrors.ad_id = 'AD ID is required';
        if (!formData.message.trim()) formErrors.message = 'Message is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const params = new URLSearchParams({
                name: formData.name,
                email: formData.email,
                ph: formData.ph,
                ad_id: formData.ad_id, // Ensure ad_id is a string
                message: formData.message
            });

            const response = await axios.get(`${API_URL}registration_interest`, { params });

            if (response.data.status === 'success') {
                setSuccessNotification(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    ph: '',
                    ad_id: property.ad_id.toString(), // Reset ad_id
                    message: `I found this project ${property?.adTitle} on ${SITE_URL}. Please contact me. Thank you.`
                });
            } else {
                setResponseMessage('There was an error with your submission.');
                if (response.data.errors) {
                    setErrors(response.data.errors);
                }
            }
        } catch (error) {
            setResponseMessage('Network error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };


  return (
    <div id="img" className="register_form_container">
      <div className="align-frm">
        <div className="align-frm-inner">

          <div className="register_form no-label fullwidthforms hidden-message">
            <h6>Register your interest</h6>
            <form onSubmit={handleSubmit} className="form bottom_leadContact leadContact phs">
              {responseMessage && <p>{responseMessage}</p>}
              {successNotification &&
                (
                  <SuccessMessage responseMessage={successNotification} />

                )}
              <input
                type="hidden"
                name="ad_id"
                value={formData.ad_id}
              />

              <div className="pure-control-group form-icon form-icon-person">
                <input
                  className="pure-input-1"
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <div className="errorMessage">{errors.name}</div>}
              </div>
              <div className="pure-control-group form-icon form-icon-mail">
                <input
                  className="pure-input-1"
                  placeholder="Email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <div className="errorMessage">{errors.email}</div>}
              </div>
              <div className="pure-control-group form-icon form-icon-mobile">
                <input
                  className="pure-input-1"
                  placeholder="Phone"
                  name="ph"
                  type="text"
                  value={formData.ph}
                  onChange={handleInputChange}
                />
                {errors.ph && <div className="errorMessage">{errors.ph}</div>}
              </div>

              <div className="pure-control-group hide d-none">
                <textarea
                  className="pure-input-1"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                {errors.message && <div className="errorMessage">{errors.message}</div>}
              </div>



              <button type="submit" className="primary_btn hover-pbg mt0" disabled={loading}>
                {loading ? "please wait.." : "Submit"}
              </button>
              <p className="terms-privacy">
                By clicking Submit, you agree to our <a href="#nogo">Terms</a> &amp; <a href="#nogo">Privacy Policy.</a>
              </p>
            </form>

            <div className="offplan-card-agent pb0">
              <div className="agent_name_img">
                <img
                  src={property?.agent_logo ? property.agent_logo : "assets/img/user.png"}
                  alt="Agent"
                />
                <h6 className="agent-contact">{property?.agent_name}</h6>
              </div>
              <div className="mail_agent">
                <div className="agent_contact-offplan">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${property?.mobile_number}?text=I would like to inquire about your project - ${property?.ReferenceNumberTitle}. Please contact me at your earliest convenience. %0aProperty Link %0a${encodeURIComponent(property?.detailUrlAbsolute)}`}
                  >
                    <img src="/img/whats.svg" alt="" className="" />
                    <span className="social_name text-social">WhatsApp</span>
                  </a>
                  <a href={`tel:${property?.mobile_number}`} className="phone">
                    <img src="/img/call.svg" alt="" className="" />
                    <span className="social_name">Phone</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
