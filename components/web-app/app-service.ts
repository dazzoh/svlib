

export class AppService {

    /**
     * Handle an error caught inside the application.  
     * 
     * Provides notification ability. At a mininum will log error to console.error.
     * 
     * @param ex 
     * @param message 
     * @param options 
     */
    handleError(message: string, ex: Error, options?: { notify: boolean }) {
        console.error(message, ex);
        if (options?.notify) {
            alert(message);
        }
    }
}