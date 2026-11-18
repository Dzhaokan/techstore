import type { ReactNode } from 'react';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  title: string;
  text?: string;
  action?: ReactNode;
}

function EmptyState({ title, text, action }: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}

export default EmptyState;
