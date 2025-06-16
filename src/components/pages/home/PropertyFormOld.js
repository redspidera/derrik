import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, Button, Tabs, Tab, List, ListItemButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { API_URL } from '@/Constants';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';
const PropertyForm = ({ origin, setFormData }) => {
    const navigate = useNavigate();
    const [loadingBtn, setLoadingBtn] = useState(false);
    const path = window.location.pathname;
    const sec = (Object.entries({
        '/for-rent': 'rent',
        '/for-sale': 'sale',
        '/offplan-properties-for-sale': 'offplan'
    }).find(([key]) => path.startsWith(key))?.[1] || 'sale'); // Type assertion
    const [formType, setFormType] = useState(sec);
    const listRef = useRef(null);
    const [community, setCommunity] = useState('');
    const [developer, setDeveloper] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [year, setYear] = useState('');
    const [offplanPropertyList, setOffplanPropertyList] = useState([{ id: '', name: 'Property Type' }]);
    const [showPropertyList, setShowPropertyList] = useState('');
    const [propertyName, setPropertyName] = useState('');
    const [communities, setCommunities] = useState([]);
    const [beds, setBeds] = useState([{ id: '0', name: 'All Bedrooms' }]);
    const [years, setYears] = useState([{ id: '0', name: 'All Completion' }]);
    const [baths, setBaths] = useState([{ id: '0', name: 'All Bathrooms' }]);
    const [develpers, setDevelopers] = useState([{ id: '', name: 'All Developers' }]);
    const [minPriceList, setMinPriceList] = useState([{ id: '0', name: 'Min Price' }]);
    const [minRentPriceList, setMinRentPriceList] = useState([{ id: '0', name: 'Min Price' }]);
    const [resType, setResType] = useState('ALL');
    const [propertyData, setPropertyData] = useState({ residential: [], all: [], commercial: [] });
    const [propertyOptions, setPropertyOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingRefreshBtn, setLoadingRefreshBtn] = useState(false);
    const [error, setError] = useState(null);
    // Additional States for Prices, Beds, Baths 
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('0');
    const [minBeds, setMinBeds] = useState('0');
    const [minBaths, setMinBaths] = useState('0');
    // Handle form type change
    const handleFormTypeChange = (value) => {
        setFormType(value);
    };
    const handleTabClick = (value) => {
        setResType(value);
        setPropertyType('');
        setPropertyName('');
        setShowPropertyList('1');
        // Update property options based on selected type
        if (value === 'Residential') {
            setPropertyOptions(propertyData.residential);
        }
        else if (value === 'Commercial') {
            setPropertyOptions(propertyData.commercial);
        }
    };
    // Handle Residential/Commercial tab change
    const handleResTypeChange = (_, newValue) => {
        setResType(newValue);
        setPropertyType('');
        setPropertyName('');
        setShowPropertyList('1');
        // Update property options based on selected type
        if (newValue === 'Residential') {
            setPropertyOptions(propertyData.residential);
        }
        else if (newValue === 'Commercial') {
            setPropertyOptions(propertyData.commercial);
        }
    };
    // Handle community selection
    const handleCommunityChange = (event, value) => {
        console.log(event);
        setCommunity(value ? value.id : '');
    };
    const constructQueryParams = () => {
        const queryParams = new URLSearchParams();
        let url = (() => {
            switch (formType) {
                case 'sale': return '/for-sale';
                case 'rent': return '/for-rent';
                case 'offplan': return '/offplan-properties-for-sale';
                default: return '';
            }
        })();
        if (community)
            queryParams.append('community', community);
        if (resType)
            queryParams.append('listingType', resType.toLowerCase());
        if (propertyType)
            queryParams.append('propertyType', propertyType);
        if (developer)
            queryParams.append('developer', developer);
        if (year)
            queryParams.append('year', year);
        if (minPrice && minPrice !== '0')
            queryParams.append('minPrice', minPrice.toString());
        if (maxPrice && maxPrice !== '0')
            queryParams.append('maxPrice', maxPrice.toString());
        if (minBeds && minBeds !== '0')
            queryParams.append('beds', minBeds.toString());
        if (minBaths && minBaths !== '0')
            queryParams.append('baths', minBaths.toString());
        const finalUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;
        return finalUrl;
    };
    const updateUrl = () => {
        const newUrl = constructQueryParams();
        // Update the browser's address bar without reloading the page
        window.history.pushState(null, '', newUrl);
        if (origin == 'home') {
            navigate(`${newUrl}`);
        }
    };
    const handleClick = () => {
        setLoadingBtn(true); // Set loading to true
        if (setFormData) {
            setFormData({
                sectorType: formType, // Residential or Commercial
                listingType: resType.toLowerCase(), // sale or rent
                propertyType: propertyType,
                community: community,
                year: year,
                developer: developer,
                minPrice: minPrice !== '0' ? Number(minPrice) : 0,
                maxPrice: maxPrice !== '0' ? Number(maxPrice) : 0,
                bedrooms: minBeds !== '0' ? String(minBeds) : '0',
            });
        }
        updateUrl();
        setTimeout(() => {
            setLoadingBtn(false); // Reset loading after submission
        }, 2000); // Simulate 2-second delay (replace with actual submission logic)
    };
    const handleReset = () => {
        setLoadingRefreshBtn(true); // Set loading to true
        setPropertyType('');
        setYear('');
        setCommunities([]);
        setDevelopers([]);
        setMinBaths(0);
        setMinPrice(0);
        setMaxPrice(0);
        setResType('ALL');
        setMinBeds(0);
        setDeveloper('');
        setCommunities([]);
        if (setFormData) {
            setFormData({
                sectorType: formType, // Residential or Commercial
                listingType: '', // sale or rent
                propertyType: '',
                community: '',
                year: '',
                developer: '',
                minPrice: 0,
                maxPrice: 0,
                bedrooms: '0',
            });
        }
        let url_reset = (() => {
            switch (formType) {
                case 'sale': return '/for-sale';
                case 'rent': return '/for-rent';
                case 'offplan': return '/offplan-properties-for-sale';
                default: return '';
            }
        })();
        window.history.pushState(null, '', url_reset);
        setTimeout(() => {
            setLoadingRefreshBtn(false); // Reset loading after submission
        }, 2000); // Simulate 2-second delay (replace with actual submission logic)
    };
    // Handle property selection
    const handlePropertySelect = (selectedType, id) => {
        setPropertyType(id);
        setPropertyName(selectedType);
        setShowPropertyList('');
    };
    // Fetch communities and property types once on component mount
    const loadPropertiesData = async () => {
        setLoading(true);
        setError(null); // Clear any existing error message
        try {
            const response = await axios.get(`${API_URL}fetch_types`);
            const communityList = response.data?.communities?.map((item) => ({
                id: item.id,
                uid: item.uid,
                name: item.name
            })) || [];
            const bedsList = response.data?.minBeds?.map((item) => ({
                id: item.id,
                name: item.name
            })) || [];
            const bathList = response.data?.minBaths?.map((item) => ({
                id: item.id,
                name: item.name
            })) || [];
            response.data.sale?.minPrice || [];
            const minPList = response.data.sale?.minPrice.map((item) => ({
                id: item.id,
                name: item.name
            })) || [];
            const minPriceRentList = response.data.rent?.minPrice.map((item) => ({
                id: item.id,
                name: item.name
            })) || [];
            const offPlanPropertyList1 = response.data?.offpla_category.map((item) => ({
                id: item.id,
                name: item.name
            })) || [];
            const YearList = response.data?.year.map((item) => ({
                id: item.id,
                name: item.name
            })) || [];
            const dvelopersList = response.data?.developer_list.map((item) => ({
                id: item.id,
                name: item.name
            })) || [];
            setMinPriceList(minPList);
            setYears(YearList);
            setOffplanPropertyList(offPlanPropertyList1);
            setMinRentPriceList(minPriceRentList);
            setBeds(bedsList);
            setBaths(bathList);
            setCommunities(communityList);
            setDevelopers(dvelopersList);
            setPropertyData({
                residential: response.data['residential'] || [],
                commercial: response.data['commercial'] || [],
                all: response.data['all'] || []
            });
            // Set the default property options based on the initial resType ('Residential')
            setPropertyOptions(response.data['residential'] || []);
        }
        catch (error) {
            setError('Error fetching properties data'); // Set error message
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (listRef.current) {
                if (!listRef.current.contains(event.target)) {
                    setShowPropertyList(''); // Close the list if clicked outside
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    // Fetch data on component mount
    useEffect(() => {
        loadPropertiesData();
    }, []);
    if (origin == 'list') {
        useEffect(() => {
            // Parse query parameters on page load
            const urlParams = new URLSearchParams(window.location.search);
            const listingType = urlParams.get('listingType')?.toLowerCase();
            const propertyTypeParam = urlParams.get('propertyType');
            const minPriceParam = urlParams.get('minPrice');
            const maxPriceParam = urlParams.get('maxPrice');
            const bedsParam = urlParams.get('beds');
            const bathsParam = urlParams.get('baths');
            const communityParam = urlParams.get('community');
            if (listingType)
                setResType(listingType === 'residential' ? 'Residential' : listingType === 'commercial' ? 'Commercial' : 'ALL');
            if (propertyTypeParam)
                setPropertyType(propertyTypeParam);
            if (communityParam)
                setCommunity(communityParam);
            if (minPriceParam)
                setMinPrice(minPriceParam);
            if (maxPriceParam)
                setMaxPrice(maxPriceParam);
            if (bedsParam)
                setMinBeds(bedsParam);
            if (bathsParam)
                setMinBaths(bathsParam);
        }, []);
    }
    return (_jsxs("div", { className: `${origin === "home" ? "srch-form-home" : "list-search"} ${formType === "offplan" ? "off-p" : "list-buy"} `, children: [_jsxs("ul", { className: "item-srch-head", children: [_jsxs("li", { className: `${origin === 'list' && formType === 'offplan' ? 'hide' : ''} item-srch-head-items item-srch-head-btns`, children: [_jsx(Button, { onClick: () => handleFormTypeChange('sale'), variant: formType === 'sale' ? 'contained' : 'outlined', children: "Sale" }), _jsx(Button, { onClick: () => handleFormTypeChange('rent'), variant: formType === 'rent' ? 'contained' : 'outlined', children: "Rent" }), _jsx(Button, { onClick: () => handleFormTypeChange('offplan'), variant: formType === 'offplan' ? 'contained' : 'outlined', className: `${origin === 'list' && formType !== 'offplan' ? 'hide' : ''}`, children: "Off-Plan" })] }), propertyName && (_jsx("li", { className: "item-srch-head-items abs-pType d-none hide", children: propertyName }))] }), _jsxs("ul", { className: "item-srch-flex", children: [_jsx("li", { className: "item-srch item-srch-autocomplete", children: _jsx(Autocomplete, { value: communities.find(c => c.id === community) || null, onChange: handleCommunityChange, options: communities, renderOption: (props, option) => (_createElement("li", { ...props, key: option.uid },
                                "  ",
                                option.name)), getOptionLabel: (option) => option.name || '', isOptionEqualToValue: (option, value) => option.id === value.id, renderInput: (params) => (_jsx(TextField, { ...params, label: "Community", variant: "outlined", fullWidth: true })) }) }), formType != 'offplan' && (_jsxs("li", { className: `${resType === 'ALL' ? 'hide-selected-residenta' : ''} item-srch item-srch-residential`, ref: listRef, children: [_jsxs(Tabs, { value: resType, onChange: handleResTypeChange, "aria-label": "Property Type Tabs", indicatorColor: "primary", textColor: "primary", children: [_jsx(Tab, { label: "ALL", value: "ALL", className: "all-residential-c" }), _jsx(Tab, { label: propertyName && resType === 'Residential' ? propertyName : 'Residential', value: "Residential", onClick: () => handleTabClick("Residential") }), _jsx(Tab, { label: propertyName && resType === 'Commercial' ? propertyName : 'Commercial', value: "Commercial", onClick: () => handleTabClick("Commercial") })] }), showPropertyList && resType && (_jsxs("div", { className: "inneritems", children: [_jsxs("div", { hidden: true, children: [resType, " Property Types:"] }), loading ? (_jsx("div", { children: "Loading..." })) : error ? (_jsx("div", { style: { color: 'red' }, children: error })) : propertyOptions.length === 0 ? (_jsxs("p", { children: ["No ", resType, " property options available."] })) : (_jsx(List, { children: propertyOptions.map(({ id, name }) => (_jsx(ListItemButton, { onClick: () => handlePropertySelect(name, id), children: name }, id))) }))] }))] })), formType == 'offplan' && (_jsxs(_Fragment, { children: [_jsx("li", { className: "item-srch", children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Property Type" }), _jsx(Select, { value: propertyType, onChange: (e) => setPropertyType(e.target.value), label: "Property Type", children: offplanPropertyList && offplanPropertyList.map(({ id, name }) => (_jsx(MenuItem, { value: id, children: name }, id))) })] }) }), (formType == 'offplan') && (_jsx("li", { className: "item-srch", children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Developer" }), _jsx(Select, { value: developer, onChange: (e) => setDeveloper(e.target.value), label: "Developer", children: develpers && develpers.map(({ id, name }) => (_jsx(MenuItem, { value: id, children: name }, id))) })] }) })), _jsx("li", { className: "item-srch", children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: origin === 'list' ? "Completion Year" : "Completion Year" }), _jsx(Select, { value: year, onChange: (e) => setYear(e.target.value), label: origin === 'list' ? "Completion Year" : "Completion Year", children: years && years.map(({ id, name }) => (_jsx(MenuItem, { value: id, children: name }, id))) })] }) })] })), _jsx("li", { className: `${origin == 'home' && formType == 'offplan' ? 'hide' : ''}      item-srch`, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Min Price(AED)" }), _jsxs(Select, { value: minPrice, onChange: (e) => setMinPrice(Number(e.target.value)), label: "Min Price(AED)", children: [(formType == 'sale' || 'offplan') && minPriceList && minPriceList.map(({ id, name }) => (_jsx(MenuItem, { value: id, children: name }, id))), formType == 'rent' && minRentPriceList && minRentPriceList.map(({ id, name }) => (_jsx(MenuItem, { value: id, children: name }, id)))] })] }) }), _jsx("li", { className: `${origin == 'home' && formType == 'offplan' ? 'hide' : ''}      item-srch`, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Max Price(AED)" }), _jsxs(Select, { value: maxPrice, onChange: (e) => setMaxPrice(Number(e.target.value)), label: "Max Price(AED)", children: [(formType == 'sale' || 'offplan') && minPriceList && minPriceList.map(({ id, name }) => (_jsx(MenuItem, { value: id, children: name }, id))), formType == 'rent' && minRentPriceList && minRentPriceList.map(({ id, name }) => (_jsx(MenuItem, { value: id, children: name }, id)))] })] }) }), origin == 'list' && formType != "offplan" && (_jsxs(_Fragment, { children: [_jsx("li", { className: "item-srch", children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Bedrooms" }), _jsx(Select, { value: minBeds, onChange: (e) => setMinBeds(Number(e.target.value)), label: "Min Beds", children: beds && beds.map(({ id, name }) => (_jsx(MenuItem, { value: id, children: name }, id))) })] }) }), _jsx("li", { className: "item-srch", children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { children: "Min Baths" }), _jsx(Select, { value: minBaths, onChange: (e) => setMinBaths(Number(e.target.value)), label: "Min Baths", children: baths && baths.map(({ id, name }) => (_jsx(MenuItem, { value: id, children: name }, id))) })] }) })] })), _jsxs("li", { className: "item-srch item-srch-submit", children: [_jsxs(Button, { ...(origin === 'list' ? { onClick: handleClick } : { onClick: handleClick }), className: "submit-button", startIcon: !loadingBtn && _jsx(SearchIcon, {}), disabled: loadingBtn, children: [loadingBtn ? (_jsxs(_Fragment, { children: [_jsx(CircularProgress, { size: 20, color: "inherit", style: { marginRight: '8px' } }), "  SEARCH"] })) : ('SEARCH' // Default button text
                                    ), _jsxs("div", { className: "hidden", children: [formType === 'sale' ? 'Sale' : 'Rent', " Form ", propertyType] })] }), origin == 'list' && (_jsx(Button, { variant: "contained", color: "secondary", startIcon: !loadingRefreshBtn && _jsx(RefreshIcon, {}), disabled: loadingRefreshBtn, onClick: handleReset, sx: {
                                    opacity: 0.7, // Adjust this value to control opacity (0.0 to 1.0)
                                    '&:hover': {
                                        opacity: 1, // Full opacity on hover
                                    },
                                }, children: loadingRefreshBtn ? (_jsxs(_Fragment, { children: [_jsx(CircularProgress, { size: 20, color: "inherit", style: { marginRight: '8px' } }), "  Reset"] })) : ('Reset' // Default button text
                                ) }))] })] })] }));
};
export default PropertyForm;
