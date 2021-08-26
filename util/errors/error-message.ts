// errors from using http fetch command

import { isEmpty } from "../string";


export interface IFetchError {
    status: number;
    statusText: string
}

/**
 * Tries to find an error message string from a variety of error types
 * @param err
 * @param logError
 */
export function getErrorMessage(err: Error | IFetchError, logError = false): string {
    switch (true) {
        case err.hasOwnProperty("message") && !isEmpty((err as Error)["message"]):
            return (err as Error)["message"];

        case err.hasOwnProperty("statusText") && !isEmpty((err as IFetchError)["statusText"]) :
            return `Fetch Error: ${(err as IFetchError)["statusText"]}`;

        default:
            if (logError) {
                console.error(err);
            }
            return "unknown error";
    }
}
