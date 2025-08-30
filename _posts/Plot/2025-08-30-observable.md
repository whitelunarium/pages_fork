---
title: Observable Plat
layout: post
description: A first attempt at Observable Plot
permalink: /observable
---

## Mini charting framework

Observable Plot [link](https://observablehq.com/plot/)

* It feels “native” and "responsive" on GH Pages.
* Charts stretch automatically across the container is by design
* Defaults to width: container.clientWidth and a fixed height (~480px unless overridden as the 300 below)
* It listens to CSS so the site’s content area is responsive, the chart will resize left-to-right automatically.
* Integrates tightly with HTML/DOM/Observable notebooks, so it’s natural for blogs, dashboards, reports, or teaching examples

<!-- Observable Plot Example -->
<div id="bar"></div>
<div id="line"></div>
<div id="dot"></div>
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6"></script>
<script>
  function renderPlot(containerId, dataList, mark="barY") {
    const chart = Plot.plot({
      height: 300,   // consistent height
      marginLeft: 40,
      marginBottom: 30,
      marks: [
        Plot[mark](dataList, { x: "category", y: "value" }),
        Plot.dot(dataList, { x: "category", y: "value", stroke: "red" })
      ]
    });
    const container = document.querySelector(containerId);
    container.innerHTML = "";
    container.appendChild(chart);
  }
  // Example call (could populate this data from backend API)
  const sampleData = [
    { category: "A", value: 32 },
    { category: "B", value: 55 },
    { category: "C", value: 49 },
    { category: "D", value: 38 },
    { category: "F", value: 50 },
    { category: "G", value: 58 },
  ];
  renderPlot("#bar", sampleData, "barY");
  renderPlot("#line", sampleData, "lineY");
  renderPlot("#dot", sampleData, "dot");

</script>
