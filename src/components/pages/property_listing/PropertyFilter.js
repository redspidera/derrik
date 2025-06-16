import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { API_URL } from '@/Constants';
const PropertyFilter = ({ formData, handleInputChange, handleSubmit, setFormData }) => {
    const [propertyTypes, setPropertyTypes] = useState({});
    const [minBeds, setMinBeds] = useState({});
    const [minPrice, setMinPrice] = useState([]);
    const [maxPrice, setMaxPrice] = useState([]);
    const [dataValues, setDataValues] = useState([]);
    const hasFetchedProperty = useRef(false);
    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                let data_load;
                if (!hasFetchedProperty.current) {
                    hasFetchedProperty.current = true;
                    const response = await fetch(API_URL + 'form_values');
                    const data = await response.json();
                    data_load = data;
                    setDataValues(data);
                    console.log('Fetched Data:', data); // Log the data to check structure
                }
                else {
                    data_load = dataValues;
                }
                let propertyTypesObject = {};
                hasFetchedProperty.current = true;
                if (formData.listingType === 'commercial' && data_load.propertyTypes?.commercial) {
                    propertyTypesObject = data_load.propertyTypes.commercial;
                }
                else if (formData.listingType === 'residential' && data_load.propertyTypes?.residential) {
                    propertyTypesObject = data_load.propertyTypes.residential;
                }
                setPropertyTypes(propertyTypesObject);
                setMinBeds(data_load?.minBeds || {});
                if (formData.sectorType === 'for-sale' && data_load?.minPrice?.forsale) {
                    setMinPrice(Object.keys(data_load.minPrice.forsale).map(Number));
                    setMaxPrice(Object.keys(data_load.maxPrice.forsale).map(Number));
                }
                else if (formData.sectorType === 'for-rent' && data_load?.minPrice?.rentprice) {
                    setMinPrice(Object.keys(data_load.minPrice.rentprice).map(Number));
                    setMaxPrice(Object.keys(data_load.maxPrice.rentprice).map(Number));
                }
            }
            catch (error) {
                console.error('Error fetching property data:', error);
            }
        };
        fetchPropertyData();
    }, [formData.listingType, formData.sectorType]);
    /**
     * Resets the form data to its initial state.
     */
    const handleReset = () => {
        setFormData((prevData) => {
            const resetFormData = {
                sectorType: prevData.sectorType, // Retain sectorType
                propertyType: '',
                listingType: '',
                minPrice: 0,
                maxPrice: 0,
                bedrooms: '',
            };
            // Update URL to reflect reset formData
            const params = new URLSearchParams({});
            const basePath = resetFormData.sectorType === 'for-sale' ? '/for-sale' : '/for-rent';
            const newUrl = `${basePath}?${params.toString()}`;
            window.history.pushState({}, '', newUrl);
            return resetFormData;
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "property-search-form", id: "frmId", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "sectorType", children: "Sector Type" }), _jsxs("select", { name: "sectorType", id: "sectorType", value: formData.sectorType, onChange: handleInputChange, className: "form-control", children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "for-sale", children: "For Sale" }), _jsx("option", { value: "for-rent", children: "For Rent" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "listingType", children: "Listing Type" }), _jsxs("select", { name: "listingType", id: "listingType", value: formData.listingType, onChange: handleInputChange, className: "form-control", children: [_jsx("option", { value: "", children: "Select Type" }), _jsx("option", { value: "residential", children: "Residential" }), _jsx("option", { value: "commercial", children: "Commercial" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "propertyType", children: "Property Type" }), _jsxs("select", { name: "propertyType", id: "propertyType", value: formData.propertyType, onChange: handleInputChange, className: "form-control", children: [_jsx("option", { value: "", children: "Select Type" }), Object.keys(propertyTypes).length > 0 ? (Object.entries(propertyTypes).map(([typeKey, typeValue]) => (_jsx("option", { value: typeKey, children: typeValue }, typeKey)))) : (_jsx("option", { value: "" }))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "minPrice", children: "Price" }), _jsxs("div", { className: "row min-price-filter", children: [_jsx("div", { className: "col-sm-6", children: _jsxs("select", { name: "minPrice", id: "minPrice", value: formData.minPrice, onChange: handleInputChange, className: "form-control", children: [_jsx("option", { value: "", children: "Min Price" }), minPrice.map((price, index) => {
                                            const formattedPrice = price.toLocaleString();
                                            return (_jsxs("option", { value: price, children: ["AED ", formattedPrice] }, index));
                                        })] }) }), _jsx("div", { className: "col-sm-6", children: _jsxs("select", { name: "maxPrice", id: "maxPrice", value: formData.maxPrice, onChange: handleInputChange, className: "form-control", children: [_jsx("option", { value: "", children: "Max Price" }), maxPrice.map((price, index) => {
                                            const formattedPrice = price.toLocaleString();
                                            return (_jsxs("option", { value: price, children: ["AED ", formattedPrice] }, index));
                                        })] }) })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "bedrooms", children: "Bedrooms" }), _jsxs("select", { name: "bedrooms", id: "bedrooms", value: formData.bedrooms, onChange: handleInputChange, className: "form-control", children: [_jsx("option", { value: "", children: "Bedrooms" }), Object.entries(minBeds).map(([key, label]) => (_jsx("option", { value: key, children: label }, key)))] })] }), _jsxs("div", { className: "form-group ", children: [_jsx("label", { htmlFor: "", className: "", children: "\u00A0" }), _jsxs("div", { className: "d-flex justify-content-between gap-3", children: [_jsx("button", { type: "submit", className: "btn btn-primary btn-submit", children: "Search" }), _jsx("button", { type: "button", style: { opacity: 0.6 }, onClick: handleReset, className: "btn btn-default btn-reset", children: "Reset" })] })] })] }));
};
export default PropertyFilter;
