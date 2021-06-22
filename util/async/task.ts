/**
 *  A task with a deferred cleanup task that runs after a timeout.
 *  Subsequent calls to run() while the task is waiting for the timeout will only reset the cleanup timer by default,
 *  pass in false to the run() method to trigger the task to run regardless.
 */
export class CleanupTask {

  private isRunning = false;
  private timeout?: number;

  constructor(private task: () => void,
              private completion: () => void,
              private completionDelay: number) {
  }

  /**
   * Trigger a run, resets the timer if it is currently waiting to complete.  Optionally runs the task again anyway.
   * @param ignoreIfWaiting - do not run the task if it has been executed and the completion function has not yet run.
   */
  run(ignoreIfWaiting = true) {
    const startTimer = () => {
      // @ts-ignore
      this.timeout = setTimeout(() => {
        this.completion();
        this.isRunning = false;
      }, this.completionDelay);
    };

    if (this.isRunning) {
      clearTimeout(this.timeout);
      if (!ignoreIfWaiting) {
        this.task();
      }
      startTimer();
    } else {
      this.task();
      this.isRunning = true;
      startTimer();
    }
  }
}
