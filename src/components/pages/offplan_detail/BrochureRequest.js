import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import BrochureRequestForm from './BrochureRequestForm';
const BrochureRequest = ({ bImage, ad_id_number }) => {
    // State to handle image load error
    const [imageSrc, setImageSrc] = useState(bImage ? bImage : `/img/brd.png`);
    const handleImageError = () => {
        setImageSrc(`/img/brd.png`);
    };
    return (_jsx("div", { className: "section scrolable pt0 mt-50 pb0 brochure-bg", id: "brochure", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "row download-brochure pb0", children: [_jsx("div", { className: "col-sm-5", id: "rsult-request", children: _jsx(BrochureRequestForm, { ad_id_number: ad_id_number }) }), _jsxs("div", { className: "col-sm-7 right-mod", children: [_jsx("div", { className: "black-tran" }), _jsx("img", { src: imageSrc, onError: handleImageError, alt: "Brochure Preview", style: { maxHeight: '352px' } })] })] }) }) }));
};
export default BrochureRequest;
