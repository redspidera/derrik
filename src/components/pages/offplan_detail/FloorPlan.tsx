import  { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Fancybox } from "@fancyapps/ui";

interface AdPropps{
    adTitle : string;
    floorPlans: {
        floor_file: string; 
        floor_title: string; 
    }[];
    openModal: (title: string, fieldId: string) => void;
}
const FloorPlan = ({ adTitle, floorPlans, openModal }: AdPropps) => {
  useEffect(() => {
    // Initialize Fancybox after the component mounts
    Fancybox.bind("[data-fancybox='floor']");
  }, []);

 

  return (
    <div id="section5" className="section-hm bg-has new-sect descrp2 floorplan" style={{ paddingBottom: '60px' }}>
        <div className="black-tran"></div>
      <div className="container">
        <div className="row">
                  {floorPlans.length > 0 ? (
                // Render the list of amenities
                 
            <div className="col-sm-8">
                      <div className="floor-plan mb0">
                          <div className="swiper-container">
                              <Swiper
                                  loop={true}
                                  navigation={{
                                      nextEl: '.swiper-button-next-floor',
                                      prevEl: '.swiper-button-prev-floor',
                                  }}
                                  pagination={{
                                      el: '.swiper-pagination',
                                      clickable: true,
                                  }}
                                  breakpoints={{
                                      // For screen widths 320px to 480px (mobile)
                                      320: {
                                          slidesPerView: 1, // Show 1 slide at a time
                                          spaceBetween: 10,  // Space between slides
                                      },
                                      // For screen widths 480px to 768px (tablet)
                                      480: {
                                          slidesPerView: 2, // Show 2 slides at a time
                                          spaceBetween: 10,  // Space between slides
                                      },
                                      // For screen widths 768px to 1024px (small desktop)
                                      768: {
                                          slidesPerView: 3, // Show 3 slides at a time
                                          spaceBetween: 20,  // Space between slides
                                      },
                                      // For screen widths 1024px and above (large desktop)
                                      1024: {
                                          slidesPerView: 2, // Show 4 slides at a time
                                          spaceBetween: 30,  // Space between slides
                                      },
                                  }}
                                  className="swiper"
                              >
                                  {floorPlans.map((floor, index) => {
                                      const file = `${floor.floor_file}`;
                                      return (
                                          <SwiperSlide key={index}>
                                              <div className="elmnt">
                                                  {/* Adding the data-fancybox attribute to enable Fancybox */}
                                                  <a href={file} data-fancybox="floor" data-caption={floor.floor_title}>
                                                      <img src={file} alt={`floor-plan-${index}`} />
                                                  </a>
                                              </div>
                                          </SwiperSlide>
                                      );
                                  })}
                              </Swiper>


                          </div>
                          <div className="swipper-n mt10">
                              <div className="swiper-button-prev swiper-button-prev-floor"></div>
                                  <div className="swiper-button-next swiper-button-next-floor"></div>
                          </div>
                          <div className="swiper-pagination"></div>
                      </div>

            </div>
                  ) : (
                    ''
                  )}
                  <div className="col-sm-4">
                      <div className="project-title">
                          <div className="featured-title-hold text-center clearfix">
                              <h3 className="site-h1 animate">
                                  <div className="line-container-parent">
                                      <div className="lines-container flex-end">
                                          <div className="line small-line"></div>
                                          <div className="line big-line"></div>
                                      </div>
                                      <h5 className="line-text">Download All Floor Plans</h5>
                                      <div className="lines-container">
                                          <div className="line small-line"></div>
                                          <div className="line big-line"></div>
                                      </div>
                                  </div>
                                  <p className="site-h4 hide">{adTitle}</p>
                              </h3>
                          </div>
                      </div>
                      <a
                          className="down-broucher btn btn-primary"
                          onClick={() => openModal(`Download Floor Plans`, '1')}
                       
                          data-title="Download Floor Plan"
                          data-value="1"
                      >
                          Download All <br />Floor Plans<br />
                          <i className="fa fa-long-arrow-right"></i>
                      </a>
                  </div>
        </div> 
      </div>
    </div>
  );
};

export default FloorPlan;
