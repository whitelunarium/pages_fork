---
layout: opencs
title: Cookie Clicker Game
permalink: /cookie-clicker-game/
---


<div class="grid grid-cols-4 gap-4 aspect-square">
<!-- Shop -->
<div class="col-span-1 bg-white p-4 shadow-lg flex flex-col" id="shop-container">
    <div class="text-xl font-bold mb-4 text-center">SHOP</div>
</div>
<!-- Game -->
<div class="col-span-3 flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-orange-200 rounded-2xl shadow-xl p-8">
    <!-- Title -->
    <div class="text-4xl font-extrabold mb-6 text-white-800 drop-shadow-md tracking-wide">
        🍪 Cookie Clicker
    </div>
    <!-- Cookie Button -->
    <div id="cookie" 
        class="w-48 h-48 bg-cover bg-center rounded-full cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 ease-out flex items-center justify-center bg-white">
        <img src="/hacks/cookie-clicker/assets/baseCookie.png" class="w-full h-full rounded-full select-none pointer-events-none" />
    </div>
    <!-- Counter -->
    <div id="counter" class="mt-6 text-2xl font-semibold text-brown-900 bg-white/80 px-6 py-3 rounded-lg shadow-md">
        Cookies: <span id="cookie-count" class="font-bold text-orange-600">0</span>
    </div>
</div>

<script src="https://cdn.tailwindcss.com"></script>
<script src="{{site.baseurl}}/hacks/cookie-clicker/cookie-clicker-game.js"></script>