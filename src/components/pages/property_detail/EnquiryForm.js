import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, PROJECT_NAME } from '@/Constants';
import SuccessMessage from '../SuccessMessage';
import EnquireSection from './EnquireSection';
const EnquiryForm = ({ ad_id_number, property }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isStickyBottom, setIsStickyBottom] = useState(false);
    const [successNotification, setSuccessNotification] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ph: '',
        ad_id: ad_id_number.toString(), // Convert ad_id to string
        message: 'Hello I found your property on  ' + PROJECT_NAME + ' Please send me more information about this property: Thank you',
    });
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
    const handleScroll = () => {
        const footer = document.getElementById('foot');
        const formElement = document.querySelector('.main-enquiry-form'); // Replace with your form's class or ID
        if (footer && formElement) {
            const footerPosition = footer.offsetTop;
            const formBottomPosition = formElement.getBoundingClientRect().bottom + window.scrollY - 200;
            if (window.scrollY + window.innerHeight >= (footerPosition + 100)) {
                // If the scroll position is close to the footer, stop the sticky behavior
                setIsSticky(false);
            }
            else if (window.scrollY > 50 && formBottomPosition < (footerPosition)) {
                // Keep the form sticky when not near the footer
                if (window.scrollY > 1500) {
                    setIsStickyBottom(true);
                }
                else {
                    setIsStickyBottom(false);
                }
                setIsSticky(true);
            }
            else {
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
    const [errors, setErrors] = useState({}); // For form validation
    const validateForm = () => {
        const formErrors = {};
        if (!formData.name.trim())
            formErrors.name = 'Name is required';
        if (!formData.email.trim())
            formErrors.email = 'Email is required';
        if (!formData.ph.trim())
            formErrors.ph = 'Phone is required';
        if (!formData.ad_id)
            formErrors.ad_id = 'AD ID is required';
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
    return (_jsx("form", { className: `sticky1 ${isSticky ? (isStickyBottom ? 'active active-bottom ' : 'active') : ''}  pure-form pure-form-aligned main-enquiry-form`, onSubmit: handleSubmit, children: _jsxs("fieldset", { className: "d-block", children: [_jsxs("legend", { children: [_jsxs("div", { className: "enquiry-head", children: [_jsx("div", { className: "img-sect-team", children: _jsxs("a", { href: "#", children: [" ", _jsx("img", { src: property.agent_image })] }) }), _jsx("div", { className: "more-details", children: _jsxs("div", { className: "detail-sect-team", children: [_jsx("div", { className: "h1", children: _jsx("a", { href: "#", children: property.agent_name }) }), _jsx("h3", { children: property.designation }), _jsxs("p", { className: "language-know", children: ["Agent BRN: ", _jsx("span", { children: property.brn })] }), _jsxs("p", { className: "language-know", children: ["Email: ", _jsx("span", { children: _jsx("a", { href: "mailto:rose@kayeandco.ae", children: property.agent_email }) })] })] }) })] }), _jsx("div", { className: "featured-title-hold text-center clearfix", children: _jsx("h3", { className: "site-h1 animate mt-3 mb-3", children: _jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Send Enquiry" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }) }) }), _jsx(EnquireSection, { property: property })] }), _jsxs("div", { className: "division", children: [responseMessage && _jsx("p", { children: responseMessage }), successNotification &&
                            (_jsx(SuccessMessage, { responseMessage: successNotification })), _jsx("input", { type: "hidden", name: "ad_id", value: formData.ad_id }), _jsxs("div", { className: "pure-control-group form-icon form-icon-person", children: [_jsx("input", { className: "pure-input-1", placeholder: "Name", name: "name", type: "text", value: formData.name, onChange: handleInputChange }), errors.name && _jsx("div", { className: "errorMessage", children: errors.name })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mail", children: [_jsx("input", { className: "pure-input-1", placeholder: "Email", name: "email", type: "text", value: formData.email, onChange: handleInputChange }), errors.email && _jsx("div", { className: "errorMessage", children: errors.email })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mobile", children: [_jsx("input", { className: "pure-input-1", placeholder: "Phone", name: "ph", type: "text", value: formData.ph, onChange: handleInputChange }), errors.ph && _jsx("div", { className: "errorMessage", children: errors.ph })] })] }), _jsxs("div", { className: "division", children: [_jsxs("div", { className: "pure-control-group hide d-none", children: [_jsx("textarea", { className: "pure-input-1", placeholder: "Message", name: "message", value: formData.message, onChange: handleInputChange }), errors.message && _jsx("div", { className: "errorMessage", children: errors.message })] }), _jsx("div", { className: "pure-control-group", children: _jsx("button", { className: "button button-primary", type: "submit", children: loading ? 'Processing...' : _jsxs(_Fragment, { children: [_jsx("span", { className: "icon-mail-3" }), " Send Enquiry"] }) }) })] })] }) }));
};
export default EnquiryForm;
