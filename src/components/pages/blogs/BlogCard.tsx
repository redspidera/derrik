import { NavLink} from 'react-router-dom';

// Define the PropertyData type
export type BlogData = {
    
    id: string;
    image: string;
    Title: string;
    slug: string;
    adTitle: string;
    DetailUrl: string; 
    ShortDescription: string; 
};

interface BlogCardProps {
    property: BlogData;
}

const BlogCard: React.FC<BlogCardProps> = ({ property }) => {
    const {
             
            image,
            Title,  
            slug, 
            ShortDescription, 
    } = property; 
    return (
        <div className="col-md-4 blg"  >
            <article className="blog">
                {image && (
                    <figure>
                        <NavLink to={`/article/${slug}`}>
                            <img src={image} alt="" />
                            <div className="preview"><span>Read More</span></div>
                        </NavLink>
                    </figure>
                )}
                <div className="post_info">
                    <h1>
                        <NavLink to={`/article/${slug}`}>{Title}</NavLink>
                    </h1>
                    <p>{ShortDescription}</p>
                </div>
            </article>
        </div>      
    );
};

export default BlogCard;


