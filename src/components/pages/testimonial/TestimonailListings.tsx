import React, { useState, useEffect, useRef } from 'react';
import TestimonialCardNew from './TestimonialCardNew';
import { Helmet } from 'react-helmet';
import { Grid } from '@mui/material';

// BlogData type with necessary fields
export interface BlogData {
  id: string;
  image: string;
  Title: string;
  adTitle: string;
  DetailUrl: string;
  ShortDescription: string;
}

interface ApiResponse {
  data: {
    count: string;
    title: string;
    total_pages: number;
    current_page: number;
    banner_image: string;
    next_page: number | null;
    prev_page: number | null;
    records: BlogData[];
  };
}

interface BlogListProps {
  apiUrl: string;
}

interface FormData {
  keyword: string;
}

const TestimonailListings: React.FC<BlogListProps> = ({ apiUrl }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedProperties, setFetchedProperties] = useState<BlogData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ keyword: '' });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const previousPageRef = useRef<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [title, setTitle] = useState<string>('Blog : News & Trends');
  const [banner, setBanner] = useState<string>('/img/blog.jpg');
  const [propertyCount, setPropertyCount] = useState<number>(0);

  const formDataRef = useRef(formData);
  const previousFormDataRef = useRef<FormData>(formData);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData({ keyword: params.get('keyword') || '' });
    setCurrentPage(Number(params.get('page')) || 1);
  }, []);

  useEffect(() => {
    if (formData.keyword !== previousFormDataRef.current.keyword) {
      fetchProperties();
      previousFormDataRef.current = formData;
    }
  }, [formData, currentPage]);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        keyword: formData.keyword,
        page: currentPage.toString(),
      });
      const url = `${apiUrl}?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch properties');
      const data: ApiResponse = await response.json();

      setFetchedProperties(data.data.records || []);
      setTotalPages(data.data.total_pages);
      if (data.data.banner_image) setBanner(data.data.banner_image);
      setTitle(data.data.title || 'Blog : News & Trends');
      setPropertyCount(Number(data.data.count) || 0);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const params = new URLSearchParams(window.location.search);
      params.set('page', page.toString());
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (currentPage !== previousPageRef.current) {
      previousPageRef.current = currentPage;
      fetchProperties();
    }
  }, [currentPage]);

  return (
    <div>
      <div className="hide section-dark page-banner list-banner-home for-listing-page more-height google_review">
        <div
          className="full-block page-banner-image"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="full-block overlay"></div>
        <div className="container h-100-per">
          <div className="row disp-table h-100-per">
            <div className="col-sm-12 h-100-per">
              <div className="page-banner-content">
                <div className="fancy-title-hold text-left clearfix">
                  <h2 className="site-h2 mb-0">{title}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <p>{error}</p>}

      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div id="blog" className="blog list-project pt25 mb25">
        <div className="container">
          <div className="row">
            <div className="col col-sm-12 p-my mb10 hide d-none">
              {fetchedProperties.length > 0 && (
                <div className="fancy-title-hold text-left clearfix">
                  <p className="text-right pr15">{propertyCount} records found</p>
                </div>
              )}
            </div>
          </div>

          <div className="row article gy-4 posts-list grid">
            {loading ? (
              <div className="col-12 text-center py-5">Loading testimonials...</div>
            ) : (
              <Grid container spacing={8}>
                {fetchedProperties.map((property, index) => (
                  <Grid item xs={12} sm={6} md={4} key={`${property.id}-${index}`}>
                    <TestimonialCardNew property={property} />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const maxButtons = 5;
  let startPage = currentPage - Math.floor(maxButtons / 2);
  let endPage = currentPage + Math.floor(maxButtons / 2);

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(maxButtons, totalPages);
  } else if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - maxButtons + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="custom-pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
      )}
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
      )}
    </div>
  );
};

export default TestimonailListings;
