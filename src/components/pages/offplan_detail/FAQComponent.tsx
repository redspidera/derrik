import  { useState } from 'react';

interface FAQProps {
  adTitle: string;
  faq: { title: string; file: string }[]; // Array of FAQ objects with title and content
}

const FAQComponent = ({ adTitle, faq }: FAQProps) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null); // Track which FAQ is open

  const toggleOpenFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index); // Toggle the open state for the clicked FAQ
  };

  return (
    <>
      {faq && faq.length > 0 && (
        <div id="section6" className="section-hm new-sect descrp2 faq-ite pb0">
          <div className="black-tran"></div>
          <div className="container">
            <div className="row at-center pt50 pb50">
              <div className="col-sm-5">
                              <div className="featured-title-hold text-center clearfix">
                                  <h3 className="site-h1 animate">
                                      <div className="line-container-parent">
                                          <div className="lines-container flex-end">
                                              <div className="line small-line"></div>
                                              <div className="line big-line"></div>
                                          </div>
                                          <h5 className="line-text">FAQ About</h5>
                                          <div className="lines-container">
                                              <div className="line small-line"></div>
                                              <div className="line big-line"></div>
                                          </div>
                                      </div>
                                      <p className="site-h4">{adTitle}</p>
                                  </h3>
                              </div>
              </div>
              <div className="col-sm-7">
                              <div className="pr15 ">


                                  <section className="mt-5 p-0 mb-5">
                                      <div className="project-teams" id="faq-it">
                                          <div className="main_title_3">
                                              <span></span>
                                              <h2>FAQ about {adTitle}</h2>
                                          </div>

                                          {faq.map((v, k) => (
                                              <div key={k}
                                                  className={`${openFAQ === k ? 'oplm' : ''} hdrfaq1`}
                                              >
                                                  <button
                                                      onClick={() => toggleOpenFAQ(k)}
                                                      className="expandable-section__StyledSectionHeader-sc-wc2yed-0 fvALIH"
                                                  >
                                                      <div className="project-team-header__ProjectTeamHeaderContainer-sc-9ldys9-0 kZUEjI">
                                                          <p className="faq-quest">{v.title}</p>
                                                      </div>
                                                      <svg
                                                          viewBox="0 0 24 24"
                                                          className={`ArrowDownLg__StyledSVG-sc-lpcous-0 kcSmXn expandable-section__IconDown-sc-wc2yed-3 eSnMeY ${openFAQ === k ? 'hidden' : ''}`}
                                                      >
                                                          <path
                                                              stroke="currentColor"
                                                              d="M22 8L12 18 2 8"
                                                              fill="none"
                                                              fillRule="evenodd"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                          />
                                                      </svg>
                                                      <svg
                                                          viewBox="0 0 24 24"
                                                          className={`ArrowUpLg__StyledSVG-sc-16exhyz-0 huziqX expandable-section__IconUp-sc-wc2yed-2 huDCpO `}
                                                      >
                                                          <path
                                                              stroke="currentColor"
                                                              d="M22 16L12 6 2 16"
                                                              fill="none"
                                                              fillRule="evenodd"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                          />
                                                      </svg>
                                                  </button>

                                                  {openFAQ === k && (
                                                      <section
                                                          role="region"
                                                          aria-labelledby="developer-team-header"
                                                          className="expandable-section__StyledSectionPanel-sc-wc2yed-1 clAZGx"
                                                      >
                                                          <p className="faq-content">{v.file}</p>
                                                      </section>
                                                  )}
                                              </div>
                                          ))}
                                      </div>
                                  </section>
                              </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQComponent;
