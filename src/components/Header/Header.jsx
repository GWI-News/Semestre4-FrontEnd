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
        <Container
            fluid
            className={`${styles.headerMobile} ${separatorColorClassHeader} fixed-top d-flex justify-content-between align-items-center`}
        >
            <NavLink to={'/'} className={styles.logoLink}>
                {logos.map((logo, i) => (
                    <img key={i} src={logo.img} alt={logo.alt} className={styles.logo} />
                ))}
            </NavLink>

            <button className={styles.menuButton} onClick={toggleMenu}>
                ☰
            </button>

            <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                <ul className={styles.navList}>
                    <li>
                        <NavLink to="/categorias" onClick={toggleMenu}>
                            Categorias
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/perfil" onClick={toggleMenu}>
                            Perfil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favoritos" onClick={toggleMenu}>
                            Favoritos
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </Container>
    );
};

export default Header;
