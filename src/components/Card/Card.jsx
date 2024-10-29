import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import styles from './NewsCard.module.css';

const NewsCard = ({ noticia, categoria }) => {
  return (
    <Link to={`/${categoria}/${noticia.id}`} className={styles.link}>
      <Card className={`${styles.card}`}>
        <Card.Img variant="top" src={noticia.img} alt={noticia.alt_imagem} />
        <Card.Body className="p-3">
          <Card.Title className="m-0">{noticia.titulo}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default NewsCard;
