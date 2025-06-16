import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/Constants';
import SuccessMessage from './SuccessMessage';



type FormDataType = {
    name: string;
    email: string;
    ph: string;
    city: string; // Convert to string for URLSearchParams compatibility
    message: string;
};
interface Properties {
    phone: string;
    email: string;
    headerTitle: string;
    sub_title: string;
    admin_email: string;
    address: string;
    opening: string;
    alt_phone: string;
    telephone: string;
    alt_telephone: string;
    banner: string;
    content: string | null;
}
interface FooterProps {
    apiUrl: string;
}
const GetiInTouch = ({ apiUrl }: FooterProps) => {
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: '',
        ph: '',
        city: '', // Convert city to string
        message: '',
    });

    const [properties, setProperties] = useState<Properties | null>(null);

    const [loading, setLoading] = useState(false);

    const [successNotification, setSuccessNotification] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({}); // For form validation
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setProperties(data); // Assuming the data is in the expected format

            } catch (error) {
                console.error("Error fetching properties:", error);

            }
        };

        fetchProperties();
    }, [apiUrl]);
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
                city: formData.city, // Ensure city is a string
                message: formData.message
            });

            const response = await axios.get(`${API_URL}send_contact`, { params });

            if (response.data.status === 'success') {
                setSuccessNotification(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    ph: '',
                    city: '', // Reset city
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
        <>
            <div className="row">
                 
                <section className="frm-cnt1">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 contact-us-0 ">
                                {properties?.content ? (
                                    <div dangerouslySetInnerHTML={{ __html: properties.content }} />
                                ) : (
                                    <p> </p>  // You can provide a fallback message or an empty div if preferred
                                )}
                            </div>
                            <div className="col-sm-7 contact-fid">
                                <form
                                    className='pure-form pure-form-aligned main-enquiry-form at-contact-us'

                                    onSubmit={handleSubmit}>
                                    <fieldset className="d-block">
                                        <legend>

                                            <div className="featured-title-hold text-center clearfix">

                                            </div>


                                        </legend>
                                        <div className="division">
                                            {responseMessage && <p>{responseMessage}</p>}
                                            {successNotification &&
                                                (
                                                    <SuccessMessage responseMessage={successNotification} />

                                                )}


                                            <div className="row padd-frm d-flex">
                                                <div className="col-sm-6">
                                                    <div className="pure-control-group form-icon form-icon-person">
                                                        <label htmlFor="">Full Name</label>
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
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="pure-control-group form-icon form-icon-mail">
                                                        <label htmlFor="">Email Address</label>
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
                                                </div>
                                            </div>

                                            <div className="row padd-frm d-flex">
                                                <div className="col-sm-6">
                                                    <div className="pure-control-group form-icon form-icon-mobile">
                                                        <label htmlFor="">Phone Number</label>
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
                                                <div className="col-sm-6">
                                                    <div className="pure-control-group form-icon form-icon-mobile">
                                                        <label htmlFor="">Community/City</label>
                                                        <input
                                                            className="pure-input-1"
                                                            placeholder="Community/City"
                                                            name="city"
                                                            type="text"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                        />
                                                        {errors.ph && <div className="errorMessage">{errors.city}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row padd-frm d-flex">
                                            <div className="col-sm-12">
                                                <div className="division">
                                                    <div className="pure-control-group  ">
                                                        <label htmlFor="">Short Description</label>
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
                                                            {loading ? 'Processing...' : <><span className="icon-mail-3"></span> Send Message</>}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                 
            </div>

        </>
    );
};

export default GetiInTouch;
