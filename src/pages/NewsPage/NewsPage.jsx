import React, { useState, useEffect } from 'react';
import styles from './NewsPage.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import NewsCard from '../../components/Card/Card';
import PesquisaTempoReal from '../../components/Pesquisa/Pesquisa';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';

const NewsPage = ({ categoria }) => {
  const location = useLocation();
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const getNoticias = async () => {
      const data = await getDocs(collection(db, 'Noticias'));
      setNoticias(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNoticias();
  }, []);

  const noticiasCarrossel = noticias.slice(0, 3);
  const noticiasCards = noticias.slice(3);

  return (
    <Container fluid className={styles.newsPage}>
      <PesquisaTempoReal />
      <h1 className={styles.tituloPages}>Últimas Notícias</h1>

      <Carousel indicators={false} className={styles.customCarousel}>
        {noticiasCarrossel.map((carouselItem, i) => (
          <Carousel.Item key={i}>
            <NavLink to={`/${categoria}/${carouselItem.id}`}>
              <img
                className="d-block w-100"
                src={carouselItem.img}
                alt={carouselItem.alt_imagem}
              />
              <Carousel.Caption className={`${styles.carouselTexto} p-1`}>
                <h3 className="m-0">{carouselItem.titulo}</h3>
              </Carousel.Caption>
            </NavLink>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className={styles.cardContainer}>
        {noticiasCards.map((noticia) => (
          <NewsCard key={noticia.id} noticia={noticia} categoria={categoria} />
        ))}
      </div>
    </Container>
  );
};

export default NewsPage;
