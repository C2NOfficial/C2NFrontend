import { FirebaseError } from "firebase/app";

/**AUTH ERROR CODES
 * @see https://firebase.google.com/docs/reference/js/auth#autherrorcodes for auth errors
 */
const AUTH_ERRORS = {
  USER_NOT_FOUND: "auth/user-not-found",
  WRONG_PASSWORD: "auth/wrong-password",
  EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
  WEAK_PASSWORD: "auth/weak-password",
  INVALID_EMAIL: "auth/invalid-email",
  TOO_MANY_REQUESTS: "auth/too-many-requests",
  NETWORK_REQUEST_FAILED: "auth/network-request-failed",
  USER_DISABLED: "auth/user-disabled",
  OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL:
    "auth/account-exists-with-different-credential",
  INVALID_CREDENTIAL: "auth/invalid-credential",
  INVALID_VERIFICATION_CODE: "auth/invalid-verification-code",
  INVALID_VERIFICATION_ID: "auth/invalid-verification-id",
  MISSING_VERIFICATION_CODE: "auth/missing-verification-code",
  MISSING_VERIFICATION_ID: "auth/missing-verification-id",
  EXPIRED_ACTION_CODE: "auth/expired-action-code",
  INVALID_ACTION_CODE: "auth/invalid-action-code",
  REQUIRES_RECENT_LOGIN: "auth/requires-recent-login",
  PROVIDER_ALREADY_LINKED: "auth/provider-already-linked",
  CREDENTIAL_ALREADY_IN_USE: "auth/credential-already-in-use",
  POPUP_CLOSED_BY_USER: "auth/popup-closed-by-user",
  CANCELLED_POPUP_REQUEST: "auth/cancelled-popup-request",
  POPUP_BLOCKED: "auth/popup-blocked",
  MULTI_FACTOR_AUTH_REQUIRED: "auth/multi-factor-auth-required",
  INVALID_API_KEY: "auth/invalid-api-key",
  USER_MISMATCH: "auth/user-mismatch",
  USER_TOKEN_EXPIRED: "auth/user-token-expired",
  ADMIN_RESTRICTED_OPERATION: "auth/admin-restricted-operation",
  EMAIL_CHANGE_NEEDS_VERIFICATION: "auth/email-change-needs-verification",
  TENANT_ID_MISMATCH: "auth/tenant-id-mismatch",
};

/** FIRESTORE ERROR CODES
 *  @see https://firebase.google.com/docs/reference/node/firebase.firestore#firestoreerrorcode for firestore errors
 */
const FIRESTORE_ERRORS = {
  PERMISSION_DENIED: "permission-denied",
  NOT_FOUND: "not-found",
  UNAVAILABLE: "unavailable",
  RESOURCE_EXHAUSTED: "resource-exhausted",
  FAILED_PRECONDITION: "failed-precondition",
  ABORTED: "aborted",
  CANCELLED: "cancelled",
  DEADLINE_EXCEEDED: "deadline-exceeded",
  ALREADY_EXISTS: "already-exists",
};

/** STORAGE ERROR CODES
 *  @see https://firebase.google.com/docs/storage/web/handle-errors for storage errors
 */
const STORAGE_ERRORS = {
  UNKNOWN: "storage/unknown",
  OBJECT_NOT_FOUND: "storage/object-not-found",
  BUCKET_NOT_FOUND: "storage/bucket-not-found",
  PROJECT_NOT_FOUND: "storage/project-not-found",
  QUOTA_EXCEEDED: "storage/quota-exceeded",
  UNAUTHENTICATED: "storage/unauthenticated",
  UNAUTHORIZED: "storage/unauthorized",
  RETRY_LIMIT_EXCEEDED: "storage/retry-limit-exceeded",
  INVALID_CHECKSUM: "storage/invalid-checksum",
  CANCELED: "storage/canceled",
  INVALID_EVENT_NAME: "storage/invalid-event-name",
  INVALID_URL: "storage/invalid-url",
  INVALID_ARGUMENT: "storage/invalid-argument",
  NO_DEFAULT_BUCKET: "storage/no-default-bucket",
  CANNOT_SLICE_BLOB: "storage/cannot-slice-blob",
  SERVER_FILE_WRONG_SIZE: "storage/server-file-wrong-size",
};

/**
 * List of Firebase error codes with user friendly error messages.
 * @type {Object}
 */
const firebaseErrorMessages = {
  [AUTH_ERRORS.USER_NOT_FOUND]: "No account found with this email.",
  [AUTH_ERRORS.WRONG_PASSWORD]: "Incorrect password. Please try again.",
  [AUTH_ERRORS.EMAIL_ALREADY_IN_USE]: "This email is already registered.",
  [AUTH_ERRORS.WEAK_PASSWORD]: "Your password should be at least 6 characters.",
  [AUTH_ERRORS.INVALID_EMAIL]: "The email address is invalid.",
  [AUTH_ERRORS.TOO_MANY_REQUESTS]:
    "Too many attempts. Please wait and try again.",
  [AUTH_ERRORS.NETWORK_REQUEST_FAILED]:
    "Network error. Please check your internet connection.",
  [AUTH_ERRORS.USER_DISABLED]: "This account has been disabled.",
  [AUTH_ERRORS.OPERATION_NOT_ALLOWED]:
    "Operation not allowed. Please contact support.",
  [AUTH_ERRORS.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL]:
    "An account already exists with the same email but different sign-in method.",
  [AUTH_ERRORS.INVALID_CREDENTIAL]:
    "Invalid credentials provided. Please try again.",
  [AUTH_ERRORS.INVALID_VERIFICATION_CODE]:
    "Invalid verification code. Please check and try again.",
  [AUTH_ERRORS.INVALID_VERIFICATION_ID]:
    "Invalid verification ID. Please request a new code.",
  [AUTH_ERRORS.MISSING_VERIFICATION_CODE]:
    "Missing verification code. Please enter the code.",
  [AUTH_ERRORS.MISSING_VERIFICATION_ID]:
    "Missing verification ID. Please try again.",
  [AUTH_ERRORS.EXPIRED_ACTION_CODE]:
    "This action link has expired. Please request a new one.",
  [AUTH_ERRORS.INVALID_ACTION_CODE]:
    "The action code is invalid. Please check and try again.",
  [AUTH_ERRORS.REQUIRES_RECENT_LOGIN]:
    "Please log in again to complete this operation.",
  [AUTH_ERRORS.PROVIDER_ALREADY_LINKED]:
    "This provider is already linked to the account.",
  [AUTH_ERRORS.CREDENTIAL_ALREADY_IN_USE]:
    "This credential is already associated with another account.",
  [AUTH_ERRORS.POPUP_CLOSED_BY_USER]:
    "The popup was closed before completing the sign in.",
  [AUTH_ERRORS.CANCELLED_POPUP_REQUEST]:
    "Cancelled popup request. Please try again.",
  [AUTH_ERRORS.POPUP_BLOCKED]:
    "Popup blocked by the browser. Please allow popups.",
  [AUTH_ERRORS.MULTI_FACTOR_AUTH_REQUIRED]:
    "Multi-factor authentication required to sign in.",
  [AUTH_ERRORS.INVALID_API_KEY]: "Invalid API key. Please contact support.",
  [AUTH_ERRORS.USER_MISMATCH]:
    "Credential does not correspond to the previously signed-in user.",
  [AUTH_ERRORS.USER_TOKEN_EXPIRED]:
    "Your session has expired. Please sign in again.",
  [AUTH_ERRORS.ADMIN_RESTRICTED_OPERATION]:
    "This operation is restricted. Please contact support.",
  [AUTH_ERRORS.EMAIL_CHANGE_NEEDS_VERIFICATION]:
    "Please verify your email before changing it.",
  [AUTH_ERRORS.TENANT_ID_MISMATCH]: "Tenant mismatch. Please contact support.",

  [FIRESTORE_ERRORS.PERMISSION_DENIED]:
    "You do not have permission to perform this operation.",
  [FIRESTORE_ERRORS.NOT_FOUND]: "Requested document not found.",
  [FIRESTORE_ERRORS.UNAVAILABLE]:
    "Service unavailable. Please try again later.",
  [FIRESTORE_ERRORS.RESOURCE_EXHAUSTED]:
    "Quota exceeded. Please contact support.",
  [FIRESTORE_ERRORS.FAILED_PRECONDITION]:
    "Operation failed due to precondition not met.",
  [FIRESTORE_ERRORS.ABORTED]: "The operation was aborted. Please try again.",
  [FIRESTORE_ERRORS.CANCELLED]: "The operation was cancelled.",
  [FIRESTORE_ERRORS.DEADLINE_EXCEEDED]: "Request timed out. Please try again.",
  [FIRESTORE_ERRORS.ALREADY_EXISTS]: "Resource already exists.",

  [STORAGE_ERRORS.UNKNOWN]: "An unknown storage error occurred.",
  [STORAGE_ERRORS.OBJECT_NOT_FOUND]: "The requested file does not exist.",
  [STORAGE_ERRORS.BUCKET_NOT_FOUND]:
    "The specified storage bucket does not exist.",
  [STORAGE_ERRORS.PROJECT_NOT_FOUND]:
    "No project is configured for Cloud Storage.",
  [STORAGE_ERRORS.QUOTA_EXCEEDED]: "Quota exceeded for Cloud Storage.",
  [STORAGE_ERRORS.UNAUTHENTICATED]:
    "You must be signed in to upload or download files.",
  [STORAGE_ERRORS.UNAUTHORIZED]:
    "You don’t have permission to access this file.",
  [STORAGE_ERRORS.RETRY_LIMIT_EXCEEDED]:
    "Retry limit exceeded. Please try again.",
  [STORAGE_ERRORS.INVALID_CHECKSUM]:
    "File corrupted during upload. Please try again.",
  [STORAGE_ERRORS.CANCELED]: "Upload canceled by the user.",
  [STORAGE_ERRORS.INVALID_EVENT_NAME]: "Invalid event name used in listener.",
  [STORAGE_ERRORS.INVALID_URL]:
    "The provided URL is not in a recognized format.",
  [STORAGE_ERRORS.INVALID_ARGUMENT]:
    "Invalid argument provided to Storage method.",
  [STORAGE_ERRORS.NO_DEFAULT_BUCKET]:
    "No default storage bucket configured in Firebase project.",
  [STORAGE_ERRORS.CANNOT_SLICE_BLOB]: "Cannot slice the given blob or file.",
  [STORAGE_ERRORS.SERVER_FILE_WRONG_SIZE]:
    "Server file size does not match client file size.",
};

/**
 * Handle Firebase errors. Returns a human readable error message from the firebase error codes
 * defined in the firebaseErrorMessages object.
 * @param {Error} error
 * @returns {string}
 */
function handleFirebaseError(error: unknown): string {
  if (error instanceof FirebaseError) {
    return (
      firebaseErrorMessages[error.code] ||
      "Something went wrong. Please try again."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export { handleFirebaseError };

