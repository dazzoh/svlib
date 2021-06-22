/**
 * Detect loss of focus of an element.
 * @param element
 * @param args - {
 *     callback - function called when focus is lost
 *     focusRoot - the element to check up to when determining if event triggered within scope (and therefore focus not lost)
 * }
 */
export function focusLost(element: HTMLElement, args: { callback: () => void, focusRoot?: HTMLElement }) {

    // where to test up to for blur
    const focusRoot = args.focusRoot ?? element;
    const callback = args.callback;

    document.addEventListener('wheel', onFocusLost, false);
    document.addEventListener('keyup', onFocusLost, false);
    document.addEventListener('click', onFocusLost, false);

    function onFocusLost(event: UIEvent) {
        let ele: HTMLElement | null = event.target as HTMLElement;
        let blur = true;

        while (ele) {
            if (ele === focusRoot) {
                blur = false;
                break;
            }
            ele = ele.parentElement;
        }

        if (blur) {
            callback();
        }
    }


    return {
        destroy() {
            document.removeEventListener('wheel', onFocusLost, false);
            document.removeEventListener('keyup', onFocusLost, false);
            document.removeEventListener('click', onFocusLost, false);
        }
    }
}
