<script>
    export let name = '';
    export let backToTopLabel = 'Back to top';
</script>

<footer>
    <p>© {new Date().getFullYear()} {name}</p>
    <a href="#home">{backToTopLabel}</a>
</footer>
