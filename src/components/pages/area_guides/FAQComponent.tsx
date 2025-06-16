export interface FAQ {
    question: string;
    answer: string;
}

interface FAQComponentProps {
    faqs: FAQ[];
}

const FAQComponent: React.FC<FAQComponentProps> = ({ faqs }) => {
    if (!Array.isArray(faqs)) return <p>No FAQs available.</p>;

    return (
        <div>
            {faqs.map((faq, index) => (
                <div key={index}>
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                </div>
            ))}
        </div>
    );
};

export default FAQComponent;