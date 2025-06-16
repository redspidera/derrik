import React, { useState, useEffect, useRef } from 'react';
import TeamCard, { BlogData } from './TeamCard';
import NoData from './NoData';
import FullPageLoader from '@/components/utility/FullPageLoader';
import TeamFilter from './TeamFilter.tsx';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
 Typography, Link, Box
} from '@mui/material';
interface DepartmentOption {
    value: string;
    label: string;
}

interface ApiResponse {
    data: {
        count: string;
        title: string;
        sub_title: string;
        title_page: string;
        total_pages: number;
        current_page: number;
        banner_image: string;
        contact_phone: string;
        contact_format: string;
        next_page: number | null;
        prev_page: number | null;
        records: BlogData[];
        departments: DepartmentOption[];
    };
}

interface BlogListProps {
    apiUrl: string;
}

interface FormData {
    department: string;
}

const TeamsListings: React.FC<BlogListProps> = ({ apiUrl }) => {
    const [loading, setLoading] = useState(false);
    const [contact_phone, setContact_phone] = useState<string | null>(null);
    const [title_page, setTitle_page] = useState<string | null>(null);
    const [contact_format, setContact_format] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({ department: '' });
    const [departments, setDepartments] = useState<DepartmentOption[]>([
        { value: '', label: 'Select Department' },
    ]);
    const [fetchedProperties, setFetchedProperties] = useState<BlogData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [title, setTitle] = useState('Our Teams');
    const [subTitle, setSubTitle] = useState('');
    const [banner, setBanner] = useState('');
    const [propertyCount, setPropertyCount] = useState<number>(0);

    const previousFormDataRef = useRef<FormData>(formData);
    const previousPageRef = useRef<number>(0);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setFormData({ department: params.get('department') || '' });
        setCurrentPage(Number(params.get('page')) || 1);
    }, []);

    useEffect(() => {
        if (
            formData.department !== previousFormDataRef.current.department ||
            currentPage !== previousPageRef.current
        ) {
            previousFormDataRef.current = formData;
            previousPageRef.current = currentPage;
            fetchProperties();
        }
    }, [formData, currentPage]);

    const fetchProperties = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                department: formData.department || '',
                page: currentPage.toString(),
            });

            const response = await fetch(`${apiUrl}?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch properties');

            const result: ApiResponse = await response.json();
            const { records, departments, title, sub_title, count, banner_image } = result.data;

            setFetchedProperties(records || []);
            setDepartments(departments);
            setTitle(title || 'Our Teams');
            setSubTitle(sub_title || '');
            setBanner(banner_image || '');
            setPropertyCount(Number(count) || 0);

            setContact_phone(result.data.contact_phone || '');
            setContact_format(result.data.contact_format || '');
            setTitle_page(result.data.title_page || '');
        } catch (err) {
            console.error(err);
            setError('Failed to load data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        const params = new URLSearchParams({ department: value, page: '1' });
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
        setCurrentPage(1);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchProperties();
    };

    return (
        <div>
           
            <div className="hide section-dark page-banner list-banner-home for-listing-page more-height half-height sect-blog">
                <div className="full-block page-banner-image" style={{ backgroundImage: `url(${banner})` }} />
                <div className="full-block overlay" />
                <div className="container h-100-per">
                    <div className="row disp-table h-100-per">
                        <div className="col-sm-12 h-100-per">
                            <div className="page-banner-content">
                                <div className="text-in-writer">
                                    <div className="fancy-title-hold text-left clearfix">
                                        <h2 className="fancy-title">
                                            {title}
                                            <span className="sub-title-fnt">{subTitle}</span>
                                        </h2>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <Helmet>
                <title>{title}</title>
            </Helmet>

            <div id="blog" className="section blog list-project ">
                <div className="container">
                 
                    <Box sx={{ px: 0, pb: 6, maxWidth: 800, mx: 'auto 0 0 0' }}>
                        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom sx={{ color: '' }}>
                            {title_page}
                        </Typography>



                        <Typography variant="body1">
                            Looking for expert real estate advice? Call us at{' '}
                            <Link href={`tel:${contact_phone}`} underline="hover" color="primary">
                                {contact_format}
                            </Link>{' '}
                            to speak with our customer service team, or{' '}
                            <NavLink to="/contact-us" color="primary">
                                contact us
                            </NavLink>{' '}
                            today.
                        </Typography>
                    </Box>
                    <div className="property-search property-search-full property-depart-form">
                        <TeamFilter
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            setFormData={setFormData}
                            departments={departments}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}

                    <div className="row mb10">
                        <div className="col-12">
                            {fetchedProperties.length > 0 && (
                                <p className="text-right pr15 hide d-none">{propertyCount} records found</p>
                            )}
                        </div>
                    </div>

                    <div className="row article gy-4 posts-list grid ">
                        {loading ? (
                            <>
                                <FullPageLoader /> 
                            </>
                        ) : (
                                <>
                                    <div className="clearfix"></div>
                                    <div className="mt50">
                                        <div className="clearfix"></div>
                                    </div>
                                    <div className="clearfix"></div>
                                <div className="inf-its row team-u  mb50 ">
                                {fetchedProperties.length > 0 ? (
                                    fetchedProperties.map((property, index) => (
                                        <TeamCard key={`${property.id}-${index}`} member={property} />
                                    ))
                                ) : (
                                    <NoData />
                                )}
                                
                            </div>
                                </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamsListings;
