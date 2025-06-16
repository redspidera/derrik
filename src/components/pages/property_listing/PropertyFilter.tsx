import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '@/Constants';

interface FormData {
    sectorType: string;
    listingType: string;
    propertyType: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
}

interface PropertyFilterProps {
    formData: FormData;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>; // Added to reset formData
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ formData, handleInputChange, handleSubmit, setFormData }) => {
    const [propertyTypes, setPropertyTypes] = useState<{ [key: string]: string }>({});
    const [minBeds, setMinBeds] = useState<{ [key: string]: string }>({});
    const [minPrice, setMinPrice] = useState<number[]>([]);
    const [maxPrice, setMaxPrice] = useState<number[]>([]);
    const [dataValues, setDataValues] = useState<any>([]);
    
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
                    }else{
                        data_load = dataValues; 
                    } 
                    let propertyTypesObject: { [key: string]: string } = {};
                   
                        hasFetchedProperty.current = true;
                    if (formData.listingType === 'commercial' && data_load.propertyTypes?.commercial) {
                        propertyTypesObject = data_load.propertyTypes.commercial;
                    } else if (formData.listingType === 'residential' && data_load.propertyTypes?.residential) {
                        propertyTypesObject = data_load.propertyTypes.residential;
                    }

                    setPropertyTypes(propertyTypesObject);
                    setMinBeds(data_load?.minBeds || {});

                    if (formData.sectorType === 'for-sale' && data_load?.minPrice?.forsale) {
                        setMinPrice(Object.keys(data_load.minPrice.forsale).map(Number));
                        setMaxPrice(Object.keys(data_load.maxPrice.forsale).map(Number));
                    } else if (formData.sectorType === 'for-rent' && data_load?.minPrice?.rentprice) {
                        setMinPrice(Object.keys(data_load.minPrice.rentprice).map(Number));
                        setMaxPrice(Object.keys(data_load.maxPrice.rentprice).map(Number));
                    }
                } catch (error) {
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
            const resetFormData: FormData = {
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


    return (
        <form onSubmit={handleSubmit} className="property-search-form" id="frmId">
            <div className="form-group">
                <label htmlFor="sectorType">Sector Type</label>
                <select
                    name="sectorType"
                    id="sectorType"
                    value={formData.sectorType}
                    onChange={handleInputChange}
                    className="form-control"
                >
                    <option value="">Select</option>
                    <option value="for-sale">For Sale</option>
                    <option value="for-rent">For Rent</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="listingType">Listing Type</label>
                <select
                    name="listingType"
                    id="listingType"
                    value={formData.listingType}
                    onChange={handleInputChange}
                    className="form-control"
                >
                    <option value="">Select Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="propertyType">Property Type</label>
                <select
                    name="propertyType"
                    id="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="form-control"
                >
                    <option value="">Select Type</option>
                    {Object.keys(propertyTypes).length > 0 ? (
                        Object.entries(propertyTypes).map(([typeKey, typeValue]) => (
                            <option key={typeKey} value={typeKey}>
                                {typeValue}
                            </option>
                        ))
                    ) : (
                        <option value=""></option>
                    )}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="minPrice">Price</label>
                <div className="row min-price-filter">
                    <div className="col-sm-6">
                        <select
                            name="minPrice"
                            id="minPrice"
                            value={formData.minPrice}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Min Price</option>
                            {minPrice.map((price, index) => {
                                const formattedPrice = price.toLocaleString();
                                return (
                                    <option key={index} value={price}>
                                        AED {formattedPrice}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-sm-6">
                        <select
                            name="maxPrice"
                            id="maxPrice"
                            value={formData.maxPrice}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option value="">Max Price</option>
                            {maxPrice.map((price, index) => {
                                const formattedPrice = price.toLocaleString();
                                return (
                                    <option key={index} value={price}>
                                        AED {formattedPrice}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <select
                    name="bedrooms"
                    id="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="form-control"
                >
                    <option value="">Bedrooms</option>
                    {Object.entries(minBeds).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group ">
                <label htmlFor="" className="">&nbsp;</label>
                <div className="d-flex justify-content-between gap-3">
                <button type="submit" className="btn btn-primary btn-submit">Search</button>
                    <button type="button" style={{opacity: 0.6}} onClick={handleReset} className="btn btn-default btn-reset">Reset</button>
                </div>
            </div>
        </form>
    );
};

export default PropertyFilter;
