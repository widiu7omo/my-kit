import type {ErrorMessage} from "lucia-auth/auth/error";

export const LOGIN_ERRORS:Record<ErrorMessage,string> = {
    AUTH_DUPLICATE_SESSION_ID: "You already log in.",
    AUTH_INVALID_PASSWORD: "Your password are not correct. Please try again",
    AUTH_INVALID_PROVIDER_ID: "Provider not found",
    AUTH_INVALID_REQUEST: "Request can't be process",
    AUTH_INVALID_SESSION_ID: "Session not found",
    AUTH_INVALID_USER_ID: "User not found",
    AUTH_NOT_AUTHENTICATED: "You are not log in",
    AUTH_OUTDATED_PASSWORD: "You need to update your password.",
    AUTO_USER_ID_GENERATION_NOT_SUPPORTED: "Auto generate unique id is not supported",
    REQUEST_UNAUTHORIZED: "Sorry, you don't access for this page.",
    UNKNOWN_ERROR: "Unknown Error",
    AUTH_DUPLICATE_PROVIDER_ID:"You already register on this site. Please sign in instead"

}