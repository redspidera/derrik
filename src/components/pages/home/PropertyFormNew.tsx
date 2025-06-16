import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Autocomplete, TextField, IconButton, Tabs, Tab, List, ListItemButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { API_URL } from '@/Constants';
import SearchIcon from '@mui/icons-material/Search';
// import CircularProgress from '@mui/material/CircularProgress';
// import RefreshIcon from '@mui/icons-material/Refresh';
import { NavLink } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

interface FormData {
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
    setFormData?: React.Dispatch<React.SetStateAction<FormData>> | null; 
};
 
const PropertyFormNew = ({ origin,    setFormData }: PropertyFormProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    // const [loadingBtn, setLoadingBtn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const path = window.location.pathname;
    const sec = (Object.entries({
        '/for-rent': 'rent',
        '/for-sale': 'sale',
        '/offplan-properties-for-sale': 'offplan'
    }).find(([key]) => path.startsWith(key))?.[1] || 'sale') as 'sale' | 'rent' | 'offplan'; // Type assertion

    const [formType, setFormType] = useState<'sale' | 'rent' | 'offplan'>(sec);


    const listRef = useRef<HTMLLIElement>(null); 
    const [community, setCommunity] = useState<string>('');
    // const [developer, setDeveloper] = useState<string>('');
    const [propertyType, setPropertyType] = useState<string>(''); 
    // const [year, setYear] = useState<string>('');
    // const [offplanPropertyList, setOffplanPropertyList] = useState<{ id: string, name: string }[]>([{ id: '', name: 'Property Type' }]);
    const [showPropertyList, setShowPropertyList] = useState<string>('');
    const [propertyName, setPropertyName] = useState<string>('');
    const [communities, setCommunities] = useState<{ id: string, name: string, uid: string }[]>([]);
    const [beds, setBeds] = useState<{ id: string, name: string }[]>([{ id: '0', name: 'All Bedrooms' }]);
    // const [years, setYears] = useState<{ id: string, name: string }[]>([{ id: '0', name: 'All Completion' }]);

    const [baths, setBaths] = useState<{ id: string, name: string }[]>([{ id: '0', name: 'All Bathrooms' }]);
    // const [develpers, setDevelopers] = useState<{ id: string, name: string }[]>([{ id: '', name: 'All Developers' }]);
    const [minPriceList, setMinPriceList] = useState<{ id: string, name: string }[]>([{ id: '0', name: 'Min Price' }]);
    const [minRentPriceList, setMinRentPriceList] = useState<{ id: string, name: string }[]>([{ id: '0', name: 'Min Price' }]);
    const [resType, setResType] = useState<'Residential' | 'Commercial' | 'ALL'>('ALL');

    const [propertyData, setPropertyData] = useState<{ residential: any[], all: any[], commercial: any[] }>({ residential: [], all:[], commercial: [] });
    const [propertyOptions, setPropertyOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const [loadingRefreshBtn, setLoadingRefreshBtn] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const [properties, setProperties] = useState<{ id: string, name: string, uid: string }[]>([]);

    // Additional States for Prices, Beds, Baths 
    const [minPrice, setMinPrice] = useState<string | number>('0');
    const [maxPrice, setMaxPrice] = useState<string | number>('0');
    const [minBeds, setMinBeds] = useState<string | number>('0');
    const [minBaths, setMinBaths] = useState<string | number>('0');

    // Handle form type change
    const handleFormTypeChange = (value: 'sale' | 'rent' | 'offplan') => {
        setFormType(value);
    };
    const handleTabClick = (value: 'Residential' | 'Commercial' | 'ALL') => {
        
        setResType(value);
        setPropertyType('');
        setPropertyName('');
        setShowPropertyList('1');

        // Update property options based on selected type
        if (value === 'Residential') {
            setPropertyOptions(propertyData.residential);
        } else if (value === 'Commercial') {
            setPropertyOptions(propertyData.commercial);
        }
    };
    // Handle Residential/Commercial tab change
    const handleResTypeChange = (_: React.SyntheticEvent, newValue: 'Residential' | 'Commercial' | 'ALL') => {
       
        setResType(newValue);
        setPropertyType('');
        setPropertyName('');
        setShowPropertyList('1');

        // Update property options based on selected type
        if (newValue === 'Residential') {
            setPropertyOptions(propertyData.residential);
        } else if (newValue === 'Commercial') {
            setPropertyOptions(propertyData.commercial);
        }
    };

    // Handle community selection
    // const handleCommunityChange = (
    //     event: React.SyntheticEvent<Element, Event>,
    //     value: { id: string; name: string } | null
    // ) => {
    //     console.log(event)
    //     setCommunity(value ? value.id : '');
    // };
    // const constructQueryParams = () => {
    //     const queryParams = new URLSearchParams();
    //     let url = (() => {
    //         switch (formType) {
    //             case 'sale': return '/for-sale';
    //             case 'rent': return '/for-rent';
    //             case 'offplan': return '/offplan-properties-for-sale';
    //             default: return '';
    //         }
    //     })();

    //     if (community) queryParams.append('community', community);
    //     if (resType) queryParams.append('listingType', resType.toLowerCase());
    //     if (propertyType) queryParams.append('propertyType', propertyType);
    //     // if (developer) queryParams.append('developer', developer);
    //     // if (year) queryParams.append('year', year);
    //     if (minPrice && minPrice !== '0') queryParams.append('minPrice', minPrice.toString());
    //     if (maxPrice && maxPrice !== '0') queryParams.append('maxPrice', maxPrice.toString());
    //     if (minBeds && minBeds !== '0') queryParams.append('beds', minBeds.toString());
    //     if (minBaths && minBaths !== '0') queryParams.append('baths', minBaths.toString());

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

        if (community) segments.push(`community-${community}`);
        if (resType && resType.toLowerCase() !== 'all') segments.push(`listingType-${resType.toLowerCase()}`);
        if (propertyType) segments.push(`propertyType-${propertyType}`);
        // if (developer) segments.push(`developer-${developer}`);
        // if (year) segments.push(`year-${year}`);
        if (minPrice && minPrice !== '0') segments.push(`minPrice-${minPrice}`);
        if (maxPrice && maxPrice !== '0') segments.push(`maxPrice-${maxPrice}`);
        if (minBeds && minBeds !== '0') segments.push(`beds-${minBeds}`);
        if (minBaths && minBaths !== '0') segments.push(`baths-${minBaths}`);

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
        // setLoadingBtn(true); // Set loading to true
        if (setFormData) {
        setFormData({
            sectorType: formType, // Residential or Commercial
            listingType: resType.toLowerCase(), // sale or rent
            propertyType: propertyType,
            community: community,
            year: ''  ,
            developer: ''  ,
            minPrice: minPrice !== '0' ? Number(minPrice) : 0,
            maxPrice: maxPrice !== '0' ? Number(maxPrice) : 0,
            bedrooms: minBeds !== '0' ? String(minBeds) : '0',
        });
        }
        updateUrl();
        setTimeout(() => {
             
            // setLoadingBtn(false); // Reset loading after submission
        }, 2000); // Simulate 2-second delay (replace with actual submission logic)
    };
    const constructQuickSearchQueryParams = (selectedCommunity: string) => {
        const segments = [];
        const urlBase = (() => {
            switch (formType) {
                case 'sale': return '/for-sale';
                case 'rent': return '/for-rent';
                case 'offplan': return '/offplan-properties-for-sale';
                default: return '';
            }
        })();

        if (selectedCommunity) segments.push(`community-${selectedCommunity}`);
        if (resType && resType.toLowerCase() !== 'all') segments.push(`listingType-${resType.toLowerCase()}`);
        if (propertyType) segments.push(`propertyType-${propertyType}`);
        // if (developer) segments.push(`developer-${developer}`);
        // if (year) segments.push(`year-${year}`);
        if (minPrice && minPrice !== '0') segments.push(`minPrice-${minPrice}`);
        if (maxPrice && maxPrice !== '0') segments.push(`maxPrice-${maxPrice}`);
        if (minBeds && minBeds !== '0') segments.push(`beds-${minBeds}`);
        if (minBaths && minBaths !== '0') segments.push(`baths-${minBaths}`);

        const finalUrl = [urlBase, ...segments].join('/');

        return finalUrl;
    };
    const updateQuickSearchUrl = (selectedCommunity: string) => {
        const newUrl = constructQuickSearchQueryParams(selectedCommunity); 
        // Update the browser's address bar without reloading the page
        window.history.pushState(null, '', newUrl);
        if(origin=='home'){
        navigate(`${newUrl}`);
        }
    };
    const handleQuickSearchClick = (selectedCommunity: string) => {
        // setLoadingBtn(true); // Set loading to true
        if (setFormData) {
            setFormData({
                sectorType: formType,
                listingType: resType.toLowerCase(),
                propertyType: propertyType,
                community: selectedCommunity, // Use clicked value
                year: '',
                developer: '',
                minPrice: minPrice !== '0' ? Number(minPrice) : 0,
                maxPrice: maxPrice !== '0' ? Number(maxPrice) : 0,
                bedrooms: minBeds !== '0' ? String(minBeds) : '0',
            });
        }
        updateQuickSearchUrl(selectedCommunity);
        setTimeout(() => {
            // setLoadingBtn(false); // Reset loading after submission
        }, 2000);
    };
    // const handleReset = () => {
    //     setLoadingRefreshBtn(true); // Set loading to true
    //     setPropertyType('');
    //     setYear('');
    //     setCommunities([]);
    //     setDevelopers([]);
    //     setMinBaths(0);
    //     setMinPrice(0);
    //     setMaxPrice(0);
    //     setResType('ALL');
    //     setMinBeds(0);
    //     setDeveloper('');
    //     setCommunities([]);
    //     if (setFormData) {
    //     setFormData({
    //         sectorType: formType, // Residential or Commercial
    //         listingType: '', // sale or rent
    //         propertyType: '',
    //         community: '',
    //         year: ''  ,
    //         developer: ''  ,
    //         minPrice:   0,
    //         maxPrice:   0,
    //         bedrooms:  '0',
    //     });
    //     }
    //     let url_reset = (() => {
    //         switch (formType) {
    //             case 'sale': return '/for-sale';
    //             case 'rent': return '/for-rent';
    //             case 'offplan': return '/offplan-properties-for-sale';
    //             default: return '';
    //         }
    //     })();

    //     window.history.pushState(null, '', url_reset);
    //     setTimeout(() => {
             
    //         setLoadingRefreshBtn(false); // Reset loading after submission
    //     }, 2000); // Simulate 2-second delay (replace with actual submission logic)
    // };
    // Handle property selection
    const handlePropertySelect = (selectedType: string, id: string) => {
        setIsOpen(false);
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

            const communityList = [
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
            const bedsList = response.data?.minBeds?.map((item: any) => ({
                id: item.id,
                name: item.name
            })) || [];
            const bathList = response.data?.minBaths?.map((item: any) => ({
                id: item.id,
                name: item.name
            })) || [];
            response.data.sale?.minPrice || []
            const minPList = response.data.sale?.minPrice.map((item: any) => ({
                id: item.id,
                name: item.name
            })) || [];
            const minPriceRentList = response.data.rent?.minPrice.map((item: any) => ({
                id: item.id,
               
                name: item.name
            })) || [];
            // const offPlanPropertyList1 = response.data?.offpla_category.map((item: any) => ({
            //     id: item.id,

            //     name: item.name
            // })) || [];
            // const YearList = response.data?.year.map((item: any) => ({
            //     id: item.id,

            //     name: item.name
            // })) || [];
            // const dvelopersList = response.data?.developer_list.map((item: any) => ({
            //     id: item.id,

            //     name: item.name
            // })) || [];
            setMinPriceList(minPList);
            // setYears(YearList);
            // setOffplanPropertyList(offPlanPropertyList1)
            setMinRentPriceList(minPriceRentList)
            setBeds(bedsList);
            setBaths(bathList);
            setCommunities(communityList);
            setProperties(communityList);
            // setDevelopers(dvelopersList);
            setPropertyName('Property Type');
             
            setPropertyData({
                residential: response.data['residential'] || [],
                commercial: response.data['commercial'] || [],
                all: response.data['all'] || []
            });

            // Set the default property options based on the initial resType ('Residential')
            setPropertyOptions(response.data['residential'] || []);

        } catch (error) {
            setError('Error fetching properties data'); // Set error message
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            
            if (listRef.current) {
               
                
                if (!listRef.current.contains(event.target as Node)) {
                     setIsOpen(false);
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
    const segments = useMemo(() => {
        const paths = location.pathname.split("/").filter(Boolean); // remove empty
        const params: Record<string, string> = {};

        paths.forEach((segment) => {
        const [key, ...valueParts] = segment.split("-");
        if (key && valueParts.length > 0) {
            params[key] = valueParts.join("-");
        }
        });

        return params;
    }, [location.pathname]);
    useEffect(() => {
        if(origin=='list'){
            // Parse query parameters on page load
            // const urlParams = new URLSearchParams(window.location.search);
            const listingType = segments.listingType?.toLowerCase();
            const propertyTypeParam = segments.propertyType;
            const minPriceParam = segments.minPrice;
            const maxPriceParam = segments.maxPrice;
            const bedsParam = segments.beds;
            const bathsParam = segments.baths;
            const communityParam = segments.community;

            if (listingType) setResType(listingType === 'residential' ? 'Residential' : listingType === 'commercial' ? 'Commercial' : 'ALL');
            if (propertyTypeParam) setPropertyType(propertyTypeParam);
            if (communityParam) setCommunity(communityParam);
            if (minPriceParam) setMinPrice(minPriceParam);
            if (maxPriceParam) setMaxPrice(maxPriceParam);
            if (bedsParam) setMinBeds(bedsParam);
            if (bathsParam) setMinBaths(bathsParam);
        }
    }, []);
    return (
        <div className={`${origin === "home" ? "srch-form-home" : "list-search"} ${formType === "offplan" ? "off-p" : "list-buy"} rent-buy-search-form`}>
             
            <div className="top-filter-bar">
                {/* Form Type Switch (Sale or Rent) */}
                <ul className="item-srch-head top-left-filter-panel">
                    <li 
                        className={`${origin === 'list' && formType === 'offplan' ? 'hide' : ''} item-srch-head-items item-srch-head-btns hide-on-mobile-at-home`}
                    >
                        <FormControl fullWidth className="form-type-container">
                            <Select
                                value={formType}
                                onChange={(e) => handleFormTypeChange(e.target.value as 'sale' | 'rent' | 'offplan')}
                                displayEmpty
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <span>Select Form Type</span>;
                                    }
                                    return selected === 'sale' ? 'Buy' : selected === 'rent' ? 'Rent' : 'Off-Plan';
                                }}
                            >
                                <MenuItem value="sale">Buy</MenuItem>
                                <MenuItem value="rent">Rent</MenuItem>
                                <MenuItem value="offplan">
                                    <NavLink to="/offplan-properties-for-sale" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Off-Plan
                                    </NavLink>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </li>
                    {/* Autocomplete for Community */}
                    <li className="item-srch item-srch-autocomplete combo-autocomplete-input ">
                        <FormControl fullWidth className="form-type-selector">
                            <Autocomplete
                                multiple
                                value={communities.filter(c => community.split('-and-').includes(c.id)) || []}
                                onChange={(_event, value) => {
                                    const selectedIds = value.map(v => v.id).join('-and-');
                                    setCommunity(selectedIds);
                                }}
                                limitTags={1}
                                options={communities}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.uid} style={{ fontSize: '14px' }}>  {/* Reduced font size */}
                                        {option.name}
                                    </li>
                                )}
                                getOptionLabel={(option) => option.name || ''}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={community ? '' : "City, building or community"} // Hide label if community is selected
                                        placeholder="Add"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                    </li>
                </ul>

                <ul className="item-srch-head top-right-filter-panel">
                    <li
                        className={`item-srch item-srch-residential hide-on-mobile-at-home`}
                        ref={listRef}
                        id="pids"
                    >
                        <FormControl fullWidth className="property-type-selector">
                            <div className={`property-type-container ${isOpen ? 'open' : ''}`}>
                                <div className="property-type-header" onClick={() => {
                                    const willOpen = !isOpen;
                                    setIsOpen(willOpen);
                                    if(resType=='ALL'){
                                        handleTabClick("Residential");
                                    }else{
                                        handleTabClick(resType);
                                    }
                                
                                }}>
                                    <span>{propertyName  ? propertyName : 'Property Type'}</span>
                                    <span className={`arrow ${isOpen ? 'to-top' : ''}`}><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1umw9bq-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon"><path d="M7 10l5 5 5-5z"></path></svg></span>
                                </div>

                                {isOpen && (
                                    <>
                                        <div className="property-popup">
                                            <div className="sub-relative">
                                        <Tabs
                                            value={resType}
                                            onChange={handleResTypeChange}
                                            aria-label="Property Type Tabs"
                                            indicatorColor="primary"
                                            textColor="primary"
                                        >
                                            <Tab
                                                label={propertyName && resType === 'Residential' ? propertyName : 'Residential'}
                                                value="Residential"
                                                onClick={() => handleTabClick("Residential")}
                                            />
                                            <Tab
                                                label={propertyName && resType === 'Commercial' ? propertyName : 'Commercial'}
                                                value="Commercial"
                                                onClick={() => handleTabClick("Commercial")}
                                            />
                                        </Tabs>
                                        
                                        {showPropertyList && resType && (
                                            <div className="inneritems">
                                                {loading ? (
                                                    <div>Loading...</div>
                                                ) : error ? (
                                                    <div style={{ color: 'red' }}>{error}</div>
                                                ) : propertyOptions.length === 0 ? (
                                                    <p>No {resType} property options available.</p>
                                                ) : (
                                                    <List>
                                                        {propertyOptions.map(({ id, name }) => (
                                                            <ListItemButton key={id} onClick={() => handlePropertySelect(name, id)}>
                                                                {name}
                                                            </ListItemButton>
                                                        ))}
                                                    </List>
                                                )}
                                            </div>
                                        )}
                                            </div>
                                        <div className="clearfix"></div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </FormControl>
                    </li>

                    {/* Price Range Dropdowns */}
                    <li 
                        className={`${origin == 'home' && formType == 'offplan' ? 'hide' : ''}      item-srch hide-on-mobile-at-home`}
                    >
                        <FormControl fullWidth className="min-price-selector">
                            <InputLabel>Min Price(AED)</InputLabel>
                            <Select
                                value={minPrice}
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                label="Min Price(AED)"
                            >
                                {(formType == 'sale' || formType == 'offplan') && minPriceList && minPriceList.map(({ id, name }) => (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                                {formType == 'rent' && minRentPriceList && minRentPriceList.map(({ id, name }) => (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </li>

                    <li 
                        className={`${origin == 'home' && formType == 'offplan' ? 'hide' : ''}      item-srch hide-on-mobile-at-home`}
                    >
                        <FormControl fullWidth className="max-price-selector">
                            <InputLabel>Max Price(AED)</InputLabel>
                            <Select
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                label="Max Price(AED)"
                            >
                                {(formType == 'sale' || formType == 'offplan') && minPriceList && minPriceList.map(({ id, name }) => (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                                {formType == 'rent' && minRentPriceList && minRentPriceList.map(({ id, name }) => (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </li>

                    {/* Beds Dropdown */}
                    {origin=='list' && formType!="offplan" && (
                        <>
                        <li className="item-srch hide-on-mobile-at-home">
                            <FormControl fullWidth className="min-bed-selector">
                                <InputLabel>Bedrooms</InputLabel>
                                <Select
                                    value={minBeds}
                                    onChange={(e) => setMinBeds(Number(e.target.value))}
                                    label="Min Beds"
                                >
                                    
                                    {beds && beds.map(({ id, name }) => (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                
                                </Select>
                            </FormControl>
                        </li>

                        {/* Baths Dropdown */}
                        <li className="item-srch hide-on-mobile-at-home">
                            <FormControl fullWidth className="min-bath-selector">
                                <InputLabel>Min Baths</InputLabel>
                                <Select
                                    value={minBaths}
                                    onChange={(e) => setMinBaths(Number(e.target.value))}
                                    label="Min Baths"
                                >
                                    {baths && baths.map(({ id, name }) => (
                                        <MenuItem key={id} value={id}>
                                            {name}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </li>
                        </>
                    )}

                    {/* Submit Button */}
                    <li className="item-srch item-srch-submit">
                        <IconButton className='search-submit' aria-label="delete" {...(origin === 'list' ? { onClick: handleClick } : { onClick: handleClick })}>
                            <SearchIcon />
                        </IconButton>
                    </li>
                
                </ul>
            </div>

            <div className='quick-filter-pan'>
                    {/* Autocomplete for Community */}
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10} // Increased space between slides for flexibility
                        slidesPerView="auto" // Allows flexible number of slides per view
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }} 
                        direction="horizontal"
                        breakpoints={{
                            912: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 15 },
                            1200: { slidesPerView: 4, spaceBetween: 15 },
                        }}
                    >
                         {properties.map((property) => (
                            <SwiperSlide key={property.name} style={{ flex: '0 0 auto' }}> {/* Ensures flexible width */}
                                <NavLink 
                                    to={`?community=${property.id}`} 
                                    className={`item-slide ${community.split('-and-').includes(property.id) ? 'filter-active' : ''}`} 
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent default navigation
                                        handleQuickSearchClick(property.id); // Trigger handleClick to refresh the page
                                        const element = e.currentTarget;
                                        const activeElements = document.querySelectorAll('.filter-active');
                                        activeElements.forEach(el => el.classList.remove('filter-active')); // Remove the class from all elements
                                        element.classList.add('filter-active'); // Apply the class to the clicked element
                                        setCommunity(property.id);
                                        handleQuickSearchClick(property.id); // Trigger handleClick to refresh the page
                                    }}
                                > 
                                    <div className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-2 py-1 rounded">
                                        {property.name}
                                    </div>
                                </NavLink>
                            </SwiperSlide>
                        ))}
                        <div className="swiper-nav">
                            <div className="swiper-button-prev swiper-arrows">
                                <i className="bi bi-arrow-left"></i>
                            </div>
                            <div className="swiper-button-next swiper-arrows">
                                <i className="bi bi-arrow-right"></i>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </Swiper>
            </div>
             
        </div>
    );
};

export default PropertyFormNew;