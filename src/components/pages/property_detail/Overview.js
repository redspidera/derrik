import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const Overview = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggle = () => {
        setIsExpanded(prevState => !prevState);
    };
    const formatDescription = (text) => {
        const formattedText = text.replace(/\n/g, '<br />'); // Replace newlines with <br> tags
        return { __html: formattedText }; // Return HTML-safe object
    };
    return (_jsxs("div", { className: "list list-check", children: [_jsx("h3", { children: "Property Overview" }), _jsx("div", { className: `content-font ${isExpanded ? '' : 'text-t'}`, id: "dec-det", children: _jsx("div", { className: `content-font ${isExpanded ? '' : 'text-t'}`, id: "dec-det", dangerouslySetInnerHTML: formatDescription(description) }) }), _jsx("a", { href: "#", onClick: handleToggle, className: "mt-3 content-font", style: {
                    color: 'var(--logo-color)',
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '40px',
                }, children: isExpanded ? 'Read less' : 'Read more' })] }));
};
export default Overview;
