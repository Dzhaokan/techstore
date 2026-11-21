import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Ничего не найдено</h1>
      <p className={styles.text}>Такой страницы не существует</p>
      <Link to="/" className={styles.link}>
        Вернуться в каталог
      </Link>
    </div>
  );
}
