import React, { useEffect, useState } from 'react';
import useAOS from '@/components/utility/useAOS';

interface Service {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface OurServicesProps {
    apiUrl: string;
}
interface Content {
    heading: string;
    image1: string;
    image2: string;
    content: string;
    call_to_action_link: string;
    call_to_action: string;
}
const OurServices: React.FC<OurServicesProps> = ({ apiUrl }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [content, setContent] = useState<Content | null>(null);
    useAOS();
    useEffect(() => {
        
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {setServices(data.data); setContent(data.content);})
            .catch(err => console.error('Error loading services:', err));
    }, [apiUrl]);
    if (!services || services.length === 0) return null;
    return (
        <section id="ourser" className="ourser pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div>
                            <h2 className="fs-1   mb-3" data-aos="fade-right" data-aos-delay="500">
                                {content && content.heading}
                            </h2>
                            <p className="fs-6" data-aos="fade-right" data-aos-delay="700">
                                <div dangerouslySetInnerHTML={{ __html: content?.content || '' }} />
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3 text-md-end">
                        <a href={content?.call_to_action_link || '#'} className="btn btn-lg btn-dark fs-6 mt-4" data-aos="fade-right" data-aos-delay="900">
                            {content && content.call_to_action}
                        </a>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-sm-12" data-aos="zoom-in" data-aos-delay="500">
                        {services.map((item, i) => (
                            <div className="acco-hover-wrap mb-4"   data-aos-delay1={500 + i * 200} key={item.id}>
                                <div className="row">
                                    <div className="col-md-7 px-lg-5">
                                        <h2 className="mb-3">{item.title}</h2>
                                        <p className="fs-6">{item.description}</p>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="img">
                                            <img src={item.image} className="img-fluid" alt={item.title} />
                                        </div>
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

export default OurServices;