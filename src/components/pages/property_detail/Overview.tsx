import { useState } from 'react';
import Typography from '@mui/material/Typography';

interface OverviewProps {
  description: string;
}

const Overview: React.FC<OverviewProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(prevState => !prevState);
  };

  const formatDescription = (text: string) => {
    const formattedText = text.replace(/\n/g, '<br />'); // Convert newlines to <br>
    return { __html: formattedText };
  };

  return (
    <div className="list list-check mt50">
     
       <Typography
              variant="subtitle1"
              fontWeight={700}
              mb={1}
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
        Property Overview
            </Typography>

      <div className={`content-font ${isExpanded ? '' : 'text-t'}`} id="dec-det">
        <div
          className={`content-font ${isExpanded ? '' : 'text-t'}`}
          dangerouslySetInnerHTML={formatDescription(description)}
        />
      </div>

      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleToggle();
        }}
        className="mt-3 content-font"
        style={{
          color: 'var(--logo-color)',
          display: 'block',
          fontWeight: 600,
          marginBottom: '40px',
        }}
      >
        {isExpanded ? 'Read less' : 'Read more'}
      </a>
    </div>
  );
};

export default Overview;
