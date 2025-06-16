import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, Button } from '@mui/material';
import axios from 'axios';
import { API_URL } from '@/Constants';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';
import PropertyFilterSidebar, { initialFilters, Filters, TourType } from '../filter/FilterDropdown';
import BedBathFilter from '../filter/BedBathFilter';
import PriceFilter from '../filter/PriceFilter';
import PropertyTypeMenu from '../filter/PropertyTypeMenu';
import YearsFilter from '../filter/YearsFilter';
import SectionDropDown from '../filter/sectionDropDown';
import PropertyStatusFilter from '../filter/PropertyStatusFilter';

import { NavLink } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useLocation } from 'react-router-dom';
interface PropertyFormFormData {
    sectorType: string;
    listingType: string;
    propertyType: string;
    furnishing: string;
    community: string;
    minPrice: number;
    maxPrice: number;
    areaMin: number;
    keywords: string;
    areaMax: number;
    bedrooms: string;
    amenities: string;
    tourTypes: string;
    bathrooms: string;
    developer: string;
    year: string;
    occupant_status: string;
}

type PropertyFormProps = {
    origin: string;
    setFormData?: React.Dispatch<React.SetStateAction<PropertyFormFormData>> | null;
    onSearchComplete?: () => void;
}; 
type Amenities = string;
type Developer = string;
const language = '';
const PropertyForm = ({ origin, setFormData, onSearchComplete }: PropertyFormProps) => {
    const navigate = useNavigate();
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [amenities, setAmenities] = React.useState<Record<string, string> | null>(null);
    const [developers, setDevelopers] = React.useState<Record<string, string> | null>(null);
    const [loadingRefreshBtn, setLoadingRefreshBtn] = useState<boolean>(false);
    //const listRef = useRef<HTMLLIElement>(null);
    //const [isOpen, setIsOpen] = useState(false);
    const parseFiltersFromPath = (path: string): Partial<Filters> => {
        const segments = path.split('/');
        const filterObj: Partial<Filters> = {};

        segments.forEach((segment) => {
            if (segment.startsWith('areaMin-')) {
                filterObj.areaMin = segment.replace('areaMin-', '');
            } else if (segment.startsWith('areaMax-')) {
                filterObj.areaMax = segment.replace('areaMax-', '');
            } 
         
            else if (segment.startsWith('amenities-')) {
                const amenitiesString = decodeURIComponent(segment.replace('amenities-', ''));
               
                filterObj.amenities = amenitiesString ? amenitiesString.split(',') : []; 
                console.log( (filterObj.amenities));
             
            }
            else if (segment.startsWith('keywords-')) {
                filterObj.keywords = decodeURIComponent(segment.replace('keywords-', ''));
            } else if (segment.startsWith('developer-')) {
                const developerString = decodeURIComponent(segment.replace('developer-', ''));
              
                filterObj.developer = developerString.split(',') as Developer[];
                console.log('developerString'); console.log(filterObj.developer); console.log('developerString'); 
            }
             else if (segment.startsWith('furnishing-')) {
                filterObj.furnishing = decodeURIComponent(segment.replace('furnishing-', ''));
            } else if (segment.startsWith('tourTypes-')) {
                const typesString = decodeURIComponent(segment.replace('tourTypes-', ''));
                filterObj.tourTypes = typesString.split(',') as TourType[];
            }
            else if (segment.startsWith('amenities-')) {
                const amenitiesString = decodeURIComponent(segment.replace('amenities-', ''));
                filterObj.amenities = amenitiesString.split(',') as Amenities[];
            }
        });

        return filterObj;
    };
    const location = useLocation();

    const defaultFilters = React.useMemo(() => parseFiltersFromPath(location.pathname), [location.pathname]);

    const handleFilterChange = (newFilters: Partial<Filters>) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            areaMin: newFilters.areaMin ?? prevFilters.areaMin,
            areaMax: newFilters.areaMax ?? prevFilters.areaMax,
            keywords: newFilters.keywords ?? prevFilters.keywords,
            developer: newFilters.developer ?? prevFilters.developer,
            tourTypes: newFilters.tourTypes ?? prevFilters.tourTypes,
            amenities: newFilters.amenities ?? prevFilters.amenities,
            furnishing: newFilters.furnishing ?? prevFilters.furnishing,

        }));
        console.log('Filters updated in parent111:', filters);
        // your logic here
    };

    const path = window.location.pathname;
    const sec = (Object.entries({
        '/for-rent': 'rent',
        '/for-sale': 'sale',
        '/offplan-properties-for-sale': 'offplan'
    }).find(([key]) => path.includes(key))?.[1] || 'sale') as 'sale' | 'rent' | 'offplan';
    const [communityMultiple, setCommunityMultiple] = useState<string>('');
    const [communitiesMultiple, setCommunitiesMultiple] = useState<{ id: string, name: string, uid: string }[]>([]);

    const listingMatch = path.match(/listingType-([^/]+)/);
    const propertyMatch = path.match(/propertyType-([^/]+)/);
    const statusMatch = path.match(/status-([^/]+)/);
    const minPriceMatch = path.match(/minPrice-([^/]+)/);
    const maxPriceMatch = path.match(/maxPrice-([^/]+)/);
    const match = path.match(/community-([^/]+)/);
    const communityIdsStr = match ? match[1] : '';
 
    const amenitiesMatch = path.match(/amenities-([^/]+)/);
    const amenitiesString = amenitiesMatch ? amenitiesMatch[1] : '';
    const amenitiesArray = amenitiesString ? amenitiesString.split(',') : [];
 
    const developerMatch = path.match(/developer-([^/]+)/);
    const developerMatchString = developerMatch ? developerMatch[1] : '';
    const developeArray = developerMatchString ? developerMatchString.split(',') : [];

    const areaMinMatch = path.match(/areaMin-([^/]+)/);
    const areaMaxMatch = path.match(/areaMax-([^/]+)/);
    const areaMinMatchInitial = areaMinMatch ? areaMinMatch[1] : '';
    const areaMaxMatchInitial = areaMaxMatch ? areaMaxMatch[1] : '';

const listingTypeInitial = listingMatch ? listingMatch[1] : '';
    const propertyTypeInitial = propertyMatch ? propertyMatch[1] : '';
    const statusMatchInitial = statusMatch ? statusMatch[1] : 'All';

    const minPriceMatchInitial = minPriceMatch ? minPriceMatch[1] : '';
    const maxPriceMatchInitial = maxPriceMatch ? maxPriceMatch[1] : '';

    const bedsMatch = path.match(/beds-([^/]+)/);
    const bathsMatch = path.match(/baths-([^/]+)/);

    // If matched, split by comma, else empty array
    const bedsMatchInitial = bedsMatch ? bedsMatch[1].split(',') : [];
    const bathsMatchInitial = bathsMatch ? bathsMatch[1].split(',') : [];

    const [beds, setBeds] = useState<string[]>(bedsMatchInitial);
    const [baths, setBaths] = useState<string[]>(bathsMatchInitial);

    const [formType, setFormType] = useState<'sale' | 'rent' | 'offplan'>(sec);
    const [resType, setResType] = useState<string>(listingTypeInitial);
    const [propertyData, setPropertyData] = useState<{ residential: any[], commercial: any[] }>({ residential: [], commercial: [] });

    const [filters, setFilters] = useState<Partial<Filters>>({
        areaMin: areaMinMatchInitial,
        areaMax: areaMaxMatchInitial,
        keywords: '',
        developer: developeArray,
        tourTypes: [],
        amenities: amenitiesArray,
        furnishing: '',
    });
    
    const [status, setStatus] = useState<string>(statusMatchInitial);

    const [community, setCommunity] = useState<string>('');
     const [propertyType, setPropertyType] = useState<string>(propertyTypeInitial);
    //const [showPropertyList, setShowPropertyList] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>(minPriceMatchInitial);
    const [maxPrice, setMaxPrice] = useState<string>(maxPriceMatchInitial);
    const [properties, setProperties] = useState<{ id: string, name: string, uid: string }[]>([]);

    // const [communities, setCommunities] = useState<{ id: string, name: string, uid: string }[]>([]);
   const [years, setYears] = useState<{ id: string, name: string }[]>([{ id: '0', name: 'All Completion' }]);
    //const [propertyOptions, setPropertyOptions] = useState<any[]>([]);

    const [labels, setLabels] = useState<{ [key: string]: string }>({});
    const options = [
        { key: 'sale', value: labels.buy || 'Buy' },
        { key: 'rent', value: labels.rent || 'Rent' },
        { key: 'offplan', value: labels.offplan || 'Off-Plan' },
    ];
    const initialMinPrice = minPrice;
    const initialMaxPrice = maxPrice;

    const handleFilterPriceChange = (filters: { minPrice: string; maxPrice: string }) => {

        setMinPrice(filters.minPrice);
        setMaxPrice(filters.maxPrice);
        console.log('Filters updated:', filters);
    };
    const handleFormTypeChange = (value: 'sale' | 'rent' | 'offplan') => {
        setFormType(value);
    };
    //const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
    const handlePropertyTypeSelect = (
        category: string,
        value: { id: string; name: string } | null
    ) => {
        setResType(category);

        if (value) {
            setPropertyType(value.id);
        } else {
            setPropertyType(''); // or '' or whatever your default is
        }

        console.log('Selected:', category, value);
    };





    const handleBedFilterChange = (filters: { propertyBeds: string[]; propertyBath: string[] }) => {
        setBaths(filters.propertyBath);
        setBeds(filters.propertyBeds);
        // do something with updated filters
    };

    /*
    const handleCommunityChange = (_: any, value: { id: string; name: string } | null) => {
        setCommunity(value ? value.id : '');
    };
    */
    const constructQueryParams = () => {
      
        const segments = [];
        const urlBase = (() => {
            switch (formType) {
                case 'sale': return 'for-sale';
                case 'rent': return 'for-rent';
                case 'offplan': return 'offplan-properties-for-sale';
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
            
            if (status) segments.push(`status-${status}`);
            if (minPrice) segments.push(`minPrice-${minPrice}`);
            if (maxPrice) segments.push(`maxPrice-${maxPrice}`);

            if (beds && beds.length > 0) {
                const bedsSegment = Array.isArray(beds) ? beds.join(',') : beds;
                segments.push(`beds-${bedsSegment}`);
            }

            if (baths && baths.length > 0) {
                const bathsSegment = Array.isArray(baths) ? baths.join(',') : baths;
                segments.push(`baths-${bathsSegment}`);
            }
            if (filters.areaMin) segments.push(`areaMin-${filters.areaMin}`);
            if (filters.areaMax) segments.push(`areaMax-${filters.areaMax}`);
            if (filters.keywords) segments.push(`keywords-${encodeURIComponent(filters.keywords)}`);
            if (filters.furnishing) segments.push(`furnishing-${encodeURIComponent(filters.furnishing)}`);

            if (filters.tourTypes && filters.tourTypes.length > 0) {
                segments.push(`tourTypes-${encodeURIComponent(filters.tourTypes.join(','))}`);
            }
            if (filters.developer && filters.developer.length > 0) {
                segments.push(`developer-${encodeURIComponent(filters.developer.join(','))}`);
            }
            if (filters.tourTypes && filters.tourTypes.length > 0) {
                segments.push(`tourTypes-${encodeURIComponent(filters.tourTypes.join(','))}`);
            }
            if (filters.amenities && filters.amenities.length > 0) {
                segments.push(`amenities-${encodeURIComponent(filters.amenities.join(','))}`);
            }
        }

        const langPrefix = '';
        const finalUrl = [langPrefix, urlBase, ...segments].join('/').replace(/\/+/g, '/');
        return finalUrl;
    };

    const updateUrl = () => {
        const newUrl = constructQueryParams();
        window.history.pushState(null, '', newUrl);
        if (onSearchComplete) {

            window.location.href = newUrl;
        }
        if (origin === 'home') navigate(`${newUrl}`);
    };


    const handleClick = () => {
        setLoadingBtn(true);
       
        if (setFormData) {
            if (formType === 'offplan') {
                setFormData({
                    sectorType: formType,
                    listingType: '',
                    propertyType: '',
                    community,
                    year,
                    minPrice: 0,
                    maxPrice: 0,
                    areaMin: 0,
                    areaMax: 0,
                    bedrooms: beds.join(' | '), 
                    bathrooms: baths.join(' | '), 
                    developer: filters.developer ? filters.developer.join(',') : '',
                    furnishing: filters.furnishing ? filters.furnishing : '' ,
                    keywords: filters.keywords ? filters.keywords : '' ,
                    amenities: filters.amenities ? filters.amenities.join(',') : '',
                    tourTypes: filters.tourTypes ? filters.tourTypes.join(',') : '',
                    occupant_status: status,
                });
            } else {
                setFormData({
                    sectorType: formType,
                    listingType: resType.toLowerCase(),
                    propertyType,
                    community: communityMultiple,
                    year: '',
                    minPrice: Number(minPrice) || 0,  
                    maxPrice: Number(maxPrice) || 0,  
                    areaMin: Number(filters.areaMin) || 0,
                    areaMax: Number(filters.areaMax) || 0,
                    bedrooms: beds.join(' | '), 
                    bathrooms: baths.join(' | '), 
                    
                    furnishing: filters.furnishing ? filters.furnishing : '',
                    keywords: filters.keywords ? filters.keywords : '',
                    developer: filters.developer ? filters.developer.join(',') : '',
                    amenities: filters.amenities ? filters.amenities.join(',') : '',
                    tourTypes: filters.tourTypes ? filters.tourTypes.join(',') : '',
                    occupant_status: status,
                });
            }
        }
        updateUrl();
        if (onSearchComplete) {
            
            onSearchComplete();
        }
        setTimeout(() => setLoadingBtn(false), 2000);
    };

    const handleReset = () => {
        setLoadingRefreshBtn(true);
        setPropertyType('');
        setYear('');
        setResType('ALL');
        setBeds([]);
        setBaths([]);
        setStatus('');
        setMinPrice('');
        setMaxPrice('');
        setFilters(initialFilters);
        //setCommunities([]);
        if (setFormData) {
            setFormData({
                sectorType: formType,
                listingType: '',
                propertyType: '',
                community: '',
                year: '',
                developer: '',
                minPrice: 0,
                maxPrice: 0,
                areaMin: 0,
                areaMax: 0,
                bedrooms: '0',
                bathrooms: '0',
                amenities:   '',
                tourTypes:   '',
                keywords:   '',
                furnishing:   '',
                occupant_status: status,
            });
        }

        const url_reset = (() => {
            const langPrefix = '';
            const base = (() => {
                switch (formType) {
                    case 'sale': return 'for-sale';
                    case 'rent': return 'for-rent';
                    case 'offplan': return 'offplan-properties-for-sale';
                    default: return '';
                }
            })();
            return `${langPrefix}/${base}`.replace(/\/+/g, '/');
        })();

        window.history.pushState(null, '', url_reset);
        setTimeout(() => setLoadingRefreshBtn(false), 2000);
    };

    const loadPropertiesData = async () => {


        try {
            const response = await axios.get(`${API_URL}fetch_types/`);
            const communityList = response.data?.communities?.map((item: any) => ({
                id: item.id,
                uid: item.uid,
                name: item.name
            })) || [];
            const YearList = response.data?.year?.map((item: any) => ({
                id: item.id,
                name: item.name
            })) || [];

            const communityMultipleList = [
                ...communityList,
                ...response.data?.subCommunities || [],
                ...response.data?.propertyNameList || [],
            ].map((item: any) => ({ id: item.id, uid: item.uid, name: item.name }));
          
           
            setAmenities(response.data?.amenities);
            setDevelopers(response.data?.developer_list);

            setYears(YearList);
            // setCommunities(communityList);
            setProperties(communityList);
          
            setCommunitiesMultiple(communityMultipleList);
            if (communityMultipleList) {
                 
                setCommunityMultiple(communityIdsStr);
              
            }
            setPropertyData({
                residential: response.data['residential'] || [],
                commercial: response.data['commercial'] || [],

            });
         
            console.log(propertyData);
            if (response.data?.labels) {
                setLabels(response.data.labels);
            }
        } catch (error) {
            console.error('Error loading properties data:', error);
        } finally {

        }
    };

    useEffect(() => {
        loadPropertiesData();
    }, [language]);

    if (origin === 'list') {
        useEffect(() => {
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
        <>

            <div className={`${origin === "home" ? "srch-form-home" : "srch-form-home"} ${formType === "offplan" ? "off-p" : "list-buy"} home-filter-panel`}>
                <ul
                    className={`${origin === "home" ? "" : "at-list"}   item-srch-flex item-srch-head home-search-bar in-a-row`}
                >
                    <li className={`${origin === 'list1' ? 'hide' : ''} item-srch-head-items item-srch-head-btns`}>
                        <Button
                            className={`${origin === 'list' && formType === 'offplan' ? 'hide' : ''}`}
                            onClick={() => handleFormTypeChange('sale')} variant={formType === 'sale' ? 'contained' : 'outlined'}>
                            {labels.buy || 'Buy'}
                        </Button>
                        <Button
                            className={`${origin === 'list' && formType === 'offplan' ? 'hide' : ''}`}
                            onClick={() => handleFormTypeChange('rent')} variant={formType === 'rent' ? 'contained' : 'outlined'}>
                            {labels.rent || 'Rent'}
                        </Button>
                        <Button
                            onClick={() => handleFormTypeChange('offplan')}
                            variant={formType === 'offplan' ? 'contained' : 'outlined'}
                            className={`${origin === 'list' && formType !== 'offplan' ? 'hide' : ''}`}
                        >
                            {labels.offplan || 'Off-Plan'}
                        </Button>
                    </li>
                    <li className={`${origin === 'list1' ? '' : 'hide'}`}>
                        <SectionDropDown
                            value={formType}
                            onChange={(value: string) => setFormType(value as "sale" | "rent" | "offplan")}
                            options={options}
                        />
                    </li>

                    <li className="item-srch item-srch-autocomplete combo-autocomplete-input hide-on-mobile-at-home">
                        <Autocomplete
                            multiple
                            value={communitiesMultiple.filter(c => communityMultiple.split('-and-').includes(c.id)) || []}
                            onChange={(_, value) => {
                                const selectedIds = value.map(v => v.id).join('-and-');
                                setCommunityMultiple(selectedIds);
                            }}
                            limitTags={1}
                            options={communitiesMultiple}
                            renderOption={(props, option) => (
                                <li
                                    {...props}
                                    key={option.uid}
                                    style={{
                                        fontFamily: "var(--font-1), sans-serif",  // your desired font here
                                        fontSize: '13px',                    // adjust font size
                                        fontWeight: 400,
                                    }}
                                >
                                    {option.name}
                                </li>
                            )}
                            getOptionLabel={(option) => option.name || ''}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                                <TextField {...params} label={labels.community || "City, building or community"} variant="outlined" fullWidth />
                            )}
                        />

                    </li>
                    <li className="item-srch item-srch-submit">
                        <Button
                            onClick={handleClick}
                            className="submit-button"
                            startIcon={!loadingBtn && <SearchIcon />}
                            disabled={loadingBtn}
                        >
                            {loadingBtn ? <><CircularProgress size={20} color="inherit" style={{ marginRight: '8px' }} /> {labels.search || "SEARCH"}</> : (labels.search || "SEARCH")}
                        </Button>
                        {origin === 'list1' && (
                            <Button
                                className="refresh-button"
                                variant="contained"
                                color="secondary"
                                startIcon={!loadingRefreshBtn && <RefreshIcon />}
                                disabled={loadingRefreshBtn}
                                onClick={handleReset}
                                sx={{
                                    opacity: 0.7,
                                    maxWidth: 50,
                                    minWidth: 50,
                                    '&:hover': { opacity: 1 },
                                }}
                            >
                                {loadingRefreshBtn ? <><CircularProgress size={20} color="inherit" style={{ marginRight: '8px' }} /> </> : ''}
                            </Button>
                        )}
                    </li>
                </ul>
                <ul className="item-srch-flex item-srch-head home-search-bar second">

                    <li>

                        <PropertyTypeMenu listingTypeValue={resType} propertyTypeValue={propertyType} data={propertyData} onSelect={handlePropertyTypeSelect} />

                    </li>
                    {formType === 'sale' && (
                        <>
                            <li className="item-srch f-btn ">

                                <PropertyStatusFilter selected={status} onChange={setStatus} />
                            </li>
                        </>
                    )}
                    {formType === 'offplan' && (
                        <>
                            <li className="item-srch f-btn ">
                                <YearsFilter
                                    yearOptions={years}
                                    onFilterChange={(selectedYearIds) => {
                                        console.log('Selected year IDs:', selectedYearIds);
                                    }}

                                />
                            </li>
                            {/** 
                        <li className="item-srch item-srch-autocomplete hide-on-mobile-at-home">
                            <Autocomplete
                                value={communities.find(c => c.id === community) || null}
                                onChange={handleCommunityChange}
                                options={communities}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.uid}>{option.name}</li>
                                )}
                                getOptionLabel={(option) => option.name || ''}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                    <TextField {...params} label={labels.community || "Community"} variant="outlined" fullWidth />
                                )}
                            />
                        </li>
                        */}
                        </>
                    )}
                    <li className="item-srch f-btn ">
                        <PriceFilter
                            initialMinPrice={initialMinPrice}
                            initialMaxPrice={initialMaxPrice}
                            onFilterChange={handleFilterPriceChange}
                        />



                    </li>

                    <li className="item-srch f-btn ">
                        <BedBathFilter
                            initialBeds={beds}
                            initialBaths={baths}
                            onFilterChange={handleBedFilterChange}
                        />


                    </li>
                    <li className="item-srch f-btn ">

                        <PropertyFilterSidebar
                            developers={developers || {}}
                            amenities={amenities || {}}
                            defaultFilters={defaultFilters}
                            onFilterChange={handleFilterChange}
                        />
                        <div className="hidden d-none">

                        </div>

                    </li>

                </ul>
            </div>
            {
                origin === 'list' && (
                    <div className='quick-filter-pan hide'  >
                        {/* Autocomplete for Community */}
                        <div className="padder-30">
                            <div className="swiper-container-wrapper position-relative">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={10}
                                    slidesPerView="auto"
                                    navigation={{
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                    }}
                                    direction="horizontal"
                                    breakpoints={{
                                        912: { slidesPerView: 3, spaceBetween: 20 },
                                        1024: { slidesPerView: 8, spaceBetween: 15 },
                                        1200: { slidesPerView: 6, spaceBetween: 15 },
                                    }}
                                >
                                    {properties.map((property) => (
                                        <SwiperSlide key={property.name} style={{ flex: '0 0 auto' }}>
                                            <NavLink
                                                to={`?community=${property.id}`}
                                                className={`item-slide ${community.split('-and-').includes(property.id) ? 'filter-active' : ''
                                                    }`}
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <div className="badge bg-warning text-dark position-absolute top-0 start-0 m-2 px-2 py-1 rounded">
                                                    {property.name}
                                                </div>
                                            </NavLink>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* Navigation arrows moved outside */}
                                <div className="swiper-nav">
                                    <div className="swiper-button-prev swiper-arrows">
                                        <i className="bi bi-arrow-left"></i>
                                    </div>
                                    <div className="swiper-button-next swiper-arrows">
                                        <i className="bi bi-arrow-right"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
        </>

    );
};

export default PropertyForm;
