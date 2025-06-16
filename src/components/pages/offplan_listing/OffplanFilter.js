import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { API_URL } from '@/Constants';
const PropertyFilter = ({ formData, handleInputChange, handleSubmit, setFormData }) => {
    const [yearList, setYearList] = useState({});
    const [propertyTypes, setPropertyTypes] = useState({});
    const [develoerNames, setdeveloerNames] = useState({});
    const hasFetchedoffplan = useRef(false);
    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!hasFetchedoffplan.current) {
                try {
                    hasFetchedoffplan.current = true;
                    const response = await fetch(API_URL + 'form_offplan_values');
                    const data = await response.json();
                    let propertyTypesObject = {};
                    let developerObject = {};
                    propertyTypesObject = data.propertyTypes;
                    developerObject = data.developers;
                    setYearList(data?.years || {});
                    setPropertyTypes(propertyTypesObject);
                    setdeveloerNames(developerObject);
                }
                catch (error) {
                    console.error('Error fetching property data:', error);
                }
            }
        };
        fetchPropertyData();
    }, []);
    /**
     * Resets the form data to its initial state.
     */
    const handleReset = () => {
        setFormData(() => {
            const resetFormData = {
                propertyType: '',
                community: '',
                developer: '',
                year: '',
            };
            // Update URL to reflect reset formData
            const params = new URLSearchParams({});
            const basePath = window.location.pathname;
            const newUrl = `${basePath}?${params.toString()}`;
            window.history.pushState({}, '', newUrl);
            return resetFormData;
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "property-search-form", id: "frmId", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "sectorType", children: "Community" }), _jsx("input", { type: "text", name: "community", id: "community", value: formData.community, onChange: handleInputChange, className: "form-control" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "propertyType", children: "Property Type" }), _jsxs("select", { name: "propertyType", id: "propertyType", value: formData.propertyType, onChange: handleInputChange, className: "form-control", children: [_jsx("option", { value: "", children: "Select Type" }), Object.keys(propertyTypes).length > 0 ? (Object.entries(propertyTypes).map(([typeKey, typeValue]) => (_jsx("option", { value: typeKey, children: typeValue }, typeKey)))) : (_jsx("option", { value: "" }))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "propertyType", children: "Developers" }), _jsxs("select", { name: "developer", id: "developer", value: formData.developer, onChange: handleInputChange, className: "form-control", children: [_jsx("option", { value: "", children: "Select Developer" }), Object.keys(develoerNames).length > 0 ? (Object.entries(develoerNames).map(([typeKey, typeValue]) => (_jsx("option", { value: typeKey, children: typeValue }, typeKey)))) : (_jsx("option", { value: "" }))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "year", children: "Completion Year" }), _jsxs("select", { name: "year", id: "year", value: formData.year, onChange: handleInputChange, className: "form-control", children: [_jsx("option", { value: "", children: "Completion Year" }), Object.entries(yearList).map(([key, label]) => (_jsx("option", { value: key, children: label }, key)))] })] }), _jsxs("div", { className: "form-group ", children: [_jsx("label", { htmlFor: "", className: "", children: "\u00A0" }), _jsxs("div", { className: "d-flex justify-content-between gap-3", children: [_jsx("button", { type: "submit", className: "btn btn-primary btn-submit", children: "Search" }), _jsx("button", { type: "button", style: { opacity: 0.6 }, onClick: handleReset, className: "btn btn-default btn-reset", children: "Reset" })] })] })] }));
};
export default PropertyFilter;
