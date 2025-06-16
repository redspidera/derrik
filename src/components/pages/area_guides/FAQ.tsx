import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQData {
    name: string[];
    answer: string[];
}

const FAQ: React.FC<{ faqData: FAQData }> = ({ faqData }) => {
    if (!faqData || !faqData.name || !faqData.answer) {

        return <p>Loading FAQs...</p>;
    }

    return (
        <div className="faq-it">

            <Typography
                variant="h4"
                component="h2"
                sx={{
                    fontWeight: 700,
                    mb: 3,           // margin bottom to space below heading
                    color: 'primary.main',
                }}
                data-aos="fade-up" data-aos-delay="500"
            >
                FAQ's
            </Typography>
            {faqData.name.map((question, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <Typography>{question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faqData.answer[index]}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default FAQ;