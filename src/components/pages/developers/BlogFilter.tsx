//import React, { useState, useEffect, useRef } from 'react';
 

interface FormData {
    keyword: string; 
}

interface BlogFilterProps {
    formData: FormData;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>; // Added to reset formData
}

const BlogFilter: React.FC<BlogFilterProps> = ({ formData, handleInputChange, handleSubmit, setFormData }) => {
      

     

    /**
     * Resets the form data to its initial state.
     */
    const handleReset = () => {
        setFormData(() => {
            const resetFormData: FormData = {
                
                keyword: '', 
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
                 
                <input
                    type="text" 
                    placeholder="Search Developers"
                    name="keyword"
                    id="keyword"
                    value={formData.keyword}
                    onChange={handleInputChange}
                    className="form-control"
                />
            </div>

           

             

            <div className="form-group mx-srchbtn">
                 
                <div className="d-flex justify-content-between gap-3">
                <button type="submit" className="btn btn-primary btn-submit">Search</button>
                    <button type="button" style={{opacity: 0.6}} onClick={handleReset} className="btn btn-default btn-reset">Reset</button>
                </div>
            </div>
        </form>
    );
};

export default BlogFilter;
