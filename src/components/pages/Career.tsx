import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import { API_URL} from '@/Constants';  
import SuccessMessage from './SuccessMessage';

 

type FormDataType = {
    name: string;
    email: string;
    ph: string;
    sect: string; // Convert to string for URLSearchParams compatibility
    category: string; // Convert to string for URLSearchParams compatibility
    address: string;
};
interface Option {
    id: string; // or number, based on your data
    name: string;
}

interface Properties {
    
    headerTitle: string;
    sub_title: string; 
    banner: string;
    image2: string;
    content: string | null;
}
const Career = () => {  
      
        const handlePhoneChange = (value: string) => {
            formData.ph = value;  
        };
    const [formData, setFormData] = useState<FormDataType>({
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
    const [errors, setErrors] = useState<Record<string, string>>({}); // For form validation
    const [options, setOptions] = useState<Option[]>([]); // State to hold the options fetched from the API
    const [properties, setProperties] = useState<Properties | null>(null);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API_URL}listing_designation`); // Replace with your API URL
                const json = await response.json();
                const data: Option[] = json.data; 
                setOptions(data); // Assuming the response data is an array of options
                setProperties(json.properties); // Assuming the response data is an array of options
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        const formErrors: Record<string, string> = {};
        if (!formData.name.trim()) formErrors.name = 'Name is required';
        if (!formData.email.trim()) formErrors.email = 'Email is required';
        if (!formData.ph.trim()) formErrors.ph = 'Phone is required';  
        if (!formData.category.trim()) formErrors.category = 'Designation is required'; 
        if (!formData.address.trim()) formErrors.address = 'Cover Letter is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log("ERROR")
            return;
        }
        console.log("WER")
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
            } else {
                setResponseMessage('There was an error with your submission.');
                if (response.data.errors) {
                    setErrors(response.data.errors);
                }
            }
        } catch (error) {
            setResponseMessage('Network error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="row ">
                <div
                    className={`contact-us head-sect article-main `}
                >
                    <div className="section-dark page-banner at-career list-banner-home ccarer half-height   more-height sect-blog face-11" >
                        <div
                            className="full-block page-banner-image as"
                            style={{ backgroundImage: `url(${properties?.banner})` }}
                        >
                        </div>
                        <div className="full-block overlay"></div>
                        {properties?.headerTitle && (
                            <div className="container at-center-container h-100">
                                <div className="row disp-table h-100">
                                    <div className="col col-md-12 h-100">
                                        <div className="page-banner-content h-100">
                                            <div className="page-banner-content h-100">
                                                <div className="fancy-title-hold text-initial clearfix">
                                                    
                                                    {properties.sub_title && (
                                                        <h3
                                                            className="sub-title-fnt"

                                                        >
                                                            {properties.sub_title}
                                                        </h3>
                                                    )}
                                                    <h2 className="fancy-title animate animated">
                                                        {properties?.headerTitle}

                                 
                                                    </h2>
                                                    {properties.content && (
                                                        <>
                                                            <div className="sub-title-fnt descript-fnt" dangerouslySetInnerHTML={{ __html: properties.content }} />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <section className="  ">
                     
                    <div className=" container caree-conteiner">
                        <div className="row">
                            <div className="col-sm-7">
                                <h3 className="site-h1 text-center">Send your CV</h3>
                            </div>
                        </div>
                        <div className="row d-flex">
                            <div className="col-sm-7 left-list-property left-list-property1">
                                <div className="gform_wrapper">
                                    <div className="gform_body">
                                <form
                                    className='pure-form pure-form-aligned main-enquiry-form at-contact-us lis-propert'

                                    onSubmit={handleSubmit}>
                                    <fieldset className="d-block">
                                        <legend>

                                                    <h3 className="site-h3 text-center mbo-50" >APPLICATION FORM </h3>


                                        </legend>
                                        <div className="division">
                                            {responseMessage && 
                                            (
                                                <p>{responseMessage}</p>

                                               
                                            )}
                                            {successNotification && 
                                            (
                                                <SuccessMessage responseMessage={successNotification} />
                                               
                                            )}

                                             

                                            <div className="pure-control-group form-icon form-icon-person">
                                                <input
                                                    className="pure-input-1"
                                                    placeholder="Name"
                                                    name="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                                {errors.name && <div className="errorMessage">{errors.name}</div>}
                                            </div>
                                            <div className="pure-control-group form-icon form-icon-mail">
                                                <input
                                                    className="pure-input-1"
                                                    placeholder="Email"
                                                    name="email"
                                                    type="text"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                                {errors.email && <div className="errorMessage">{errors.email}</div>}
                                            </div>
                                            <div className="pure-control-group form-icon form-icon-mobile">
                                                <PhoneInput
                                                    international
                                                    defaultCountry="AE"
                                                    className="pure-input-1"
                                                    name="ph"
                                                    value={formData.ph}
                                                    onChange={handlePhoneChange}
                                                    placeholder="Phone"
                                                />
                                                {errors.ph && <div className="errorMessage">{errors.ph}</div>}
                                            </div>
                                        </div>

                                        <div className="division pt0">
                                            <div className="row row-select-category">
                                                 
                                                <div className="col-sm-12">
                                                    <div className="pure-control-group form-icon form-icon-mail">
                                                        <select
                                                            className="pure-input-1"
                                                            name="category"
                                                             
                                                            value={formData.category}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option value="">Selct Designation</option>
                                                            {options.map((option) => (
                                                                <option key={option.id} value={option.id}>
                                                                    {option.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        {errors.category && <div className="errorMessage">{errors.category}</div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pure-control-group  ">
                                                <textarea
                                                    className="pure-input-1"
                                                    placeholder="Cover Letter"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                />
                                                {errors.address && <div className="errorMessage">{errors.address}</div>}
                                            </div>
                                            <div className="pure-control-group">
                                                <button className="button button-primary" type="submit">
                                                    {loading ? 'Processing...' : <><span className="icon-mail-3"></span> Submit  Details</>}
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>
                                </form>
                                </div>
                                </div>
                            </div>
                            <div className="col-sm-5 right-side-cnt  carre-frm">
                                <div className="vimeo-wrapper">
                                {properties && properties.image2 && <img src={properties.image2} className="right-image" alt="" />}
                                </div>
                            </div>
                        </div>
                        
                       
                    </div>
                     
                </section >
        </div>
        
        </>
    );
};

export default Career;
