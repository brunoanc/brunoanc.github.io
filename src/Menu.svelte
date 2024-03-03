<script>
    let menuElements = [
        'About',
        'Skills',
        'Projects'
    ];

    function scrollIntoView(target) {
        document.getElementById(target.toLowerCase()).scrollIntoView({ behavior: 'smooth' });
    }
</script>

<nav id="navbar">
    <div id="nav-left">
        <a href="#top">
            <img src="terminal.png" alt="Icon" width="40" style="filter: invert(1);">
        </a>
    </div>
    <div id="nav-center">
        <ul>
            {#each menuElements as elem}
            <li>
                <a href="#skills" on:click|preventDefault="{() => scrollIntoView(elem)}">{elem}</a>
            </li>
            {/each}
        </ul>
    </div>
    <div id="nav-right">
        <a href="https://github.com/brunoanc" target="_blank" rel="noreferrer noopener">
            <button>
                <img src="socials/github.svg" alt="GitHub">
                <p>GitHub</p>
            </button>
        </a>
    </div>
</nav>

<style>
    #navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        width: 100%;
        height: 6.5vh;
        overflow: hidden;
        display: flex;
        font-size: 1rem;
        font-weight: 400;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(40, 40, 40);
    }

    #nav-left img:hover {
        opacity: 70%;
    }

    #nav-center {
        display: flex;
        justify-content: center;
    }

    #nav-center a:hover {
        text-decoration: underline;
    }

    #nav-center ul {
        display: flex;
        justify-content: center;
        width: 80%;
        padding: 5px 0;
    }

    #nav-center li {
        list-style-type: none;
        padding: 0 10%;
    }

    #nav-right {
        display: flex;
        flex-direction: row-reverse;
    }

    #nav-right button {
        background-color: rgb(25, 195, 28);
        border-radius: 10px;
        border: none;
        color: white;
        font-family: inherit;
        font-weight: 600;
        width: auto;
        padding: 5px;
        margin-top: 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    #nav-right button:hover {
        opacity: 70%;
    }

    #nav-right button img {
        min-height: 0;
        height: 1.5rem;
        padding: 0 0 0 5px;
    }

    #nav-right button p {
        padding: 0 5px 0 0;
        margin: 0 0 0 10px;
    }

    div {
        margin: 0 5vw;
        width: 33%;
    }

    img {
        vertical-align: bottom;
    }

    @media only screen and (max-width: 500px) {
        #nav-center {
            display: none;
        }

        div {
            margin: 1vh 3vw;
        }
    }
</style>
