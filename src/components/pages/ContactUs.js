import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { API_URL, CONTACT_PHONE, CONTACT_EMAIL, CONTACT_ADDRESS } from '@/Constants';
import SuccessMessage from './SuccessMessage';
const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ph: '',
        city: '', // Convert city to string
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [successNotification, setSuccessNotification] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState({}); // For form validation
    const handleInputChange = (e) => {
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
        const formErrors = {};
        if (!formData.name.trim())
            formErrors.name = 'Name is required';
        if (!formData.email.trim())
            formErrors.email = 'Email is required';
        if (!formData.ph.trim())
            formErrors.ph = 'Phone is required';
        if (!formData.message.trim())
            formErrors.message = 'Message is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const handleSubmit = async (e) => {
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
            }
            else {
                setResponseMessage('There was an error with your submission.');
                if (response.data.errors) {
                    setErrors(response.data.errors);
                }
            }
        }
        catch (error) {
            setResponseMessage('Network error occurred. Please try again later.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: "row", children: _jsxs("div", { className: "col-sm-12 iframe-background-parent", children: [_jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48574.00353075615!2d55.240881514569054!3d25.193629391683512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69cdeba28e23%3A0xfbd9d0776d4ff574!2sKAYE%20%26%20CO%20REAL%20ESTATE%20L.L.C.!5e0!3m2!1sen!2sin!4v1677483023307!5m2!1sen!2sin", width: "100%", height: "600", style: { border: 0, filter: 'grayscale(100%)' }, allowFullScreen: true, className: "iframe-background", loading: "lazy" }), _jsx("div", { className: "iframe-background-content", children: _jsx("form", { className: 'pure-form pure-form-aligned main-enquiry-form at-contact-us', onSubmit: handleSubmit, children: _jsxs("fieldset", { className: "d-block", children: [_jsx("legend", { children: _jsx("div", { className: "featured-title-hold text-center clearfix", children: _jsx("h3", { className: "site-h1 animate mt-3 mb-3", children: _jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Write to Us" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }) }) }) }), _jsxs("div", { className: "division", children: [responseMessage && _jsx("p", { children: responseMessage }), successNotification &&
                                                (_jsx(SuccessMessage, { responseMessage: successNotification })), _jsx("input", { type: "hidden", name: "city", value: formData.city }), _jsxs("div", { className: "pure-control-group form-icon form-icon-person", children: [_jsx("input", { className: "pure-input-1", placeholder: "Name", name: "name", type: "text", value: formData.name, onChange: handleInputChange }), errors.name && _jsx("div", { className: "errorMessage", children: errors.name })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mail", children: [_jsx("input", { className: "pure-input-1", placeholder: "Email", name: "email", type: "text", value: formData.email, onChange: handleInputChange }), errors.email && _jsx("div", { className: "errorMessage", children: errors.email })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mobile", children: [_jsx("input", { className: "pure-input-1", placeholder: "Phone", name: "ph", type: "text", value: formData.ph, onChange: handleInputChange }), errors.ph && _jsx("div", { className: "errorMessage", children: errors.ph })] })] }), _jsxs("div", { className: "division", children: [_jsxs("div", { className: "pure-control-group  ", children: [_jsx("textarea", { className: "pure-input-1", placeholder: "Message", name: "message", value: formData.message, onChange: handleInputChange }), errors.message && _jsx("div", { className: "errorMessage", children: errors.message })] }), _jsx("div", { className: "pure-control-group", children: _jsx("button", { className: "button button-primary", type: "submit", children: loading ? 'Processing...' : _jsxs(_Fragment, { children: [_jsx("span", { className: "icon-mail-3" }), " Send Message"] }) }) })] })] }) }) }), _jsxs("ul", { className: "info-div-contact", children: [_jsxs("li", { className: "clts-1", children: [_jsxs("a", { href: `tel:${CONTACT_PHONE}`, className: "li-bd", children: [_jsx("img", { src: "/img/contact-call.png", alt: "", className: "" }), CONTACT_PHONE] }), _jsxs("a", { href: `mailto:${CONTACT_EMAIL}`, className: "li-bd", children: [_jsx("img", { src: "/img/contact-email.png", alt: "", className: "" }), CONTACT_EMAIL] })] }), _jsx("li", { children: _jsxs("address", { className: "li-bd", children: [_jsx("img", { src: "/img/contact-location.png", alt: "", className: "" }), " ", CONTACT_ADDRESS] }) })] })] }) }) }));
};
export default ContactUs;
