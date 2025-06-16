import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const BlogFilter = ({ formData, handleInputChange, handleSubmit, setFormData }) => {
    /**
     * Resets the form data to its initial state.
     */
    const handleReset = () => {
        setFormData(() => {
            const resetFormData = {
                keyword: '',
            };
            // Update URL to reflect reset formData
            const params = new URLSearchParams({});
            const basePath = window.location.pathname;
            const newUrl = `${basePath}?${params.toString()}`;
            window.history.pushState({}, '', newUrl);
            return resetFormData;
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "property-search-form", id: "frmId", children: [_jsx("div", { className: "form-group", children: _jsx("input", { type: "text", placeholder: "Search Community", name: "keyword", id: "keyword", value: formData.keyword, onChange: handleInputChange, className: "form-control" }) }), _jsx("div", { className: "form-group mx-srchbtn", children: _jsxs("div", { className: "d-flex justify-content-between gap-3", children: [_jsx("button", { type: "submit", className: "btn btn-primary btn-submit", children: "Search" }), _jsx("button", { type: "button", style: { opacity: 0.6 }, onClick: handleReset, className: "btn btn-default btn-reset", children: "Reset" })] }) })] }));
};
export default BlogFilter;
