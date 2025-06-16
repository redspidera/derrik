import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SuccessMessage = ({ responseMessage }) => {
    return (_jsxs("div", { className: "success-message", children: [_jsx("img", { src: "/img/verified.gif", alt: "Success Icon", className: "success-icon" }), _jsxs("div", { className: "message-content", children: [_jsx("h2", { children: "Success!" }), _jsx("p", { children: responseMessage })] })] }));
};
export default SuccessMessage;
