<script>
	import Logo from "$lib/icons/Logo.svelte";

</script>
<header>
    <div>
        <Logo size="clamp(3rem, 4vw, 4rem)"/>
    </div> 
    <nav>
        <a href="/login">
            <button class="light large">Login</button>
        </a>
        <a href="/connect">
            <button class="large">Get Started</button>
        </a>
    </nav>
</header>

<style>
    header {
        width: 80vw;
        padding: 1rem 10vw;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
    }

    nav {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .logo {
        width: 4rem;
        height: 4rem;
    }
</style>