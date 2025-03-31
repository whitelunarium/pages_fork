---
layout: bootstrap 
title: Bootstrap Table
description: An example of bootstrap body content specific to a page using table 
author: John Mortensen
permalink: /bootstrap/table
hide: true
---
    
<!-- Start of body content specific to a table using bootstrap -->
<div class="row mx-3 mb-4 rounded-3 align-items-md-stretch">
    <table class="table " id="cars">
        <thead>
            <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <!-- Rows will be dynamically added here -->
        </tbody>
    </table>
    <script>
        // Inline JavaScript Object for Cars
        const cars = [
            { make: "Ford", model: "Mustang", year: 2022, color: "Red", price: "$35,000" },
            { make: "Toyota", model: "Camry", year: 2022, color: "Silver", price: "$25,000" },
            { make: "Tesla", model: "Model S", year: 2022, color: "White", price: "$80,000" },
            { make: "Cadillac", model: "Broughan", year: 1969, color: "Black", price: "$10,000" },
            { make: "Ford", model: "F-350", year: 1997, color: "Green", price: "$15,000" },
            { make: "Ford", model: "Excursion", year: 2003, color: "Green", price: "$25,000" },
            { make: "Ford", model: "Ranger", year: 2012, color: "Red", price: "$8,000" },
            { make: "Kuboto", model: "L3301 Tractor", year: 2015, color: "Orange", price: "$12,000" },
            { make: "Ford", model: "Fusion Energi", year: 2015, color: "Green", price: "$15,000" },
            { make: "Acura", model: "XL", year: 2006, color: "Grey", price: "$10,000" },
            { make: "Ford", model: "F150 Lightning", year: 2023, color: "Grey", price: "$70,000" }
        ];

        // Populate the table dynamically
        const tbody = document.querySelector("#cars tbody");
        cars.forEach(car => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>${car.year}</td>
                <td>${car.color}</td>
                <td>${car.price}</td>
            `;
            tbody.appendChild(row);
        });

        // Initialize DataTable add text-primary to a-tags for visability
        $(document).ready(function () {
            $('#cars').DataTable({
                drawCallback: function () {
                    // Add Bootstrap's text-primary class to the inner HTML of <a> tags inside pagination buttons
                    $('.dataTables_paginate .paginate_button a').each(function () {
                        const link = $(this);
                        const innerHTML = link.html();
                        link.html(`<span class="text-primary">${innerHTML}</span>`);
                    });
                }
            });
        });
    </script>
</div>
