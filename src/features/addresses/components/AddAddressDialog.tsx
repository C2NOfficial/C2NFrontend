import styles from "./AddAddressDialog.module.css";
import type { Address, AddressErrors } from "../model";
import { validateAddressForm } from "../validation";

interface AddAddressDialogProps {
  formAddress: Address;
  setFormAddress: React.Dispatch<React.SetStateAction<Address>>;
  formAddressErrors: AddressErrors;
  setFormAddressErrors: React.Dispatch<React.SetStateAction<AddressErrors>>;
  isOpen: boolean;
  onClose: () => void;
  onSubmitButtonText: string;
  onSubmit: () => void;
}

const AddAddressDialog = ({
  isOpen,
  onClose,
  formAddress,
  setFormAddress,
  formAddressErrors,
  setFormAddressErrors,
  onSubmit,
  onSubmitButtonText,
}: AddAddressDialogProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormAddress((prev) => ({ ...prev, [name]: value }));
  };
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>Add Delivery Address</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validateAddressForm(formAddress, setFormAddressErrors)) {
              onSubmit();
            }
          }}
          className={styles.form}
        >
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Address Line 1"
              name="address1"
              value={formAddress.address1}
              onChange={handleChange}
              className={formAddressErrors.address1 ? styles.inputError : ""}
            />
            {formAddressErrors.address1 && (
              <span className={styles.errorText}>
                {formAddressErrors.address1}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="Address Line 2 (optional)"
              name="address2"
              value={formAddress.address2}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formAddress.city}
              onChange={handleChange}
              className={formAddressErrors.city ? styles.inputError : ""}
            />
            {formAddressErrors.city && (
              <span className={styles.errorText}>{formAddressErrors.city}</span>
            )}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="State"
              name="state"
              value={formAddress.state}
              onChange={handleChange}
              className={formAddressErrors.state ? styles.inputError : ""}
            />
            {formAddressErrors.state && (
              <span className={styles.errorText}>
                {formAddressErrors.state}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <input
              type="text"
              placeholder="PIN Code"
              name="zip"
              value={formAddress.zip}
              onChange={handleChange}
              inputMode="numeric"
              className={formAddressErrors.zip ? styles.inputError : ""}
            />
            {formAddressErrors.zip && (
              <span className={styles.errorText}>{formAddressErrors.zip}</span>
            )}
          </div>

          <div className={styles.field}>
            <select
              name="country"
              value={formAddress.country}
              onChange={handleSelectChange}
              className={formAddressErrors.country ? styles.inputError : ""}
            >
              <option value="">Select country</option>
              <option value="India">India</option>
            </select>

            {formAddressErrors.country && (
              <span className={styles.errorText}>
                {formAddressErrors.country}
              </span>
            )}
          </div>
          <p className={styles.infoText}>
            If you are placing an order outside India, please email us directly
            from the contact us page with product and address details
          </p>
          <div className={styles.actions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">{onSubmitButtonText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressDialog;
