<script>
    const stars = [
        { x: 6, y: 12, r: 0.9, o: 0.42 },
        { x: 12, y: 26, r: 1.2, o: 0.78 },
        { x: 18, y: 18, r: 0.8, o: 0.34 },
        { x: 22, y: 34, r: 0.9, o: 0.46 },
        { x: 28, y: 14, r: 1.4, o: 0.82 },
        { x: 34, y: 24, r: 0.7, o: 0.28 },
        { x: 40, y: 12, r: 1.1, o: 0.5 },
        { x: 46, y: 30, r: 1.6, o: 0.86 },
        { x: 52, y: 16, r: 0.8, o: 0.33 },
        { x: 58, y: 22, r: 1.3, o: 0.7 },
        { x: 64, y: 10, r: 0.9, o: 0.44 },
        { x: 70, y: 28, r: 1.7, o: 0.88 },
        { x: 76, y: 12, r: 1.1, o: 0.54 },
        { x: 82, y: 20, r: 0.8, o: 0.32 },
        { x: 88, y: 14, r: 1.2, o: 0.72 },
        { x: 93, y: 8, r: 0.9, o: 0.4 },
        { x: 10, y: 52, r: 0.8, o: 0.34 },
        { x: 16, y: 62, r: 1.4, o: 0.82 },
        { x: 22, y: 56, r: 1.1, o: 0.56 },
        { x: 30, y: 68, r: 0.7, o: 0.24 },
        { x: 38, y: 58, r: 1.2, o: 0.64 },
        { x: 45, y: 72, r: 1.6, o: 0.86 },
        { x: 52, y: 60, r: 0.9, o: 0.36 },
        { x: 60, y: 74, r: 1.1, o: 0.52 },
        { x: 68, y: 62, r: 0.8, o: 0.3 },
        { x: 74, y: 70, r: 1.5, o: 0.82 },
        { x: 82, y: 58, r: 1, o: 0.48 },
        { x: 90, y: 66, r: 1.3, o: 0.72 },
        { x: 95, y: 52, r: 0.8, o: 0.3 },
        { x: 8, y: 84, r: 1, o: 0.44 },
        { x: 18, y: 90, r: 1.7, o: 0.9 },
        { x: 28, y: 82, r: 0.9, o: 0.34 },
        { x: 36, y: 92, r: 1.2, o: 0.64 },
        { x: 44, y: 86, r: 0.8, o: 0.28 },
        { x: 56, y: 90, r: 1.3, o: 0.7 },
        { x: 66, y: 84, r: 0.9, o: 0.38 },
        { x: 76, y: 92, r: 1.4, o: 0.8 },
        { x: 86, y: 86, r: 1.1, o: 0.5 },
        { x: 94, y: 94, r: 0.8, o: 0.26 }
    ];

    const constellations = [
        [
            { x: 12, y: 26 },
            { x: 18, y: 18 },
            { x: 28, y: 14 },
            { x: 40, y: 12 },
            { x: 46, y: 30 }
        ],
        [
            { x: 70, y: 28 },
            { x: 76, y: 12 },
            { x: 88, y: 14 },
            { x: 82, y: 20 }
        ],
        [
            { x: 68, y: 62 },
            { x: 74, y: 70 },
            { x: 82, y: 58 },
            { x: 90, y: 66 }
        ]
    ];

    const pathFromPoints = (points) =>
        points
            .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x * 10} ${point.y * 10}`)
            .join(' ');
</script>

<svg
    class="starfield"
    viewBox="0 0 1000 1000"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
>
    <defs>
        <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f7fbff" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#7aa6ff" stop-opacity="0" />
        </radialGradient>
    </defs>

    {#each constellations as points}
        <path d={pathFromPoints(points)} />
    {/each}

    {#each stars as star}
        <circle
            class="glow"
            cx={star.x * 10}
            cy={star.y * 10}
            r={star.r * 1.35}
            style={`opacity:${Math.min(star.o * 0.12, 0.1)}`}
        />
        <circle cx={star.x * 10} cy={star.y * 10} r={star.r} style={`opacity:${star.o}`} />
    {/each}
</svg>
