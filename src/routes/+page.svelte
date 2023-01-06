<script>
    import MagicText from "$lib/components/core/MagicText.svelte";
	import Testimonial from "$lib/components/interface/index/Testimonial.svelte";
	import Header from "$lib/components/layout/Header.svelte";
    import Typewriter from 'svelte-typewriter';

    import { fade } from "svelte/transition";
</script>

<Header />
<main
    in:fade={{ duration: 500, delay: 500 }}
    out:fade={{ duration: 500 }}
>
    <section>
        <div class="intro">
            <h1>
                <MagicText>Personalized</MagicText> coaching and <br/> training for 
                <span class="accent" style="--cursor-width: 0.5rem">
                    <Typewriter mode="loop" wordInterval={3000} interval={45}>
                        <span class="type" title="endurance athletes">endurance athletes</span>
                        <span class="type" title="marathon runners">marathon runners</span>
                        <span class="type" title="hobby joggers">hobby joggers</span>
                        <span class="type" title="weekend warriors">weekend warriors</span>
                    </Typewriter>
                </span>
            </h1>
            <div class="testimonials">
                <Testimonial src="https://picsum.photos/200" testimonial="Placeholder text for an actual testimonial that says the product is so good!" />
                <Testimonial src="https://picsum.photos/200" testimonial="It's just amazing how much I improved after following an actual training plan." />
                <Testimonial src="https://picsum.photos/200" testimonial="Great service!" />
            </div>
        </div>
        <img src="./runner.jpg" alt="runner" class="hero"/>
    </section>
    <section class="solid">
        <h1>Lorem</h1>
    </section>
</main>

<style>
    h1 {
        text-align: center;
        font-size: clamp(2rem, 3vw, 3rem);
        font-weight: 800;
        width: 100%;
        margin: 2rem 0;
    }

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100vw;
    }

    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5%;
        gap: 5%;
    }

    section.solid {
        width: 100%;
        background: linear-gradient(
            to right,
            var(--primary-500),
            var(--primary-700)
        );
        color: #FFF;
    }

    img {
        max-width: 80vw;
    }

    .hero {
        display: none;
    }

    .type::before {
        display: block;
        content: attr(title);
        font-weight: bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }

    .testimonials {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;

        width: 100%;
    }

    @media only screen and (min-width: 768px) {
        h1 {
            text-align: left;
        }

        section {
            flex-direction: row;
        }

        .hero {
            display: block;
            width: 35%;
        }

        .testimonials {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2rem;

            width: 100%;
        }
    }

    .intro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .accent {
        position: relative;
        display: inline-block;
        color: var(--primary-600)
    }
</style>
