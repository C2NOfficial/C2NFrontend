import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PaymentSuccess.module.css';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const PaymentSuccess = () => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />
      <h1 className={styles.title}>Payment Successful</h1>
      <p className={styles.subtitle}>
        Thank you! Your payment has been processed successfully. Your order will be confirmed shortly.
      </p>
      <a href="/" className={styles.button}>
        Go Back Home
      </a>
    </div>
  );
};

export default PaymentSuccess;