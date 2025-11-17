import { Link } from 'react-router-dom';
import { ItemListContainer } from '../ItemListContainer/ItemListContainer';
import styles from './Home.module.css';
import bannerVideo from '../../assets/5757789-hd_1080_1920_30fps.mp4';

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Banner de bienvenida con video de fondo */}
      <section className={styles.banner}>
        {/* 2. <video> */}
        <video className={styles.bannerVideo} autoPlay loop muted playsInline>
          <source src={bannerVideo} type="video/mp4" />
          Tu navegador no soporta videos.
        </video>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>El Sabor de lo Hecho en Casa</h1>
          <p className={styles.bannerSubtitle}>
            Descubre nuestra selección de productos horneados con pasión y los mejores ingredientes.
          </p>
          <Link to="/productos" className={styles.bannerButton}>Ver Productos</Link>
        </div>
      </section>

      {/* 2. Reutilizamos ItemListContainer para los productos destacados */}
      <ItemListContainer subtitle="Nuestros Productos Destacados" limit={4} />
    </div>
  );
};