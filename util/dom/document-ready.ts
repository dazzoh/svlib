let callbacks: (() => void)[] = [];
let listening = false;

export function documentReady(callback: () => void) {
    if (document.readyState === "complete") {
        callback();
    } else {
        callbacks.push(callback);
        if (!listening) {
            listening = true;
            document.addEventListener("readystatechange", () => {
                if (document.readyState === "complete") {
                    callbacks.forEach(cb => cb());
                    callbacks = [];
                }
            });
        }
    }
}

