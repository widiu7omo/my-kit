import type {ErrorMessage} from "lucia-auth/auth/error";
import type {ErrorInput} from "$lib/components/commons/inputs/Input";

export type AuthErrorMessage = ErrorMessage & "AUTH_WRONG_CONFIRM_PASSWORD" | string

export const LOGIN_ERRORS: Record<AuthErrorMessage, string> = {
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
    AUTH_DUPLICATE_PROVIDER_ID: "You already register on this site. Please sign in instead",
    AUTH_WRONG_CONFIRM_PASSWORD: "Your confirmation password are not match. Please try again"
}
export const errorInputGenerator = (message: string, ...fields: string[]) => {
    const errors: ErrorInput[] = []
    if (fields.length > 0) {
        errors.push({
            path: fields,
            message
        })
    }
    return errors;
}
export const errorInputGeneratorAuth = (message: AuthErrorMessage) => {
    const errors: ErrorInput[] = []
    if (LOGIN_ERRORS[message]) {
        errors.push({
            path: getInputPathError(message),
            message: LOGIN_ERRORS[message]
        })
    }
    return errors;
}

function getInputPathError(errorType: AuthErrorMessage): string[] {
    switch (errorType) {
        case "AUTH_INVALID_SESSION_ID":
            return []
        case "AUTH_INVALID_PASSWORD":
            return ['password']
        case "AUTH_INVALID_PROVIDER_ID":
            return ['']
        case "AUTH_DUPLICATE_SESSION_ID":
            return ['']
        case "AUTH_DUPLICATE_PROVIDER_ID":
            return ['email']
        case "AUTH_INVALID_USER_ID":
            return ['email']
        case "AUTH_INVALID_REQUEST":
            return ['']
        case "AUTH_NOT_AUTHENTICATED":
            return ['']
        case "REQUEST_UNAUTHORIZED":
            return ['']
        case "UNKNOWN_ERROR":
            return ['']
        case "AUTH_OUTDATED_PASSWORD":
            return ['password']
        case "AUTO_USER_ID_GENERATION_NOT_SUPPORTED":
            return ['']
        case "AUTH_WRONG_CONFIRM_PASSWORD":
            return ['confirmPassword']
        default:
            return ['']
    }
}