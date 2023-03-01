<script>
    import { afterUpdate } from 'svelte';
    import { reveal } from 'svelte-reveal';
    import Carousel from 'svelte-carousel';

    let show = false;
    afterUpdate(() => {
        show = true;
    });

    $: particlesToShow = window.matchMedia('(max-width: 800px)').matches ? 1 : 4;
    $: duration = particlesToShow == 4 ? 8000 : 5000;
    onresize = () => {
        particlesToShow = window.matchMedia('(max-width: 800px)').matches ? 1 : 4;
        duration = particlesToShow == 4 ? 8000 : 5000;
    }

    let skills = [
        { name: 'Linux', img: 'tux.png' },
        { name: 'C', img: 'c.svg' },
        { name: 'C++', img: 'cpp.svg' },
        { name: 'C#', img: 'csharp.png' },
        { name: 'Rust', img: 'rust.svg' },
        { name: 'Go', img: 'go.svg' },
        { name: 'JavaScript', img: 'js.svg' },
        { name: 'Git', img: 'git.svg' },
        { name: 'Bash', img: 'bash.svg' },
    ];
</script>

{#if show}
<div id="skills" use:reveal={{ transition: "fly" }}>
    <h2>Skills</h2>
    <p id="subtext">
        What I've learned throughout the years
    </p>
    <div id="carousel-container">
        <Carousel particlesToShow={particlesToShow} dots={false} autoplay autoplayDuration={0} duration={duration} timingFunction="linear" arrows={false} swiping={false}>
            {#each skills as {name, img}}
            <div class="carousel-elem">
                <img src="languages/{img}" alt="{name}">
                <p>{name}</p>
            </div>
            {/each}
        </Carousel>
    </div>
</div>
{/if}

<style>
    #skills {
        width: 95vw;
        height: 50vh;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        margin-top: 105vh;
    }

    h2 {
        width: 100%;
        height: auto;
        margin: 3vh auto;
        margin-left: 1.8vw;
        margin-bottom: 0;
        font-family: 'Ubuntu';
        font-size: 1.9rem;
    }

    #subtext {
        font-size: 0.8rem;
        margin-left: 1.8vw;
        top: 8vh;
    }

    #carousel-container {
        width: 96.5%;
        margin-left: auto;
        margin-right: auto;
    }

    .carousel-elem {
        background-color: rgb(55, 55, 55);
        height: 25vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 3rem;
    }

    .carousel-elem img {
        height: 70%;
        max-width: 12vmax;
    }

    .carousel-elem p {
        font-size: 1.5rem;
        font-weight: 400;
        position: absolute;
        bottom: -2vh;
    }

    @media only screen and (max-width: 800px) {
        h2 {
            top: 1vh;
        }
    }
</style>
