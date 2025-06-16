import { jsx as _jsx } from "react/jsx-runtime";
import RegistrationForm from './RegistrationForm';
const TopOffplanBanner = ({ property }) => {
    return (_jsx("div", { className: "offplan-head-section", children: _jsx("div", { className: "banner", style: {
                backgroundImage: `url(${property.bgImageMobile && window.innerWidth <= 768 ? property.bgImageMobile : property.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }, children: _jsx(RegistrationForm, { property: property }) }) }));
};
export default TopOffplanBanner;
