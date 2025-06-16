import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import { API_URL } from '@/Constants';
import SuccessMessage from './SuccessMessage';
const Career = () => {
    const handlePhoneChange = (value) => {
        formData.ph = value;
    };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ph: '',
        sect: '', // Convert sect to string
        category: '', // Convert sect to string
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [successNotification, setSuccessNotification] = useState('');
    const [errors, setErrors] = useState({}); // For form validation
    const [options, setOptions] = useState([]); // State to hold the options fetched from the API
    // Fetch data when the component mounts
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API_URL}listing_designation`); // Replace with your API URL
                const data = await response.json();
                setOptions(data); // Assuming the response data is an array of options
            }
            catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSuccessNotification('');
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
        if (!formData.category.trim())
            formErrors.category = 'Designation is required';
        if (!formData.address.trim())
            formErrors.address = 'Cover Letter is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log("ERROR");
            return;
        }
        console.log("WER");
        setLoading(true);
        try {
            const params = new URLSearchParams({
                name: formData.name,
                email: formData.email,
                ph: formData.ph,
                sect: formData.sect, // Ensure sect is a string
                category: formData.category, // Ensure sect is a string
                address: formData.address
            });
            const response = await axios.get(`${API_URL}career`, { params });
            if (response.data.status === 'success') {
                setSuccessNotification(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    ph: '',
                    sect: '', // Reset sect
                    category: '', // Reset sect
                    address: ''
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
    return (_jsx(_Fragment, { children: _jsx("div", { className: "row ", children: _jsx("div", { className: "col-sm-12  ", children: _jsx("div", { className: " ", children: _jsxs("div", { className: "row d-flex", children: [_jsx("div", { className: "col-sm-6 left-list-property", children: _jsx("form", { className: 'pure-form pure-form-aligned main-enquiry-form at-contact-us lis-propert', onSubmit: handleSubmit, children: _jsxs("fieldset", { className: "d-block", children: [_jsx("legend", { children: _jsx("div", { className: "featured-title-hold text-center clearfix", children: _jsx("h3", { className: "site-h1 animate mt-3 mb-3", children: _jsxs("div", { className: "line-container-parent", children: [_jsxs("div", { className: "lines-container flex-end", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] }), _jsx("h5", { className: "line-text", children: "Looking for an Opportunity?" }), _jsxs("div", { className: "lines-container", children: [_jsx("div", { className: "line small-line" }), _jsx("div", { className: "line big-line" })] })] }) }) }) }), _jsxs("div", { className: "division", children: [responseMessage &&
                                                        (_jsx("p", { children: responseMessage })), successNotification &&
                                                        (_jsx(SuccessMessage, { responseMessage: successNotification })), _jsxs("div", { className: "pure-control-group form-icon form-icon-person", children: [_jsx("input", { className: "pure-input-1", placeholder: "Name", name: "name", type: "text", value: formData.name, onChange: handleInputChange }), errors.name && _jsx("div", { className: "errorMessage", children: errors.name })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mail", children: [_jsx("input", { className: "pure-input-1", placeholder: "Email", name: "email", type: "text", value: formData.email, onChange: handleInputChange }), errors.email && _jsx("div", { className: "errorMessage", children: errors.email })] }), _jsxs("div", { className: "pure-control-group form-icon form-icon-mobile", children: [_jsx(PhoneInput, { international: true, defaultCountry: "AE", className: "pure-input-1", name: "ph", value: formData.ph, onChange: handlePhoneChange, placeholder: "Phone" }), errors.ph && _jsx("div", { className: "errorMessage", children: errors.ph })] })] }), _jsxs("div", { className: "division pt0", children: [_jsx("div", { className: "row row-select-category", children: _jsx("div", { className: "col-sm-12", children: _jsxs("div", { className: "pure-control-group form-icon form-icon-mail", children: [_jsxs("select", { className: "pure-input-1", name: "category", value: formData.category, onChange: handleInputChange, children: [_jsx("option", { value: "", children: "Selct Designation" }), options.map((option) => (_jsx("option", { value: option.id, children: option.name }, option.id)))] }), errors.category && _jsx("div", { className: "errorMessage", children: errors.category })] }) }) }), _jsxs("div", { className: "pure-control-group  ", children: [_jsx("textarea", { className: "pure-input-1", placeholder: "Cover Letter", name: "address", value: formData.address, onChange: handleInputChange }), errors.address && _jsx("div", { className: "errorMessage", children: errors.address })] }), _jsx("div", { className: "pure-control-group", children: _jsx("button", { className: "button button-primary", type: "submit", children: loading ? 'Processing...' : _jsxs(_Fragment, { children: [_jsx("span", { className: "icon-mail-3" }), " Submit  Details"] }) }) })] })] }) }) }), _jsx("div", { className: "col-sm-6 right-list-property carre-frm" })] }) }) }) }) }));
};
export default Career;
