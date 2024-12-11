import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'
import { userAuthentication } from '../../hooks/userAuthentication'
import styles from './PerfilLeitor.module.css';
import { CameraFill } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NewsCard from '../../components/Card/Card';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

const PerfilLeitor = () => {
    const { user } = useAuthValue()
    const { logout } = userAuthentication()
    const navigate = useNavigate();


    const [noticias, setNoticias] = useState([]);
    const noticiasCards = noticias;
    const location = useLocation();

    useEffect(() => {
        const getNoticias = async () => {
            const data = await getDocs(collection(db, 'Noticias'));
            setNoticias(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getNoticias();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]);

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <Container fluid className={styles.perfilAdmContainer}>
                <Col className={styles.perfilAdmInfoContainer}>
                    <Row className={`${styles.perfilAdmSectionFirst} m-0`}>
                        <Col xs={12} md={8}>
                            <Row className={`align-items-center mb-3 m-0 p-0`}>
                                <Col xs={4} sm={3} className={`p-0`}>
                                    <div className={`${styles.perfilAdmContainerUserImage} d-flex justify-content-center align-items-center`}>
                                        <CameraFill className={styles.perfilAdmUserImage}></CameraFill>
                                    </div>
                                </Col>
                                <Col xs={8} sm={9} className={`p-0`}>
                                    <h1 className={`${styles.perfilAdmTitle}`}>Gabriel Larocca 0</h1>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12} md={4} className='d-flex align-itens-center'>
                            <Row className={`m-0 p-0 d-flex align-itens-center`}>
                                <Col className={`p-0 d-flex flex-column justify-content-center`}>
                                    <h5>Email: gabriellarocca0@gmail.com</h5>
                                    <h5>Senha: **********</h5>
                                </Col>
                            </Row>
                        </Col>
                        <Row>
                            <Col xs={6}>
                                <Button className={`${styles.perfilAdmSectionCrudButton}`}>
                                    <h4 className={`${styles.perfilAdmSectionCrudButtonText}`}>Editar</h4>
                                </Button>
                            </Col>
                            <Col xs={6}>
                                <Button onClick={logout} className={`${styles.perfilAdmSectionCrudButton}`}>
                                    <h4 className={`${styles.perfilAdmSectionCrudButtonText}`}>Sair</h4>
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                    <Row className={`${styles.perfilAdmSection} m-0`}>
                        <Row className='mb-3 m-0 p-0'>
                            <Col className='p-0'>
                                <h1 className={`${styles.perfilAdmTitle}`}>Notícias Favoritas</h1>
                            </Col>
                        </Row>
                        <div className={styles.cardContainer}>
                            {noticiasCards.map((noticia) => (
                                <NewsCard key={noticia.id} noticia={noticia} categoria={'empregos'} />
                            ))}
                        </div>
                    </Row>
                </Col>
            </Container>
        </>
    );
}

export default PerfilLeitor;
