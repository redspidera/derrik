import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

// Define property type
interface Home {
    image: string;
    price?: string;
    title: string;
    location: string;
    currency: string;
    DetailUrl: string;
    price_on_application?: boolean;
}
type content1 = {
    heading: string;
    content: string;
};
interface Props {
    apiUrl: string;
}
const FeaturedHomes = ({ apiUrl }: Props) => {
    const [homes, setHomes] = useState<Home[]>([]);    
    const [content1, setContent1] = useState<content1 | null>(null);
    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => { setHomes(data.data.slice(0, 5)); setContent1(data.content); })
            .catch((err) => console.error('Failed to fetch properties:', err));
    }, []);
    

    if (homes.length < 1) return <p className="text-center mt-5">Loading...</p>;

    return (
        <section className="container pt-0 featuredhomes mt-4" data-aos="fade-up">
            <h2 className="mb-4 text-uppercase fw-bold" data-aos="fade-down">
                {content1?.heading}
            </h2>
            <div className="row g-3 mar-top-b-a">

                {/* Left Large Property */}
                <div className="col-lg-6 main-feat-home" data-aos="fade-right">
                    <div className="position-relative">
                        <NavLink to={homes[0].DetailUrl}> 
                        <img
                            src={homes[0].image}
                            alt={homes[0].title}
                            className="img-fluid rounded"
                        />
                        </NavLink>
                        <div className="property-caption position-absolute bottom-0 start-0 w-100 text-white bg-dark bg-opacity-75 p-3 rounded-bottom">
                            <strong>
                                {homes[0].currency}  {homes[0].price}
                            </strong>
                            <br />
                            <small>{homes[0].title}, {homes[0].location}</small>
                        </div>
                    </div>
                </div>

                {/* Right 4 Smaller Properties */}
                <div className="col-lg-6 sub-feat-home">
                    <div className="row g-3 marg-13-adhus">
                        {homes.slice(1).map((home, index) => (
                            <div
                                className="col-lg-6 marg-13"
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="position-relative">
                                    <NavLink to={home.DetailUrl}> 
                                    <img
                                        src={home.image}
                                        alt={home.title}
                                        className="img-fluid rounded"
                                    />
                                    </NavLink>
                                    <div className="property-caption position-absolute bottom-0 start-0 w-100 text-white bg-dark bg-opacity-75 p-2 rounded-bottom">
                                        <strong>
                                            {home.currency}  {home.price}
                                        </strong>
                                        <br />
                                        <small><NavLink to={home.DetailUrl}> {home.title} </NavLink></small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default FeaturedHomes;