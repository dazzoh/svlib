import {eleBuilder} from "./element-builder";

const builder = eleBuilder("div")
    .style("position", "absolute")
    .style("width", "1px")
    .style("height", "1px");

/**
 * Notification of container resizing via IntersectionObserver trickery.
 * watched element must be position: absolute | fixed | relative. No IE11 support.
 *
 * NB: must call destroy() when done.
 */
export class ResizeDetection {
    private tl = builder.build();
    private tr = builder.build();
    private bl = builder.build();
    private br = builder.build();
    private observer: IntersectionObserver;

    private containerWidth = 0;
    private containerHeight = 0;
    private timeout?: number;
    private onResize?: (data:{dx: number, dy: number}) => void

    constructor(private element: HTMLElement, onResize: (data:{dx: number, dy: number}) => void) {
        element.appendChild(this.tl);
        element.appendChild(this.tr);
        element.appendChild(this.bl);
        element.appendChild(this.br);
        this.onResize = onResize;
        const options = {
            root: element,
            rootMargin: "0px",
            threshold: 1.0
        };
        this.observer = new IntersectionObserver(this.callback, options);
        this.observer.observe(this.tl);
        this.observer.observe(this.tr);
        this.observer.observe(this.bl);
        this.observer.observe(this.br);
        this.setHeights();
        this.setWidths();
    }

    destroy(removeElements = false){
        this.observer.disconnect();
        this.onResize = undefined;
        if(removeElements){
            this.element.removeChild(this.tl);
            this.element.removeChild(this.tr);
            this.element.removeChild(this.bl);
            this.element.removeChild(this.br);
        }
    }

    private setHeights() {
        this.containerHeight = this.element.offsetHeight;
        this.tl.style.top = this.containerHeight - 1 + "px";
        this.tr.style.top = this.containerHeight - 1 + "px";
        this.bl.style.top = this.containerHeight + 1 + "px";
        this.br.style.top = this.containerHeight + 1 + "px";

    }

    private setWidths() {
        this.containerWidth = this.element.offsetWidth;
        this.tl.style.left = this.containerWidth - 1 + "px";
        this.bl.style.left = this.containerWidth - 1 + "px";
        this.tr.style.left = this.containerWidth + 1 + "px";
        this.br.style.left = this.containerWidth + 1 + "px";
    }

    /**
     * Observer callback
     */
    private callback = () => {
        if (this.timeout != null) {
            cancelAnimationFrame(this.timeout);
        }
        this.timeout = requestAnimationFrame(() => {
            const width = this.containerWidth;
            const height = this.containerHeight;
            this.setWidths();
            this.setHeights();
            this.timeout = undefined;
            const dx = this.containerWidth - width;
            const dy = this.containerHeight - height;
            if (dx !== 0 || dy !== 0 ) {
                this.onResize!({dx: dx, dy: dy});
            }
        });
    };
}
