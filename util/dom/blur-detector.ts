/**
 * Detects user tabbing out or clicking elsewhere in the document.
 * Achieved by walking up the parentElement nodes from the ui event and finding a match against the parent element
 * passed in to the constructor.  If the parent never matches, a loss of focus is assumed and the blur callback is run.
 */
export class BlurDetector {

    private _on = false;

    constructor(private _parent: HTMLElement, private onBlurCallback: (event?:UIEvent) => void) {
    }

    public on() {
        if (this._on) {
            return;
        }
        document.addEventListener("wheel", this.onFocusLost, true);
        document.addEventListener("keyup", this.onFocusLost, true);
        document.addEventListener("click", this.onFocusLost, true);
        this._on = true;
    }

    public toggle(on: boolean) {
        if (on) {
            this.on();
        } else {
            this.off();
        }
    }

    public off() {
        if (!this._on) {
            return;
        }
        document.removeEventListener("wheel", this.onFocusLost, true);
        document.removeEventListener("keyup", this.onFocusLost, true);
        document.removeEventListener("click", this.onFocusLost, true);
        this._on = false;
    }

    onFocusLost = (event: UIEvent) => {
        let ele: HTMLElement | null = event.target as HTMLElement;
        let blur = true;
        while (ele) {
            if (ele === this._parent) {
                blur = false;
                break;
            }
            ele = ele.parentElement;
        }

        if (blur) {
            this.onBlurCallback(event);
        }
    }
}
