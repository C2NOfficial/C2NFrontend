import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './PaymentFailure.module.css';
import { PATHS } from '../../../constants/paths';

const PaymentFailure = () => {
  const [params] = useSearchParams();
  const txnId = params.get('txnid');

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <FontAwesomeIcon icon={faTimesCircle} className={styles.icon} />

        <h1 className={styles.title}>Payment Failed</h1>

        <p className={styles.subtitle}>
          Unfortunately, your payment could not be processed.
        </p>

        <div className={styles.orderBox}>
          <span className={styles.orderLabel}>Order ID</span>
          <span className={styles.orderId}>{txnId ?? "—"}</span>
        </div>

        <div className={styles.infoBox}>
          <p>
            An email has been sent to the checkout email address with the details of your order
          </p>
        </div>

        <Link to={PATHS.HOME} className={styles.button}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailure;