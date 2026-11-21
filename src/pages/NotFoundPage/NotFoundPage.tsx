import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Ничего не найдено</h1>
      <p className={styles.text}>Такой страницы не существует</p>
      <Link to="/">
        <Button>Вернуться в каталог</Button>
      </Link>
    </div>
  );
}
