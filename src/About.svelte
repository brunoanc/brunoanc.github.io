<script>
    import { afterUpdate } from 'svelte';
    import { reveal } from 'svelte-reveal';

    let show = false;
    afterUpdate(() => {
        show = true;
    });

    let socials = [
        { src: 'github.svg', alt: 'GitHub', width: '4%', href: 'https://github.com/PowerBall253' },
        { src: 'discord.svg', alt: 'Discord', width: '5%', href: 'https://discordapp.com/users/313058866868912128' },
        { src: 'mail.png', alt: 'Email', width: '5%', href: 'mailto:bruno@powerball253.com' },
    ];

    function scrollIntoView(target) {
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
    }
</script>

{#if show}
<div id="about">
    <div id="about-container" use:reveal={{ transition: "fly" }}>
        <div id="container">
            <div id="about-info">
                <p id="intro">
                    Hi, my name is
                </p>
                <p id="name">
                    Bruno Ancona.
                </p>
                <p id="info">
                    Young computer enthusiast and hobbyist developer, interested on programming tools, modding games, and experimenting with software and hardware of any kind.
                </p>
                <div id="socials">
                    {#each socials as {src, alt, width, href}}
                    <a href="{href}" style="width: {width};" target="_blank" rel="noreferrer noopener">
                        <img src="socials/{src}" alt="{alt}" width="100%">
                    </a>
                    {/each}
                </div>
            </div>
            <div id="code-container">
                <img id="code" src="code.png" alt="">
            </div>
        </div>
    </div>
    <div id="arrow-container">
        <a href="#skills" on:click|preventDefault="{() => scrollIntoView('skills')}">
            <div id="arrow-2"/>
            <div id="arrow-1"/>
        </a>
    </div>
</div>
{/if}

<style>
    #about {
        width: 95vw;
        height: 100vh;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #about-container {
        width: 100%;
        height: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #container {
        width: 100%;
        display: flex;
    }

    #code-container {
        margin: 0 4%;
        width: 42%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #code {
        border-radius: 12px;
        width: 100%;
    }

    #about-info {
        width: 58%;
        margin: auto;
    }

    #intro {
        font-size: 2.2vmin;
        margin: auto;
        padding-left: 4.5vw;
    }

    #name {
        font-family: 'Ubuntu';
        font-size: 10.5vmin;
        font-weight: 900;
        margin: auto;
        padding-left: 4.1vw;
    }

    #info {
        font-size: 1.8vmin;
        padding-left: 4.5vw;
        margin-right: 15%;
        text-align: justify;
    }

    #socials {
        margin-left: 4.5vw;
        margin-top: 3%;
        display: flex;
    }

    #socials a {
        padding-right: 2%;
    }

    #socials img:hover {
        opacity: 70%;
    }

    #arrow-container {
        width: 100%;
        height: 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #arrow-container a {
        all: inherit;
        cursor: pointer;
        width: 5.5vh;
        height: 8vh;
    }

    #arrow-1 {
        min-width: 4vh;
        min-height: 4vh;
        transform: rotate(45deg);
        border-left: none;
        border-top: none;
        border-right: 2px #fff solid;
        border-bottom: 2px #fff solid;
    }

    #arrow-2 {
        min-width: 2vh;
        min-height: 2vh;
        border-left: none;
        border-top: none;
        border-right: 1px #fff solid;
        border-bottom: 1px #fff solid;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-name: arrow;
        transform: rotate(45deg);
    }

    @keyframes arrow {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(1vh) rotate(45deg);
        }
    }

    @media only screen and (max-width: 800px) {
        #container {
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;
        }

        #code-container {
            width: 90%;
        }

        #code {
            max-height: 30vh;
        }

        #about-info {
            width: 95%;
            margin: auto;
            margin-top: 10%;
        }

        #intro {
            font-size: 1rem;
            padding-left: 4.2vw;
        }

        #name {
            font-size: 3.5rem;
            padding-left: 3.4vw;
        }

        #info {
            font-size: 0.8rem;
            margin-right: 10%;
        }

        #socials {
            margin-top: 6%;
            margin-left: 6vw;
        }

        #socials img {
            transform: scale(2);
        }

        #socials a {
            padding-right: 8%;
        }
    }

    @media only screen and (max-height: 550px) {
        #arrow-1, #arrow-2 {
            display: none;
        }
    }
</style>
