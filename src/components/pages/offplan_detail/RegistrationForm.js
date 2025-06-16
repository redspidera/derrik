import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import axios from 'axios';
import { SITE_URL, API_URL } from '@/Constants';
import SuccessMessage from "../SuccessMessage";
const RegistrationForm = ({ property }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ph: '',
        ad_id: property.ad_id.toString(), // Convert ad_id to string
        message: `I found this project ${property?.adTitle} on ${SITE_URL}. Please contact me. Thank you.`,
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState({}); // For form validation
    const [successNotification, setSuccessNotification] = useState('');
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
    return (_jsx("div", { id: "img", className: "register_form_container", children: _jsx("div", { className: "align-frm", children: _jsx("div", { className: "align-frm-inner", children: _jsxs("div", { className: "register_form no-label fullwidthforms hidden-message", children: [_jsx("h6", { children: "Register your interest" }), _jsxs("form", { onSubmit: handleSubmit, className: "form bottom_leadContact leadContact phs", children: [responseMessage && _jsx("p", { children: responseMessage }), successNotification &&
                                    (_jsx(SuccessMessage, { responseMessage: successNotification })), _jsx("input", { type: "hidden", name: "ad_id", value: formData.ad_id }), _jsxs("div", { className: "pure-control-group form-icon form-icon-person", children: [_jsx("input", { className: "pure-input-1", placeholder: "Name", name: "name", type: "text", value: formData.name, onChange: handleInputChange }), errors.name && _jsx("div", { className: "errorMessage", children: errors.name })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mail", children: [_jsx("input", { className: "pure-input-1", placeholder: "Email", name: "email", type: "text", value: formData.email, onChange: handleInputChange }), errors.email && _jsx("div", { className: "errorMessage", children: errors.email })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mobile", children: [_jsx("input", { className: "pure-input-1", placeholder: "Phone", name: "ph", type: "text", value: formData.ph, onChange: handleInputChange }), errors.ph && _jsx("div", { className: "errorMessage", children: errors.ph })] }), _jsxs("div", { className: "pure-control-group hide d-none", children: [_jsx("textarea", { className: "pure-input-1", placeholder: "Message", name: "message", value: formData.message, onChange: handleInputChange }), errors.message && _jsx("div", { className: "errorMessage", children: errors.message })] }), _jsx("button", { type: "submit", className: "primary_btn hover-pbg mt0", disabled: loading, children: loading ? "please wait.." : "Submit" }), _jsxs("p", { className: "terms-privacy", children: ["By clicking Submit, you agree to our ", _jsx("a", { href: "#nogo", children: "Terms" }), " & ", _jsx("a", { href: "#nogo", children: "Privacy Policy." })] })] }), _jsxs("div", { className: "offplan-card-agent pb0", children: [_jsxs("div", { className: "agent_name_img", children: [_jsx("img", { src: property?.agent_logo ? property.agent_logo : "assets/img/user.png", alt: "Agent" }), _jsx("h6", { className: "agent-contact", children: property?.agent_name })] }), _jsx("div", { className: "mail_agent", children: _jsxs("div", { className: "agent_contact-offplan", children: [_jsxs("a", { target: "_blank", rel: "noopener noreferrer", href: `https://wa.me/${property?.mobile_number}?text=I would like to inquire about your project - ${property?.ReferenceNumberTitle}. Please contact me at your earliest convenience. %0aProperty Link %0a${encodeURIComponent(property?.detailUrlAbsolute)}`, children: [_jsx("img", { src: "/img/whats.svg", alt: "", className: "" }), _jsx("span", { className: "social_name text-social", children: "WhatsApp" })] }), _jsxs("a", { href: `tel:${property?.mobile_number}`, className: "phone", children: [_jsx("img", { src: "/img/call.svg", alt: "", className: "" }), _jsx("span", { className: "social_name", children: "Phone" })] })] }) })] })] }) }) }) }));
};
export default RegistrationForm;
