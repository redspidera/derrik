import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { NavLink } from 'react-router-dom';

interface SimilarProps {
  bg_img: string;
  ad_title: string;
  community_name: string;
  PriceTitleDetail: string;
  mobile_number: string;
  ReferenceNumberTitle: string;
  detailUrlAbsolute: string;
  detailUrl: string;
  location_latitude: string;
  location_longitude: string;
}

const SimilarCard: React.FC<{ property: SimilarProps }> = ({ property }) => {
  const {
    bg_img,
    ad_title,
    community_name,
    PriceTitleDetail,
    mobile_number,
    ReferenceNumberTitle,
    detailUrlAbsolute,
    detailUrl,
    location_latitude,
    location_longitude,
  } = property;

  const file = `${bg_img}`;

  return (
    <div className="the-guide-info property-info-m">
      <div className="the-guide-info-image">
        <img src={file} alt={ad_title} />
      </div>

      <div className="project-card-sect1">
        <div className="text-iiblg">{ad_title}</div>
        <div className="text-iiblg-loct-detail">
          <a
            href={`https://www.google.com/maps/?q=${location_latitude},${location_longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-geo-alt mr3"></i>
            {community_name}
          </a>
        </div>
        <div
          className="price-detai"
          dangerouslySetInnerHTML={{ __html: PriceTitleDetail }}
        />
      </div>

      <div className="the-guide-info-moredetails">
        <div className="row cnt-btn-all-parent">
          <div className="col-sm-234">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cnt-btn-all cnt-btn-all-whatsapp"
              href={`https://wa.me/${mobile_number.replace(/\s|\+/g, '')}?text=I would like to inquire about your project - ${ReferenceNumberTitle}. Please contact me at your earliest convenience. %0aProperty Link %0a${encodeURIComponent(detailUrlAbsolute)}`}
            >
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
          <div className="col-sm-234">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="cnt-btn-all cnt-btn-all-call"
              href={`tel:${mobile_number.replace(/\s/g, '')}`}
            >
              <i className="bi bi-telephone-outbound"></i>
            </a>
          </div>
        </div>

        <div className="text-iiblg-link">
          <span>More Details</span> →
        </div>
      </div>

      <NavLink to={detailUrl} className="abs-link"></NavLink>
    </div>
  );
};

interface similarListProps {
  similarProperties: SimilarProps[];
}

const SimilarProperties = ({ similarProperties }: similarListProps) => {
  useEffect(() => {
    const equalizeHeights = () => {
      const slides = document.querySelectorAll('.swiper-slide');
      let maxHeight = 0;

      slides.forEach((slide) => {
        const card = slide.querySelector('.the-guide-info') as HTMLElement;
        if (card) {
          card.style.height = 'auto';
          maxHeight = Math.max(maxHeight, card.offsetHeight);
        }
      });

      slides.forEach((slide) => {
        const card = slide.querySelector('.the-guide-info') as HTMLElement;
        if (card) {
          card.style.height = `${maxHeight}px`;
        }
      });
    };

    setTimeout(equalizeHeights, 500); // wait for Swiper render
    window.addEventListener('resize', equalizeHeights);

    return () => {
      window.removeEventListener('resize', equalizeHeights);
    };
  }, [similarProperties]);

  if (!similarProperties || similarProperties.length === 0) return null;

  return (
    <div
      id="section17"
      className="section-hm new-sect descrp2 pt60 sect-red sect-similar"
    >
      <div className="container">
        <div className="row at-center">
          <div className="col-sm-12 d-min-height">
            <div className="featured-title-hold text-center clearfix">
              <h3 className="site-h1 animate">
                <div className="line-container-parent">
                  <div className="lines-container flex-end">
                    <div className="line small-line"></div>
                    <div className="line big-line"></div>
                  </div>
                  <h5 className="line-text">Similar Projects</h5>
                  <div className="lines-container">
                    <div className="line small-line"></div>
                    <div className="line big-line"></div>
                  </div>
                </div>
              </h3>
            </div>

            <Swiper
              id="similar-properties-new"
              modules={[Navigation, Pagination]}
              slidesPerView={4}
              spaceBetween={15}
              loop={false}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 0 },
                480: { slidesPerView: 1, spaceBetween: 0 },
                640: { slidesPerView: 3, spaceBetween: 15 },
                992: { slidesPerView: 3, spaceBetween: 15 },
                1200: { slidesPerView: 4, spaceBetween: 15 },
              }}
            >
              {similarProperties.map((property, index) => (
                <SwiperSlide key={index}>
                  <SimilarCard property={property} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="swipper-n">
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>

            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProperties;
