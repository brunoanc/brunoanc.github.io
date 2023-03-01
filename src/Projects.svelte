<script>
    import { afterUpdate } from 'svelte';
    import { reveal } from 'svelte-reveal';
    import Carousel from 'svelte-carousel';

    let show = false;
    afterUpdate(() => {
        show = true;
    });

    $: particlesToShow = window.matchMedia('(max-width: 800px)').matches ? 1 : 3;
    onresize = () => { particlesToShow = window.matchMedia('(max-width: 800px)').matches ? 1 : 3; }

    let projects = [
        {
            name: 'EternalBasher',
            href: 'https://github.com/leveste/EternalBasher',
            img: 'bash.svg',
            desc: 'Collection of scripts for DOOM Eternal modding on Linux.'
        },
        {
            name: 'EternalModLoaderCpp',
            href: 'https://github.com/PowerBall253/EternalModLoaderCpp',
            img: 'cpp.svg',
            desc: 'DOOM Eternal mod loader, ported to C++ for Linux.'
        },
        {
            name: 'EternalModManager',
            href: 'https://github.com/PowerBall253/EternalModManager-Avalonia',
            img: 'csharp.png',
            desc: 'Cross-platform mod manager for DOOM Eternal.'
        },
        {
            name: 'AutoHeckinTextConverter',
            href: 'https://github.com/PowerBall253/AutoHeckinTextureConverter',
            img: 'rust.svg',
            desc: 'Cross-platform texture converter for DOOM Eternal.'
        },
        {
            name: 'BlangJsonGeneratorUI',
            href: 'https://github.com/PowerBall253/BlangJsonGeneratorUI',
            img: 'csharp.png',
            desc: 'GUI utility for creating string mods for DOOM Eternal.'
        },
        {
            name: 'EternalResourceExtractor',
            href: 'https://github.com/PowerBall253/EternalResourceExtractor',
            img: 'cpp.svg',
            desc: 'Small utility to extract files from a DOOM Eternal .resources file.'
        },
        {
            name: 'SAMUEL',
            href: 'https://github.com/brongo/SAMUEL',
            img: 'cpp.svg',
            desc: 'Tool for extracting assets from DOOM Eternal\'s archives.'
        },
        {
            name: 'EternalModLoader',
            href: 'https://github.com/dcealopez/EternalModLoader',
            img: 'csharp.png',
            desc: 'DOOM Eternal mod loader for Windows.'
        },
        {
            name: 'EternalPatcher',
            href: 'https://github.com/PowerBall253/EternalPatcherGo',
            img: 'go.svg',
            desc: 'DOOM Eternal executable patcher.'
        },
        {
            name: 'idRehash',
            href: 'https://github.com/PowerBall253/idRehashGo',
            img: 'go.svg',
            desc: 'DOOM Eternal .resources rehasher.'
        },
        {
            name: 'EternalPatchManifest',
            href: 'https://github.com/PowerBall253/EternalPatchManifestGo',
            img: 'go.svg',
            desc: 'DOOM Eternal build manifest patcher.'
        },
        {
            name: 'DOOMLauncher',
            href: 'https://github.com/PowerBall253/DOOMLauncher',
            img: 'csharp.png',
            desc: 'Launcher for DOOM (2016) that bypasses dev mode limitations on startup.'
        },
        {
            name: 'Portfolio',
            href: 'https://github.com/PowerBall253/PowerBall253.github.io',
            img: 'js.svg',
            desc: 'This webpage :)'
        }
    ];

    function scrollIntoView(target) {
        document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
    }
</script>

{#if show}
<div id="projects" use:reveal={{ transition: "fly" }}>
    
    
    
    
    <h2>Projects</h2>
    <p id="subtext">
        What I've created or worked on
    </p>
    <div id="carousel-container">
        <Carousel particlesToShow={particlesToShow} dots={false} autoplay autoplayDuration={4000} pauseOnFocus arrows={false}>
            {#each projects as {name, href, img, desc}}
            <div class="carousel-elem">
                <div class="project-title">
                    <a href="{href}" target="_blank" rel="noreferrer noopener">
                        {name}
                    </a>
                    <img src="languages/{img}" alt="" height="90%">
                </div>
                <p>
                    {desc}
                </p>
            </div>
            {/each}
        </Carousel>
    </div>
    <div id="arrow-container">
        <a href="#about" on:click|preventDefault="{() => scrollIntoView('about')}">
            <div id="arrow-2"/>
            <div id="arrow-1"/>
        </a>
        <footer>
            <p>© 2023 Bruno Ancona</p>
        </footer>
    </div>
</div>
{/if}

<style>
    #projects {
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
        margin-top: 150vh;
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
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .project-title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2rem;
        width: 33%;
        margin-top: 5%;
    }

    .project-title a {
        font-family: 'Ubuntu';
        font-size: 1.5rem;
        font-weight: 600;
        margin-right: 5%;
    }

    .project-title img {
        max-width: 20%;
    }

    .carousel-elem p {
        font-size: 1.2rem;
        font-weight: lighter;
        text-align: center;
        margin: auto;
        padding-bottom: 4%;
    }

    #arrow-container {
        width: 100%;
        height: 3vw;
        margin-top: 1.8rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
    }

    #arrow-container a {
        all: inherit;
        cursor: pointer;
        width: 5.5vh;
        height: 8vh;
        margin-bottom: 4vh;
    }

    #arrow-1 {
        min-width: 4vh;
        min-height: 4vh;
        transform: rotate(-135deg);
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
        transform: rotate(-135deg);
    }

    @keyframes arrow {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-1vh) rotate(-135deg);
        }
    }

    footer {
        font-size: 0.8rem;
        margin-left: auto;
        margin-right: auto;
        width: 95%;
        text-align: center;
    }

    @media only screen and (max-width: 800px) {
        h2 {
            top: 1vh;
        }
    }

    @media only screen and (max-height: 550px) {
        #arrow-1, #arrow-2 {
            display: none;
        }
    }

    @media only screen and (max-height: 500px) {
        footer {
            display: none;
        }
    }
</style>
