<script lang="ts">
	import { onMount, onDestroy } from "svelte";

    const starLeft = () => `${Math.random() * 100}%`;
    const starTop = () => `${Math.random() * 100}%`;

    const stars = Array.from({ length: 4 }, () => [starLeft(), starTop()]);

    let intervals: NodeJS.Timer[] = [];
    for(let i = 0; i < stars.length; i++) {
        setTimeout(() => {
            const interval = setInterval(() => {
                stars[i] = [starLeft(), starTop()];
            }, 1000);
            intervals.push(interval);
        }, 250 * i);
    };
    

    onDestroy(() => {
        for(const interval of intervals) clearInterval(interval);
    });
</script>

<span class="magic">
    {#each stars as star, i}
        <span style="animation-delay: {i * 250}ms; --star-left: {star[0]}; --star-top: {star[1]}" class="magic-star">
            <svg viewBox="0 0 512 512">
                <path fill="#ea698b" d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
            </svg>
        </span>
    {/each}
    <span class="magic-text"><slot /></span>
</span>


<style>
    .magic {
        position: relative;
    }

    .magic > .magic-star {
        --size: clamp(20px, 1.5vw, 30px);
        
        animation: scale 1000ms ease infinite;
        display: block;
        height: var(--size);
        left: var(--star-left);
        position: absolute;
        top: var(--star-top);
        width: var(--size);
    }

    @keyframes scale {
        from, to {
            transform: scale(0);
        }
        
        50% {
            transform: scale(1);
        }
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        
        to {
            transform: rotate(180deg);
        }
    }

    .magic > .magic-star > svg {
        animation: rotate 1000ms linear infinite;
        display: block;
        opacity: 0.7;
        z-index: -1;
    }

    .magic > .magic-star > svg > path {
        fill: var(--primary-500);
    }

    @keyframes background-pan {
        from {
            background-position: 0% center;
        }
        
        to {
            background-position: -200% center;
        }
    }

    .magic > .magic-text {
        position: relative;
        z-index: 1;
        animation: background-pan 10s linear infinite;
        background: linear-gradient(
            to right,
            var(--primary-600),
            var(--primary-700),
            var(--primary-600),
            var(--primary-700),
            var(--primary-600)
        );
        background-size: 200%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
    }
</style>