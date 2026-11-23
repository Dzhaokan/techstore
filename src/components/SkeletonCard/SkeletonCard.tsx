import styles from './SkeletonCard.module.scss';

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.body}>
        <div className={styles.lineShort} />
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.bottom}>
          <div className={styles.lineShort} />
          <div className={styles.lineShort} />
        </div>
        <div className={styles.button} />
      </div>
    </div>
  );
}
