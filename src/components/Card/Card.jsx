import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const NewsCard = ({ noticia, categoria }) => {
  return (
    <div className={styles.card}>
      <Link to={`/${categoria}/${noticia.id}`} className={styles.link}>
        <div className={styles.cardContent}>
          <img
            className={styles.cardImage}
            src={noticia.img || '/images/placeholder.jpg'}
            alt={noticia.alt_imagem || 'Imagem não disponível'}
            onError={(e) => (e.target.src = '/images/placeholder.jpg')}
          />
          <div className={styles.cardTitle}>{noticia.titulo}</div>
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
