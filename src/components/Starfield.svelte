<script>
    const stars = [
        [4, 9, 1.1, 0.5],
        [9, 24, 1.7, 0.85],
        [15, 15, 0.8, 0.42],
        [20, 35, 1.1, 0.62],
        [26, 8, 1.5, 0.8],
        [31, 27, 0.7, 0.35],
        [37, 14, 1.2, 0.65],
        [43, 33, 1.7, 0.88],
        [49, 10, 0.8, 0.38],
        [55, 24, 1.3, 0.72],
        [61, 7, 1, 0.54],
        [67, 31, 1.8, 0.92],
        [73, 12, 1.1, 0.65],
        [79, 23, 0.8, 0.4],
        [86, 9, 1.4, 0.78],
        [94, 28, 0.9, 0.48],
        [6, 49, 0.8, 0.4],
        [13, 64, 1.5, 0.82],
        [19, 54, 1.1, 0.58],
        [25, 72, 0.7, 0.34],
        [33, 60, 1.3, 0.7],
        [40, 78, 1.8, 0.9],
        [47, 57, 0.9, 0.44],
        [53, 72, 1.2, 0.62],
        [59, 49, 0.8, 0.38],
        [65, 66, 1.6, 0.84],
        [72, 53, 1, 0.52],
        [78, 76, 1.4, 0.76],
        [84, 60, 0.8, 0.38],
        [91, 69, 1.3, 0.74],
        [96, 48, 0.8, 0.36],
        [7, 87, 1.1, 0.52],
        [17, 94, 1.8, 0.92],
        [29, 84, 0.9, 0.42],
        [36, 96, 1.3, 0.7],
        [48, 89, 0.8, 0.34],
        [58, 95, 1.4, 0.78],
        [69, 86, 0.9, 0.44],
        [81, 92, 1.5, 0.84],
        [90, 84, 1.1, 0.56],
        [97, 96, 0.8, 0.32]
    ];

    const constellations = [
        [
            [9, 24],
            [15, 15],
            [26, 8],
            [37, 14],
            [43, 33]
        ],
        [
            [67, 31],
            [73, 12],
            [86, 9],
            [79, 23]
        ],
        [
            [59, 49],
            [65, 66],
            [72, 53],
            [84, 60],
            [91, 69]
        ],
        [
            [7, 87],
            [17, 94],
            [29, 84],
            [36, 96]
        ]
    ];

    const pathFromPoints = (points) =>
        points
            .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point[0] * 10} ${point[1] * 10}`)
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
            <stop offset="0%" stop-color="#fff" stop-opacity="1" />
            <stop offset="42%" stop-color="#67e3ff" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#67e3ff" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="constellation-line" x1="0" x2="1">
            <stop offset="0" stop-color="#67e3ff" />
            <stop offset="0.5" stop-color="#ff57b6" />
            <stop offset="1" stop-color="#fdca40" />
        </linearGradient>
    </defs>

    <g class="constellations">
        {#each constellations as points}
            <path d={pathFromPoints(points)} />
        {/each}
    </g>

    <g class="tiny-stars">
        {#each stars as star}
            <circle
                class="glow"
                cx={star[0] * 10}
                cy={star[1] * 10}
                r={star[2] * 5.5}
                style={`opacity:${star[3] * 0.17}`}
            />
            <circle cx={star[0] * 10} cy={star[1] * 10} r={star[2]} style={`opacity:${star[3]}`} />
        {/each}
    </g>

    <!-- Four-point glyph adapted from the supplied SMMUN star system. -->
    <g class="brand-glyph glyph-one" transform="translate(82 420) scale(.32)">
        <path
            d="M82 0c6 31 14 50 36 61 14 7 29 10 45 13-13 3-25 6-37 10-25 9-34 33-40 54l-4 18-5-19c-5-21-14-44-39-53-12-5-24-7-38-10 16-3 31-6 45-13C67 50 76 31 82 0Z"
        />
    </g>
    <g class="brand-glyph glyph-two" transform="translate(845 720) scale(.42)">
        <path
            d="M82 0c6 31 14 50 36 61 14 7 29 10 45 13-13 3-25 6-37 10-25 9-34 33-40 54l-4 18-5-19c-5-21-14-44-39-53-12-5-24-7-38-10 16-3 31-6 45-13C67 50 76 31 82 0Z"
        />
    </g>
</svg>
