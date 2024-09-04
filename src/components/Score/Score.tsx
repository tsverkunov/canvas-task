import styles from './Score.module.css';

interface ScoreProps {
  redCount: number;
  greenCount: number;
}

const Score = ({redCount, greenCount}: ScoreProps) => {
  return (
    <section className={styles.score}>
      <span className={styles.greenCount}>{greenCount}</span>
      <span className={styles.redCount}>{redCount}</span>
    </section>
  );
};

export default Score;