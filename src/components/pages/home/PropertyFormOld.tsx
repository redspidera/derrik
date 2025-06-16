import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { API_URL } from '@/Constants';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';

interface PropertyFormFormData {
    sectorType: string;
    listingType: string;
    propertyType: string;
    community: string;
    minPrice: number;
    maxPrice: number;
    bedrooms: string;
    developer: string;
    year: string;
}
type PropertyFormProps = {
    origin: string; 
    setFormData?: React.Dispatch<React.SetStateAction<PropertyFormFormData>> | null; 
};
 
const PropertyForm = ({ origin,    setFormData }: PropertyFormProps) => {
    const navigate = useNavigate();
    const [loadingBtn, setLoadingBtn] = useState(false);
    const path = window.location.pathname;
    const sec = (Object.entries({
        '/for-rent': 'rent',
        '/for-sale': 'sale',
        '/offplan-properties-for-sale': 'offplan'
    }).find(([key]) => path.startsWith(key))?.[1] || 'sale') as 'sale' | 'rent' | 'offplan'; // Type assertion

    const [formType, setFormType] = useState<'sale' | 'rent' | 'offplan'>(sec);


    const listRef = useRef<HTMLLIElement>(null); 
    const [community, setCommunity] = useState<string>('');
    const [communityMultiple, setCommunityMultiple] = useState<string>('');
    const [propertyType, setPropertyType] = useState<string>(''); 
    const [year, setYear] = useState<string>('');
    const [propertyName, setPropertyName] = useState<string>('');
    const [communities, setCommunities] = useState<{ id: string, name: string, uid: string }[]>([]);
    const [communitiesMultiple, setCommunitiesMultiple] = useState<{ id: string, name: string, uid: string }[]>([]);
    const [years, setYears] = useState<{ id: string, name: string }[]>([{ id: '0', name: 'All Completion' }]);

    const [resType, setResType] = useState<'Residential' | 'Commercial' | 'ALL'>('ALL');

    const [loadingRefreshBtn, setLoadingRefreshBtn] = useState<boolean>(false);

    // Handle form type change
    const handleFormTypeChange = (value: 'sale' | 'rent' | 'offplan') => {
        setFormType(value);
    };
    const handleTabClick = (value: 'Residential' | 'Commercial' | 'ALL') => {
        
        setResType(value);
        setPropertyType('');
        setPropertyName('');
        // setShowPropertyList('1');

        // Update property options based on selected type
        if (value === 'Residential') {
            // setPropertyOptions(propertyData.residential);
        } else if (value === 'Commercial') {
            // setPropertyOptions(propertyData.commercial);
        }
    };

    // Handle community selection
    const handleCommunityChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: { id: string; name: string } | null
    ) => {
        console.log(event)
        setCommunity(value ? value.id : '');
    };
    // const constructQueryParams = () => {
    //     const queryParams = new URLSearchParams();
    //     const url = (() => {
    //         switch (formType) {
    //             case 'sale': return '/for-sale';
    //             case 'rent': return '/for-rent';
    //             case 'offplan': return '/offplan-properties-for-sale';
    //             default: return '';
    //         }
    //     })();
    //     if(formType=='offplan'){
    //         if (community) queryParams.append('community', community);
    //         if (year) queryParams.append('year', year);
    //     } else {
    //         if (resType && resType.toLowerCase() != 'all') queryParams.append('listingType', resType.toLowerCase());
    //         if (propertyType) queryParams.append('propertyType', propertyType);
    //         if (communityMultiple) queryParams.append('community', communityMultiple);
    //     }

    //     const finalUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;

    //     return finalUrl;


    // };
    const constructQueryParams = () => {
        const segments = [];
        const urlBase = (() => {
            switch (formType) {
                case 'sale': return '/for-sale';
                case 'rent': return '/for-rent';
                case 'offplan': return '/offplan-properties-for-sale';
                default: return '';
            }
        })();

        if (formType === 'offplan') {
            if (community) segments.push(`community-${community}`);
            if (year) segments.push(`year-${year}`);
        } else {
            if (resType && resType.toLowerCase() !== 'all') segments.push(`listingType-${resType.toLowerCase()}`);
            if (propertyType) segments.push(`propertyType-${propertyType}`);
            if (communityMultiple) segments.push(`community-${communityMultiple}`);
        }

        const finalUrl = [urlBase, ...segments].join('/');

        return finalUrl;
    };
    const updateUrl = () => {
        const newUrl = constructQueryParams(); 
        // Update the browser's address bar without reloading the page
        window.history.pushState(null, '', newUrl);
        if(origin=='home'){
        navigate(`${newUrl}`);
        }
    };
    const handleClick = () => {
        setLoadingBtn(true); // Set loading to true
        if (setFormData) {
            if(formType=='offplan'){
                setFormData({
                    sectorType: formType, // Residential or Commercial
                    listingType: '', // sale or rent
                    propertyType: '',
                    community: community,
                    year: year,
                    minPrice: 0,
                    maxPrice: 0,
                    bedrooms: '',
                    developer: '',
                });
            } else {
                setFormData({
                    sectorType: formType, // Residential or Commercial
                    listingType: resType.toLowerCase(), // sale or rent
                    propertyType: propertyType,
                    community: communityMultiple,
                    year: '',
                    minPrice: 0,
                    maxPrice: 0,
                    bedrooms: '',
                    developer: '',
                });
            }
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
        setResType('ALL');
        setCommunities([]);
        if (setFormData) {
        setFormData({
            sectorType: formType, // Residential or Commercial
            listingType: '', // sale or rent
            propertyType: '',
            community: '',
            year: ''  ,
            developer: ''  ,
            minPrice:   0,
            maxPrice:   0,
            bedrooms:  '0',
        });
        }
        const url_reset = (() => {
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

    // Fetch communities and property types once on component mount
    const loadPropertiesData = async () => {
        try {
            const response = await axios.get(`${API_URL}fetch_types`);

            const communityList = response.data?.communities?.map((item: any) => ({
                id: item.id,
                uid: item.uid,
                name: item.name
            })) || [];
            const YearList = response.data?.year.map((item: any) => ({
                id: item.id,

                name: item.name
            })) || [];
            const communityMultipleList = [
                ...response.data?.communities?.map((item: { id: string; uid: string; name: string }) => ({
                    id: item.id,
                    uid: item.uid,
                    name: item.name
                })) || [],
                ...response.data?.subCommunities?.map((item: { id: string; uid: string; name: string }) => ({
                    id: item.id,
                    uid: item.uid,
                    name: item.name
                })) || [],
                ...response.data?.propertyNameList?.map((item: { id: string; uid: string; name: string }) => ({
                    id: item.id,
                    uid: item.uid,
                    name: item.name
                })) || [],
            ];
            setYears(YearList);
            setCommunities(communityList);
            setCommunitiesMultiple(communityMultipleList);
        } catch (error) {
            // setError('Error fetching properties data'); // Set error message
        } finally {
            // setLoading(false);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current) {
               

                if (!listRef.current.contains(event.target as Node)) {
                    //  setShowPropertyList(''); // Close the list if clicked outside
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
    if(origin=='list'){
    useEffect(() => {
        // Parse query parameters on page load
        const urlParams = new URLSearchParams(window.location.search);
        const listingType = urlParams.get('listingType')?.toLowerCase();
        const propertyTypeParam = urlParams.get('propertyType');
        const communityParam = urlParams.get('community');

        if (listingType) setResType(listingType === 'residential' ? 'Residential' : listingType === 'commercial' ? 'Commercial' : 'ALL');
        if (propertyTypeParam) setPropertyType(propertyTypeParam);
        if (communityParam) setCommunity(communityParam);
    }, []);
  }
    return (
        <div className={`${origin === "home" ? "srch-form-home" : "list-search"} ${formType === "offplan" ? "off-p" : "list-buy"} home-filter-panel`}>

            <ul className="item-srch-flex item-srch-head home-search-bar">
                <li 
                    className={`${origin === 'list' && formType === 'offplan' ? 'hide' : ''} item-srch-head-items item-srch-head-btns`}
                 >
                    <Button onClick={() => handleFormTypeChange('sale')} variant={formType === 'sale' ? 'contained' : 'outlined'}>
                        Buy
                    </Button>
                    <Button onClick={() => handleFormTypeChange('rent')} variant={formType === 'rent' ? 'contained' : 'outlined'}>
                        Rent
                    </Button>
                    <Button onClick={() => handleFormTypeChange('offplan')} variant={formType === 'offplan' ? 'contained' : 'outlined'}
                        className={`${origin === 'list' && formType !== 'offplan' ? 'hide' : ''}`}>
                        Off-Plan
                    </Button>
                </li>
                {formType != 'offplan'  && (      
                    <>
                    <li 
                        className={`${resType === 'ALL' ? 'hide-selected-residenta' : ''} item-srch item-srch-residential hide-on-mobile-at-home text-align-left`} ref={listRef} 
                    >
                        <FormControl fullWidth>
                            <InputLabel>Property Type</InputLabel>
                            <Select
                                value={resType}
                                onChange={(e) => handleTabClick(e.target.value as 'Residential' | 'Commercial' | 'ALL')}
                                label="Property Type"
                            >
                                <MenuItem value="ALL">ALL</MenuItem>
                                <MenuItem value="Residential">
                                    {propertyName && resType === 'Residential' ? propertyName : 'Residential'}
                                </MenuItem>
                                <MenuItem value="Commercial">
                                    {propertyName && resType === 'Commercial' ? propertyName : 'Commercial'}
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </li>
                    </>
                )}

                {formType != 'offplan' && ( 
                    <>                        
                        {/* Autocomplete for Community */}
                        <li className="item-srch item-srch-autocomplete combo-autocomplete-input hide-on-mobile-at-home ">
                            <Autocomplete
                                multiple
                                value={communitiesMultiple.filter(c => communityMultiple.split('-and-').includes(c.id)) || []}
                                onChange={(_event, value) => {
                                    const selectedIds = value.map(v => v.id).join('-and-');
                                    setCommunityMultiple(selectedIds);
                                }}
                                limitTags={1}
                                options={communitiesMultiple}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.uid}>  {/* Make sure option.id is unique */}
                                        {option.name}
                                    </li>
                                )}
                                getOptionLabel={(option) => option.name || ''}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                    <TextField {...params} label="City, building or community" variant="outlined" fullWidth />
                                )}
                            />
                        </li>
                    </>
                )}

                {formType == 'offplan' && ( 
                    <>
                        <li className="item-srch hide-on-mobile-at-home text-align-left">
                            <FormControl fullWidth>
                                    <InputLabel>{origin === 'list' ? "Completion Year" : "Completion Year"}</InputLabel>
                                <Select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                        label={origin === 'list' ? "Completion Year" : "Completion Year"}
                                >
                                    {years && years.map(({ id, name }) => (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    ))} 
                                </Select>
                            </FormControl>
                        </li>
                        {/* Autocomplete for Community */}
                        <li className="item-srch item-srch-autocomplete hide-on-mobile-at-home ">
                                <Autocomplete
                                    value={communities.find(c => c.id === community) || null}
                                    onChange={handleCommunityChange}
                                    options={communities}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.uid}>  {/* Make sure option.id is unique */}
                                            {option.name}
                                        </li>
                                    )}
                                    getOptionLabel={(option) => option.name || ''}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Community" variant="outlined" fullWidth />
                                    )}
                                />
                        </li>
                    </>
                )}
                
                {/* Submit Button */}
                <li className="item-srch item-srch-submit">
                    <Button
                            {...(origin === 'list' ? { onClick: handleClick } : { onClick: handleClick })}
                        className="submit-button"
                        startIcon={!loadingBtn && <SearchIcon />} // Show search icon only if not loading
                        disabled={loadingBtn}
                    >
                        {loadingBtn ? (
                            <>
                                <CircularProgress size={20} 
                                color="inherit"
                                    style={{ marginRight: '8px' }}
                                />  SEARCH
                            </>
                        ) : (
                            'SEARCH' // Default button text
                        )}
                        <div className="hidden">{formType === 'sale' ? 'Sale' : 'Rent'} Form {propertyType}</div>
                    </Button>
                    {origin=='list' &&(
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={!loadingRefreshBtn && <RefreshIcon />} // Show search icon only if not loading
                        disabled={loadingRefreshBtn} 
                        onClick={handleReset}
                        sx={{
                            opacity: 0.7, // Adjust this value to control opacity (0.0 to 1.0)
                            '&:hover': {
                                opacity: 1, // Full opacity on hover
                            },
                        }}
                    >
                        {loadingRefreshBtn ? (
                            <>
                                <CircularProgress size={20}
                                    color="inherit"
                                    style={{ marginRight: '8px' }}
                                />  Reset
                            </>
                        ) : (
                            'Reset' // Default button text
                        )}
                    </Button>
                    )}
                </li>
               
            </ul>
             
        </div>
    );
};

export default PropertyForm;
