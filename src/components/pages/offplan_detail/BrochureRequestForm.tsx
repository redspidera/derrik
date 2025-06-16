import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/Constants';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import SuccessMessage from '../SuccessMessage'; 

interface AdProps {
    ad_id_number: number;  // The ad ID for the property
}

const BrochureRequestForm: React.FC<AdProps> = ({ ad_id_number }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ph: '',
        ad_id: ad_id_number.toString(),
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
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

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);

    const handlePhoneChange = (value: string) => {
        formData.ph = value; 
        setPhoneNumber(value);
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
                ad_id: formData.ad_id,
                message: formData.message
            });

            // Make the API request to submit the form
            const response = await axios.get(`${API_URL}brochure_request`, { params });

            if (response.data.status === 'success') {
                setSuccessNotification(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    ph: '',
                    ad_id: ad_id_number.toString(),
                    message: ''
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
        <form className="pure-form pure-form-aligned main-enquiry-form" onSubmit={handleSubmit}>
            <fieldset className="d-block">
                <legend>
                    <div className="featured-title-hold text-center clearfix">
                        <h3 className="site-h1 animate mt-3 mb-3">
                            <div className="line-container-parent">
                                <div className="lines-container flex-end">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                                <h5 className="line-text">Request for Full Brochure</h5>
                                <div className="lines-container">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                            </div>
                        </h3>
                    </div>
                </legend>
                <div className="division">
                    {responseMessage && <p>{responseMessage}</p>}
                    {successNotification &&
                        (
                            <SuccessMessage responseMessage={successNotification} />

                        )}
                    <input type="hidden" name="ad_id" value={formData.ad_id} />

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
                        <PhoneInput
                            international
                            defaultCountry="AE"
                            className="pure-input-1"
                            name="ph"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            placeholder="Phone"
                        />
                        {errors.ph && <div className="errorMessage">{errors.ph}</div>}
                    </div>
                </div>

                <div className="division">
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

                    <div className="pure-control-group">
                        <button className="button button-primary" type="submit">
                            {loading ? 'Processing...' : <><span className="icon-mail-3"></span> Download Brochure</>}
                        </button>
                    </div>
                </div>
            </fieldset>
        </form>
    );
};

export default BrochureRequestForm;
