export type BlogData = {

    id: string;
    image: string;
    Title: string;
    adTitle: string;
    DetailUrl: string;
    ShortDescription: string;
};

interface DeveloperCardProps {
    property: BlogData;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ property }) => {
    const {

        image,
        Title,
        DetailUrl,
        ShortDescription

    } = property;
    const baseUrl = window.location.origin;

    return (
        <>
            <div className="col-sm-4">
                <div className="the-inner">
                    <a href={`${baseUrl}${DetailUrl}`} className="mor-a-list"></a>
                    <div
                        className="img-info"
                        style={{ backgroundImage: `url(${image})` }}
                 
                    ></div>
                    <div className="cls-gp-icon">
                        <img src={ShortDescription} alt="" />
                    </div>
                    <h4>{Title}</h4>
                </div>
            </div>
           
        </>
    );
};

export default DeveloperCard;


