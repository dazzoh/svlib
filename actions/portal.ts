let state: { [key: string]: any } = {}

export function portal(node: HTMLElement, selector: string) {
    state[selector] = state[selector] || {}

    // Store this portals children
    state[selector].portalChildren = node.children

    // Find where the portal should go
    state[selector].targetNode = document.querySelector(selector)    

    // Backup the children of what the portal will replace
    state[selector].targetNodeChildren = state[selector].targetNode.children

    // Replace the original contents of the targetNode with the portal
    state[selector].targetNode.innerHTML = ''
    state[selector].targetNode.append(...state[selector].portalChildren)

    // On destroy swap back original target
    return {
        destroy() {
            try {
                state[selector].portalChildren = state[selector].portalChildren.clone
                state[selector].targetNode.innerHTML = ''
                state[selector].targetNode.append(...state[selector].targetNodeChildren)
            }catch(ex){
                // catch error, not sure if it is vite dev server but occasionally this block throws.
                console.error(ex);
            }

        }
    }
}
