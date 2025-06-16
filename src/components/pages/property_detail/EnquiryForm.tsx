import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, PROJECT_NAME } from '@/Constants';
import SuccessMessage from '../SuccessMessage';
import EnquireSection from './EnquireSection';
import {PropertyData} from './PropertyDetailTemplate'


interface adProps {
    ad_id_number: number; // The ad ID for the property
    property: PropertyData;
}
 
type FormDataType = {
    name: string;
    email: string;
    ph: string;
    ad_id: string; // Convert to string for URLSearchParams compatibility
    message: string;
};

const EnquiryForm: React.FC<adProps> = ({ ad_id_number, property }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isStickyBottom, setIsStickyBottom] = useState(false);
    const [successNotification, setSuccessNotification] = useState('');
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: '',
        ph: '',
        ad_id: ad_id_number.toString(), // Convert ad_id to string
        message: 'Hello I found your property on  ' + PROJECT_NAME +' Please send me more information about this property: Thank you',
    });
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
    const handleScroll = () => {
        const footer = document.getElementById('foot');
        const formElement = document.querySelector('.main-enquiry-form'); // Replace with your form's class or ID

        if (footer && formElement) {
            const footerPosition = (footer as HTMLElement).offsetTop;
            const formBottomPosition = (formElement as HTMLElement).getBoundingClientRect().bottom + window.scrollY - 200;

            if (window.scrollY + window.innerHeight >= (footerPosition + 100 )) {
                // If the scroll position is close to the footer, stop the sticky behavior
                setIsSticky(false);
            } else if (window.scrollY > 50 && formBottomPosition < (footerPosition )) {
                // Keep the form sticky when not near the footer
                
                if ( window.scrollY  > 1500){
                       setIsStickyBottom(true);
                }else{
                    setIsStickyBottom(false);
                }
                setIsSticky(true);
            } else {
                // Remove sticky class when less than 50px
                setIsSticky(false);
            }
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Cleanup scroll event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({}); // For form validation

   

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

            const response = await axios.get(`${API_URL}send_enquiry`, { params });

            if (response.data.status === 'success') {
                setSuccessNotification(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    ph: '',
                    ad_id: ad_id_number.toString(), // Reset ad_id
                    message: 'Hello I found your property  . Please send me more information about this property : Thank you'
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
        <form  
            className={`sticky1 ${isSticky ? (isStickyBottom ? 'active active-bottom ' : 'active') : '' }  pure-form pure-form-aligned main-enquiry-form`}

         onSubmit={handleSubmit}>
            <fieldset className="d-block">
                <legend>
                    <div className="enquiry-head">
                        <div className="img-sect-team"><a href="#"> <img src={property.agent_image} /></a></div>
                         <div className="more-details">
                            <div className="detail-sect-team">
                                <div className="h1">
                                    <a href="#">{property.agent_name}</a>
                                </div>
                                <h3>{property.designation}</h3>
                                <p className="language-know">
                                    Agent BRN: <span>{property.brn}</span>
                                </p>
                              
                                <p className="language-know">
                                    Email: <span><a href={`mailto:${property.agent_email}`}>{property.agent_email}</a></span>
                                </p>
                            </div>
                         </div>
                    </div>
                    <div className="featured-title-hold text-center clearfix">
                        <h3 className="site-h1 animate mt-3 mb-3">
                            <div className="line-container-parent">
                                <div className="lines-container flex-end">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                                <h5 className="line-text">Send Enquiry</h5>
                                <div className="lines-container">
                                    <div className="line small-line"></div>
                                    <div className="line big-line"></div>
                                </div>
                            </div>
                         </h3>
                    </div>
                    <EnquireSection property={property}/>
                   
                </legend>
                <div className="division">
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
                            {loading ? 'Processing...' : <><span className="icon-mail-3"></span> Send Enquiry</>}
                        </button>
                    </div>
                  
                </div>
            </fieldset>
        </form>
    );
};

export default EnquiryForm;
