---
layout: tailwind 
title: Tailwind Grid 
description: An example of body content specific to a page using grid
permalink: /tailwind/grid
hide: true
---

<!-- 
  Tailwind Grid Example

  This file demonstrates the use of Tailwind CSS to create a responsive grid layout.
  The grid is defined with custom column and row sizes using `grid-cols-*` and `grid-rows-*`.
  It also includes dark mode support with `dark:*` classes for styling.

  Key Features:
  - A centered content block with a message and custom checkmarks.
  - Dynamic light and dark mode styling for text and background.
  - Decorative borders and background patterns using Tailwind's advanced utilities.

  Reference for Grid:
    grid-cols-[1fr_2.5rem_auto_2.5rem_1fr]
    - 1fr: The first column takes up 1 fraction of the available space.
    - 2.5rem: The second column has a fixed width of 2.5rem (40px).
    - auto: The third column adjusts its width based on its content.
    - 2.5rem: The fourth column also has a fixed width of 2.5rem (40px).
    - 1fr: The fifth column takes up 1 fraction of the available space.

    grid-rows-[1fr_1px_auto_1px_1fr]
    - 1fr: The first row takes up 1 fraction of the available space.
    - 1px: The second row has a fixed height of 1px (likely used for a border or separator).
    - auto: The third row adjusts its height based on its content.
    - 1px: The fourth row has a fixed height of 1px (likely used for another border or separator).
    - 1fr: The fifth row takes up 1 fraction of the available space.

    col-start-3 row-start-3
    - Positions the content in the third column and third row of the grid.

  Note:
  - Use this as reference to build a grid structure, content, or styles to suit your needs.
-->
<div class="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
  <div class="col-start-3 row-start-3 flex max-w-lg flex-col p-2">
    <div class="border border-gray-800 dark:border-gray-100 rounded-lg">
      <div class="rounded-xl p-10 text-sm/7 text-gray-700 bg-gray-100 dark:bg-gray-950">
        <img class="size-12 shrink-0" src="{{site.baseurl}}/images/logo.png" alt="ChitChat Logo" />
        <div class="text-xl font-medium text-bg-gray-950 dark:text-gray-700">ChitChat</div>
        <p class="text-gray-500 dark:text-gray-400">You have a new message from Tailwind!</p>
        <ul class="space-y-3">
        <li class="flex">
            <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
            <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
            <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
            <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">
            Customizing your theme with
            <code class="font-mono font-medium text-gray-100">@theme</code>
            </p>
        </li>
        <li class="flex">
            <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
            <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
            <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
            <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">
            Adding custom utilities with
            <code class="font-mono font-medium text-gray-100">@utility</code>
            </p>
        </li>
        <li class="flex">
            <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
            <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
            <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
            <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">
            Adding custom variants with
            <code class="font-mono font-medium text-gray-100">@variant</code>
            </p>
        </li>
        <li class="flex">
            <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
            <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
            <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
            <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
            </svg>
            <p class="ml-3">Code completion with instant preview</p>
        </li>
        </ul>
        <hr class="my-4 w-full border-(--pattern-fg)" />
        <p class="font-semibold">
            <a href="https://tailwindcss.com/docs" class="text-gray-950 dark:text-gray-100 underline underline-offset-3 hover:decoration-2">Read the docs &rarr;</a>
        </p>
      </div>
    </div>
  </div>
</div>
