<svg viewBox='0 0 100 100' width={diameter} height={diameter} xmlns='http://www.w3.org/2000/svg'
     style=" transition: all .2s ease-in-out;"
     bind:this={svgEle}>
    <path d="M 0,0 100,0 50,100 z"/>
</svg>

<script lang="ts">
    export let diameter: string = '1rem';
    /**
     *  rotation in deg eg: -90deg
     */
    export let rotate: string = undefined;

    let svgEle: SVGSVGElement;

    $:{
        if (rotate && svgEle) {
            svgEle.style.transform = `rotate(${rotate})`
        }
    }
</script>
