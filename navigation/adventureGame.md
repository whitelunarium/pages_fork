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
    // import GameControl from '{{site.baseurl}}/assets/js/adventureGame/GameControl.js';
    import Game from '{{site.baseurl}}/assets/js/adventureGame/Game.js';
    import Stats from '{{site.baseurl}}/assets/js/adventureGame/Stats.js';
    import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

    const path = "{{site.baseurl}}";
    Game.main(path, pythonURI, javaURI, fetchOptions);
    // new GameControl(path).start();
    new Stats().fetchStats();
</script>
