---
layout: base
title: Cookie Clicker Game
permalink: /cookie-clicker-game
---

<html>
<div class="grid grid-cols-4 gap-4 aspect-square">
<!-- Shop -->
<div class="col-span-1 bg-white p-4 shadow-lg flex flex-col" id="shop-container">
    <div class="text-xl font-bold mb-4 text-center">SHOP</div>
    <button id="autoClickerBtn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-2">
    Grandma (Cost: 69)
    </button>
</div>

<!-- Game -->
<div class="col-span-3 flex flex-col items-center justify-center bg-gray-100">
    <h1 class="text-3xl font-bold mb-6">Cookie Clicker</h1>
    <div id="cookie" class="w-48 h-48 bg-cover bg-center rounded-full cursor-pointer active:scale-90 transition">
        <img src="/hacks/cookie-clicker/assets/baseCookie.png" />
    </div>
    <div id="counter" class="text-2xl mt-4 font-semibold">Cookies: 0</div>
</div>
</div>

<script src="https://cdn.tailwindcss.com"></script>
<script src="hacks/cookie-clicker/cookie-clicker-game.js">
</html>
