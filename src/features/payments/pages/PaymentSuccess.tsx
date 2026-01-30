import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, Link } from "react-router-dom";
import styles from "./PaymentSuccess.module.css";
import { PATHS } from "../../../constants/paths";
import { useEffect } from "react";
import { clearCartFromFirestore, clearCartFromLocalStorage } from "../../cart/service";
import { useAuth } from "../../../context/Auth";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const txnId = searchParams.get("txnid");
  const { user } = useAuth();
  
  //Clear cart from local storage on a successful payment
  useEffect(() => {
    if (user) {
      clearCartFromFirestore(user.uid);
    } else {
      clearCartFromLocalStorage();
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <FontAwesomeIcon icon={faCheckCircle} className={styles.icon} />

        <h1 className={styles.title}>Payment Successful</h1>

        <p className={styles.subtitle}>
          Thank you! Your payment has been processed successfully.
        </p>

        <div className={styles.orderBox}>
          <span className={styles.orderLabel}>Order ID</span>
          <span className={styles.orderId}>{txnId ?? "—"}</span>
        </div>

        <div className={styles.infoBox}>
          <p>
            A confirmation email has be sent to the registered email address for
            the order. You will receive regular email updates on the status of
            your order.
          </p>
        </div>

        <Link to={PATHS.HOME} className={styles.button}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
