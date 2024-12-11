import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import styles from './Header.module.css';

const Header = ({ logos }) => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    var separatorColorClassHeader = styles.headerPadrao;
    switch (location.pathname) {
        case '/Educacao':
            separatorColorClassHeader = styles.headerEducacao;
            break;
        case '/Esportes':
            separatorColorClassHeader = styles.headerEsportes;
            break;
        case '/Entretenimento':
            separatorColorClassHeader = styles.headerEntretenimento;
            break;
        case '/Economia':
            separatorColorClassHeader = styles.headerEconomia;
            break;
        default:
            separatorColorClassHeader = styles.headerPadrao;
            break;
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <Container fluid className={`${styles.headerMobile} ${separatorColorClassHeader} d-flex justify-content-center align-items-center`}>
            <NavLink to={'/'} className={styles.logoLink}>
                {logos.map((logo, i) => (
                    <img key={i} src={logo.img} alt={logo.alt} className={styles.logo} />
                ))}
            </NavLink>
        </Container>
    );
};

export default Header;