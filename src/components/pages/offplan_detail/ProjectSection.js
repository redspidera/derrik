import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RegulatorySection from "./RegulatorySection";
const ProjectSection = ({ logo, adTitle, caption, startingPrice, paymentPlanTitle, handover, pNumbers, rera, ded, brn, qr, }) => {
    // Scroll function
    const scrollDiv = () => {
        const element = document.getElementById("section2");
        if (element) {
            element.scrollIntoView();
        }
    };
    // Prepare the regulatory info object
    const regulatoryInfo = { pNumbers, rera, ded, brn, qr };
    return (_jsx("div", { id: "section1", className: "section-hm hdr new-sect full first", children: _jsx("div", { className: "container", children: _jsxs("div", { className: "  at-center", children: [_jsxs("div", { className: "col-sm-6 d-min-height", children: [_jsxs("div", { className: "d-logo", children: [_jsx("strong", {}), _jsx("img", { src: logo, alt: "Logo" })] }), _jsx("div", { className: "project-title", children: _jsx("ul", { className: "project-t", children: _jsx("li", { children: _jsx("h1", { children: adTitle }) }) }) }), _jsxs("div", { className: "d-flex justify-content-between", children: [_jsx("div", { className: "project-description", children: caption && _jsx("div", { dangerouslySetInnerHTML: { __html: caption } }) }), _jsx("div", { className: "cta-btn", children: _jsx("button", { type: "button", onClick: scrollDiv, className: "btn btn-primary btn-lg", children: "Enquire Now" }) })] })] }), _jsxs("div", { className: "col-sm-6 bg-black1", children: [_jsx("div", { className: "black-tran" }), _jsxs("div", { className: "more-det", children: [_jsx("div", { className: "prect-ifo", children: _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("img", { src: "/img/offplan/price.svg", alt: "" }), _jsxs("div", { className: "inf-sect", children: [_jsx("div", { className: "inf-sect-valu", children: _jsx("div", { dangerouslySetInnerHTML: { __html: startingPrice } }) }), _jsx("div", { className: "inf-sect-lbl", children: "STARTING PRICE" })] })] }), _jsxs("li", { children: [_jsx("img", { src: "/img/offplan/plan.svg", alt: "" }), _jsxs("div", { className: "inf-sect", children: [_jsx("div", { className: "inf-sect-valu", children: paymentPlanTitle }), _jsx("div", { className: "inf-sect-lbl", children: "PAYMENT PLAN" })] })] }), _jsxs("li", { children: [_jsx("img", { src: "/img/offplan/key.svg", alt: "" }), _jsxs("div", { className: "inf-sect", children: [_jsx("div", { className: "inf-sect-valu", children: handover || '-' }), _jsx("div", { className: "inf-sect-lbl", children: "HANDOVER" })] })] })] }) }), _jsx("div", { className: "reg-info", children: _jsx(RegulatorySection, { regulatoryInfo: regulatoryInfo }) })] })] })] }) }) }));
};
export default ProjectSection;
