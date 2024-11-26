import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const NewsCard = ({ noticia, categoria }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      {
        rootMargin: '100px', // Carregar antes de atingir o final da tela
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      setImageSrc(noticia.img || '/images/placeholder.jpg');
    }
  }, [isIntersecting, noticia.img]);

  return (
    <div className={styles.card}>
      <Link to={`/${categoria}/${noticia.id}`} className={styles.link}>
        <div className={styles.cardContent}>
          <img
            ref={imgRef}
            className={styles.cardImage}
            src={imageSrc}
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
