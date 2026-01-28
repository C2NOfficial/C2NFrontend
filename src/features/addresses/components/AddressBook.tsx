import { useRef, useState } from "react";
import { defaultAddress, type Address, defaultAddressErrors } from "../model";
import styles from "./AddressBook.module.css";
import AddressTile from "./AddressTile";
import AddAddressDialog from "./AddAddressDialog";
import useUpdateAddress from "../hooks/useUpdateAddress";
import useDeleteAddress from "../hooks/useDeleteAddress";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import useAddAddress from "../hooks/useAddAddress";
import { useAddressContext } from "../../../context/Addresses";
import useFetchAddresses from "../hooks/useFetchAddresses";

interface AddressBookProps {
	onSelectAddress?: (address: Address) => void;
	selectedAddressID?: string;
}

const AddressBook = ({
	onSelectAddress,
	selectedAddressID,
}: AddressBookProps) => {
	const { isFetchingAddresses, setAddresses, addresses } =
		useAddressContext();
	const { fetchAddresses } = useFetchAddresses();
	const { addAddress } = useAddAddress();
	const { updateAddress } = useUpdateAddress();
	const { deleteAddress } = useDeleteAddress();

	const [showEditModal, setShowEditModal] = useState(false);
	const [formAddress, setFormAddress] = useState<Address>(defaultAddress);
	const [formAddressErrors, setFormAddressErrors] =
		useState<AddressErrors>(defaultAddressErrors);
	const [isEditing, setIsEditing] = useState(false);
	const deleteDialogRef = useRef<HTMLDialogElement | null>(null);

	const openEditModal = () => {
		setShowEditModal(true);
	};
	const closeEditModal = () => {
		setShowEditModal(false);
	};

	if (isFetchingAddresses) {
		return <div>Loading...</div>;
	}

	return (
		<section className={styles.addressBook}>
			<h1>Select Delivery Address</h1>

			<div className={styles.addressList}>
				{addresses.length === 0 && (
					<div
						className={styles.noAddresses}
						style={{ textAlign: "center" }}
					>
						No addresses found
					</div>
				)}

				{addresses.map((address: Address, index: number) => {
					return (
						<AddressTile
							key={index}
							address={address}
							isSelected={selectedAddressID === address.id}
							select={() => {
								if (onSelectAddress) {
									onSelectAddress(address);
								}
							}}
							onEdit={() => {
								setIsEditing(true);
								setFormAddress(address);
								openEditModal();
							}}
							onDelete={() => {
								setFormAddress(address);
								deleteDialogRef.current?.showModal();
							}}
						/>
					);
				})}
				<div
					className={styles.addAddress}
					onClick={() => {
						setIsEditing(false);
						setFormAddress(defaultAddress);
						openEditModal();
					}}
				>
					+ Add new address
				</div>
			</div>
			<AddAddressDialog
				formAddress={formAddress}
				setFormAddress={setFormAddress}
				formAddressErrors={formAddressErrors}
				setFormAddressErrors={setFormAddressErrors}
				onClose={closeEditModal}
				isOpen={showEditModal}
				onSubmitButtonText={
					isEditing ? "Update Address" : "Add Address"
				}
				onSubmit={() => {
					if (isEditing) {
						updateAddress(formAddress).then(() => {
							fetchAddresses().then((data) => {
								setAddresses(data);
							});
						});
					} else {
						addAddress(formAddress).then(() => {
							fetchAddresses().then((data) => {
								setAddresses(data);
							});
						});
					}
					closeEditModal();
				}}
			/>
			<ConfirmDialog
				onConfirm={() =>
					deleteAddress(formAddress.id)
						.then(() => deleteDialogRef.current?.close())
						.then(() => {
							fetchAddresses().then((data) => {
								setAddresses(data);
							});
						})
				}
				confirmText="Delete"
				cancelText="Cancel"
				message="Are you sure you want to delete this address?"
				title="Delete Address?"
				dialogRef={deleteDialogRef}
			/>
		</section>
	);
};

export default AddressBook;
