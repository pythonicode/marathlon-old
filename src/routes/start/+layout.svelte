<main>
    <section>
        <slot />
    </section>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;

        background: linear-gradient(
            to right,
            var(--primary-600),
            var(--primary-800)
        );
    }

    section {
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 2rem;
        min-width: 25%;
        width: 100%;
        max-width: min(32rem, 90vw);
        background-color: white;
    }
</style>