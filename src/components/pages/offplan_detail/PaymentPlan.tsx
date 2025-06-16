import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/swiper-bundle.css'; 

interface PaymentPlanProps {
  adTitle: string;  // Title of the ad
  paymentPlans: {
    description: string;
    percentage: string;
  }[];
    openModal: (title: string, fieldId: string) => void;
}

const PaymentPlan: React.FC<PaymentPlanProps> = ({ adTitle, paymentPlans, openModal }) => {
    if (!paymentPlans || paymentPlans.length === 0) {
        return null; // or return a message like <p>No Payment Plan Available</p>
    }
  return (
      <div id="section4" data-dfd="" className="section-hm new-sect paymentplan pb0 at-red-bg">
          <div className="container pt80 pb80 ">
        <div className="row">
                <div className="col-sm-5">
                    <div className="dflex">
                            <div className="project-title">
                              <div className="featured-title-hold text-center clearfix"><h3 className="site-h1 animate"><div className="line-container-parent"><div className="lines-container flex-end"><div className="line small-line"></div><div className="line big-line"></div></div><h5 className="line-text">Payment Plan of</h5><div className="lines-container"><div className="line small-line"></div><div className="line big-line"></div></div></div><p className="site-h4">{adTitle}</p></h3></div>
                            </div>
                          <a
                              className="down-broucher btn btn-primary"
                              onClick={() => openModal(`Download Payment Plan`, '2')}
                               
                          >
                              Download Full <br /> Payment Plan <br />
                              <i className="fa fa-long-arrow-right"></i>
                          </a>
                    </div>
                </div>
                <div className="col-sm-7 pr15">
                      <div className="row">
                          <div className="payment-plan col-sm-12">
                              <div className="swiper-container">
                                  <Swiper
                                      key="payment"
                                      modules={[Navigation, Pagination]}
                                      spaceBetween={20}
                                      navigation={{
                                          nextEl: '.swiper-button-next-payment',
                                          prevEl: '.swiper-button-prev-payment',
                                      }}
                                      pagination={{ clickable: true }}
                                      breakpoints={{
                                          0: {       // Mobile
                                              slidesPerView: 1,
                                          },
                                          576: {     // Tablets
                                              slidesPerView: 2,
                                          },
                                          768: {     // Small Desktops
                                              slidesPerView: 2,
                                          },
                                          1024: {    // Large Desktops
                                              slidesPerView: 3,
                                          },
                                      }}
                                      className="swiper"
                                  >
                                      <div className="swiper-wrapper" id="swiper-cnwidtg">
                                          {paymentPlans.map((plan, index) => (
                                              <SwiperSlide key={`slide-${index}`} className="swiper-slide">
                                                  <div className="payment-plan-desc">
                                                      <div className="per-cls">{plan.percentage ? `${plan.percentage}%` : 'N/A'}</div>
                                                      <div className="per-des">{plan.description || 'N/A'}</div>
                                                  </div>
                                              </SwiperSlide>
                                          ))}
                                      </div>
                                  </Swiper>
                              </div>

                              {/* Navigation buttons */}
                              <div className="swipper-n">
                                  <div className="swiper-button-prev   swiper-button-prev-payment"></div>
                                  <div className="swiper-button-next   swiper-button-next-payment"></div>
                              </div>

                              {/* Pagination */}
                              <div className="swiper-pagination"></div>
                          </div>

                          {/* Download Button */}
                          
                      </div>
                </div>
        </div>
        {/* Project Title */}
        

        {/* Swiper Section */}
        
      </div>
    </div>
  );
};

// Simulate the "openPopupDownload" function from PHP
 

export default PaymentPlan;
