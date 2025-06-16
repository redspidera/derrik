import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '@/Constants';

interface FormData {
    community: string;
    developer: string;
    propertyType: string;
    year: string;
}

interface PropertyFilterProps {
    formData: FormData;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>; // Added to reset formData
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ formData, handleInputChange, handleSubmit, setFormData }) => {
    const [yearList, setYearList] = useState<{ [key: string]: string }>({});
    const [propertyTypes, setPropertyTypes] = useState<{ [key: string]: string }>({});
    const [develoerNames, setdeveloerNames] = useState<{ [key: string]: string }>({});
    const hasFetchedoffplan = useRef(false);

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!hasFetchedoffplan.current) {
                try {
                    hasFetchedoffplan.current = true;
                    const response = await fetch(API_URL + 'form_offplan_values');
                    const data = await response.json();

                    let propertyTypesObject: { [key: string]: string } = {};
                    let developerObject: { [key: string]: string } = {};
                    propertyTypesObject = data.propertyTypes;
                    developerObject = data.developers;
                    setYearList(data?.years || {});
                    setPropertyTypes(propertyTypesObject);
                    setdeveloerNames(developerObject);


                } catch (error) {
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
            const resetFormData: FormData = {
               
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


    return (
        <form onSubmit={handleSubmit} className="property-search-form" id="frmId">
            <div className="form-group">
                <label htmlFor="sectorType">Community</label>
                <input
                    type="text" 
                    name="community"
                    id="community"
                    value={formData.community}
                    onChange={handleInputChange}
                    className="form-control"
                />
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
                <label htmlFor="propertyType">Developers</label>
                <select
                    name="developer"
                    id="developer"
                    value={formData.developer}
                    onChange={handleInputChange}
                    className="form-control"
                >
                    <option value="">Select Developer</option>
                    {Object.keys(develoerNames).length > 0 ? (
                        Object.entries(develoerNames).map(([typeKey, typeValue]) => (
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
                <label htmlFor="year">Completion Year</label>
                <select
                    name="year"
                    id="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="form-control"
                >
                    <option value="">Completion Year</option>
                    {Object.entries(yearList).map(([key, label]) => (
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
