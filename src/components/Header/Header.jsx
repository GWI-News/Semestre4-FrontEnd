import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Header.module.css';

const Header = ({ logos }) => {
    const location = useLocation();

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

    return (
        <Container fluid className={`${styles.headerMobile} ${separatorColorClassHeader} fixed-top d-flex justify-content-between align-items-center p-0`}>
            <NavLink to={'/'}>
                {logos.map((logo, i) => (
                    <img key={i} src={logo.img} alt={logo.alt} className={`w-100 p-0`} />
                ))}
            </NavLink>
            <div className={styles.nav}>
                <ul className={styles.navList}>
                    <li><NavLink to="/categorias">Categorias</NavLink></li>
                    <li><NavLink to="/perfil">Perfil</NavLink></li>
                    <li><NavLink to="/favoritos">Favoritos</NavLink></li>
                </ul>
            </div>
        </Container>
    );
};

export default Header;
