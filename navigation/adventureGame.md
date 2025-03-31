---
layout: base
title: Adventure Game
permalink: /gamify/adventureGame
---

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <canvas id='gameCanvas'></canvas>
</div>

<script type="module">
    import Game from '{{site.baseurl}}/assets/js/adventureGame/Game.js';
    import * as config from '{{site.baseurl}}/assets/js/api/config.js';

    const environment = {
        path: "{{site.baseurl}}",
        pythonURI: config.pythonURI,
        javaURI: config.javaURI,
        fetchOptions: config.fetchOptions,
        gameContainer: document.getElementById("gameContainer"),
        gameCanvas: document.getElementById("gameCanvas")
    };
    console.log(config.javaURI);
    Game.main(environment);

</script>
