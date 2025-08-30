---
title: Observable Graph
layout: post
description: A first attempt at Observable Plat
permalink: /observable
---

---
title: Observable Graph
layout: post
description: A first attempt at Observable Plot
permalink: /observable
---

<!-- Observable Plot Example -->
<div id="plot" style="width:600px; height:400px;"></div>
<script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
<script src="https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6"></script>
<script>
  const chart = Plot.plot({
    width: 600,
    height: 400,
    marks: [
      Plot.barY(
        [
          {category: "A", value: 28},
          {category: "B", value: 55},
          {category: "C", value: 43}
        ],
        {x: "category", y: "value"}
      )
    ]
  });
  document.getElementById("plot").appendChild(chart);
</script>

