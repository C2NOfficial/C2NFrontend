import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PaymentFailure.module.css';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const PaymentFailure = () => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faTimesCircle} className={styles.icon} />
      <h1 className={styles.title}>Payment Failed</h1>
      <p className={styles.subtitle}>
        Unfortunately, your payment could not be processed. Please check your payment details and try again.
      </p>
      <a href="/" className={styles.button}>
        Go Back Home
      </a>
    </div>
  );
};

export default PaymentFailure;