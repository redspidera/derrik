export type BlogData = {
    
    id: string;
    image: string;
    Title: string;
    adTitle: string;
    DetailUrl: string; 
    ShortDescription: string; 
};

interface TestimonialCardProps {
    property: BlogData;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ property }) => {
    const {
             
            image,
            Title, 
         
            ShortDescription, 
    } = property;  
     
    return (
        <div className="col-sm-4 team-member admin" data-category="admin">
            <div className="card card-tertiary" data-id="459">
                <h5>  
                    <div className="testi-imgs">
                    <img
                        src={image}
                        alt={Title}
                    />
                </div>{Title}
                </h5>
                <span className="ps-block__rating-items mb-6" style={{ fontSize: '14px' }}>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </span>
               
                <div 
                    style={{ minHeight: '50px' }}
                className="pt-3 text-contetn-reveiew" dangerouslySetInnerHTML={{ __html: ShortDescription }} />
                <div className="d-flex">
                  
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;


