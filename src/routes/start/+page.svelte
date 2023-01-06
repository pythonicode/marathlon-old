<script lang="ts">
     export let data: any;
</script>

<h1>Welcome!</h1>
<p>Check to make sure everything looks right.</p>
<div class="card">
    <img src={data.user.avatar} alt={data.user.first_name} class="profile"/>
    <div class="center">
        <h2>{data.user.first_name} {data.user.last_name}</h2>
    </div>
</div>
<button class="light">Continue</button>

<style>
    .center {
        text-align: center;
    }

    .dim {
        color: gray;
    }

    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin: 2rem 0;
    }

    .profile {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
    }
</style>