import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/init";
import { PATHS } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleFirebaseError } from "../../../firebase/errors";

const provider = new GoogleAuthProvider();

const useThirdPartyAuth = () => {
	const navigate = useNavigate();

	const googleAuth = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const tokenResult = await result.user.getIdTokenResult();
			if (tokenResult) {
				navigate(PATHS.DASHBOARD);
			}
		} catch (error) {
			toast.error(handleFirebaseError(error));
		}
	};
	return { googleAuth };
};

export default useThirdPartyAuth;
