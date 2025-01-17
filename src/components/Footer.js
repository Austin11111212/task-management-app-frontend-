import React from 'react';
import { FaEnvelope, FaWhatsapp, FaLinkedin, FaTasks } from 'react-icons/fa'; // Import icons from React Icons

const Footer = () => {
    const styles = {
        footer: {
            backgroundColor: '#333',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            fontFamily: 'Arial, sans-serif',
            flexWrap: 'wrap',
        },
        section: {
            margin: '0 1rem',
            textAlign: 'center',
        },
        link: {
            color: '#007BFF',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
        copyright: {
            textAlign: 'center',
            marginTop: '1rem',
            flexBasis: '100%',
        },
        icon: {
            fontSize: '1.5rem',
            marginRight: '8px',
        },
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.section}>
                <h3>Contact Us</h3>
                <p>
                    <FaEnvelope style={styles.icon} />
                    <a href="mailto:ezigboaustin2244@gmail.com" style={styles.link}>ezigboaustin2244@gmail.com</a>
                </p>
                <p>
                    <FaWhatsapp style={styles.icon} />
                    <a href="https://wa.me/2348068788953" style={styles.link} target="_blank" rel="noopener noreferrer">
                        +234 806 878 8953
                    </a>
                </p>
            </div>
            <div style={styles.section}>
                <h3>Visit Us</h3>
                <p>
                    <FaLinkedin style={styles.icon} />
                    <a
                        href="https://www.linkedin.com/in/ezigbo-augustus-49b446307?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BdWeLDqLoQxWYiMaADNFrLQ%3D%3D"
                        style={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn Profile
                    </a>
                </p>
            </div>
            <div style={styles.section}>
                <h3>Task Manager</h3>
                <p>
                    <FaTasks style={styles.icon} />
                    Manage your tasks efficiently and stay organized!
                </p>
            </div>
            <div style={styles.copyright}>
                <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
