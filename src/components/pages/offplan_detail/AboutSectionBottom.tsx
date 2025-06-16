interface aboutProps{
    c_img: string;
    c_description: string;
}
const sanitizeHTML = (html:any) => {
  // Remove all style attributes using a regular expression
  return html.replace(/ style="[^"]*"/g, '');
};
const AboutSectionBottom = ({ c_img, c_description }: aboutProps) => {
  const sanitizedDescription = sanitizeHTML(c_description.trim());
  return (
    <div id="section2n" className="section-hm new-sect descrp2 mt50 pb50" >
      <div className="container">
        <div className="row at-center1">
          <div className="col-sm-12 d-min-height cm-loc">
            {c_img && c_description && (
              <img 
                src={`${c_img}`} 
                id="lc-image11" 
                alt="Advertisement"
              />
            )}
            <div style={{ marginTop: '10px' }}>
              
                {c_description && (
                    
                <div dangerouslySetInnerHTML={{ __html: sanitizedDescription.trim() }} />
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSectionBottom;
