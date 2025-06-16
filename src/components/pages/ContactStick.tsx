interface ContactStickProps {
    phone: string;
    email: string;
    whatsappMessage: string;
}

const ContactStick: React.FC<ContactStickProps> = ({ phone, email, whatsappMessage }) => {
    return (
        <div className="home-stick all-left">
            <ul>
                <li>
                    <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer" className="tel-p">
                        <img src="/assets/images/telephone-call.png" alt="Call Us" />
                    </a>
                </li>
                <li>
                    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="tel-l">
                        <img src="/assets/images/emailn.png" alt="Email Us" />
                    </a>
                </li>
                <li>
                    <a
                        href={`https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/images/whatsapp.png" alt="WhatsApp Us" />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ContactStick;
