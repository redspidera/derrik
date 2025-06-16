import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/Constants';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import SuccessMessage from '../SuccessMessage';
const BrochureRequestForm = ({ ad_id_number }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ph: '',
        ad_id: ad_id_number.toString(),
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState({});
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
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const handlePhoneChange = (value) => {
        formData.ph = value;
        setPhoneNumber(value);
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
    return (_jsx("form", { className: "pure-form pure-form-aligned main-enquiry-form", onSubmit: handleSubmit, children: _jsxs("fieldset", { className: "d-block", children: [_jsx("legend", { children: _jsx("div", { className: "featured-title-hold text-center clearfix", children: _jsx("h3", { className: "site-h1 animate mt-3 mb-3", children: _jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Request for Full Brochure" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }) }) }) }), _jsxs("div", { className: "division", children: [responseMessage && _jsx("p", { children: responseMessage }), successNotification &&
                            (_jsx(SuccessMessage, { responseMessage: successNotification })), _jsx("input", { type: "hidden", name: "ad_id", value: formData.ad_id }), _jsxs("div", { className: "pure-control-group form-icon form-icon-person", children: [_jsx("input", { className: "pure-input-1", placeholder: "Name", name: "name", type: "text", value: formData.name, onChange: handleInputChange }), errors.name && _jsx("div", { className: "errorMessage", children: errors.name })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mail", children: [_jsx("input", { className: "pure-input-1", placeholder: "Email", name: "email", type: "text", value: formData.email, onChange: handleInputChange }), errors.email && _jsx("div", { className: "errorMessage", children: errors.email })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mobile", children: [_jsx(PhoneInput, { international: true, defaultCountry: "AE", className: "pure-input-1", name: "ph", value: phoneNumber, onChange: handlePhoneChange, placeholder: "Phone" }), errors.ph && _jsx("div", { className: "errorMessage", children: errors.ph })] })] }), _jsxs("div", { className: "division", children: [_jsxs("div", { className: "pure-control-group hide d-none", children: [_jsx("textarea", { className: "pure-input-1", placeholder: "Message", name: "message", value: formData.message, onChange: handleInputChange }), errors.message && _jsx("div", { className: "errorMessage", children: errors.message })] }), _jsx("div", { className: "pure-control-group", children: _jsx("button", { className: "button button-primary", type: "submit", children: loading ? 'Processing...' : _jsxs(_Fragment, { children: [_jsx("span", { className: "icon-mail-3" }), " Download Brochure"] }) }) })] })] }) }));
};
export default BrochureRequestForm;
