<script lang="ts">
    export let src: string;
    export let alt: string = "profile";
    export let testimonial: string;
</script>

<div class="testimonial">
    <img src={src} alt={alt} width="100px"/>
    <p>{testimonial}</p>
</div>

<style>
    img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }
    
    p {
        text-align: center;
        font-size: 1rem;
        margin: 1rem 0;
    }

    .testimonial {
        border-radius: 1rem;
        box-shadow: -5px -5px var(--primary-500) inset;
        border: 1px solid var(--primary-500);
        animation: shift 5000ms ease infinite;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }
</style>