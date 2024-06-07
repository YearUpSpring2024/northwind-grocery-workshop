"use strict";



const detailsOutput = document.getElementById("detailsOutput");

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productid");

    // Check if a product ID is found in the URL
    if (productId !== null) {
        fetchProductDetails(productId);
    } else {
        displayErrorMessage("Product ID not found in URL.");
    }
}

// Function to fetch product details from the API
function fetchProductDetails(productId) {
    // Make a GET request to the API endpoint for the specified product ID
    fetch(`http://localhost:8081/api/products/${productId}`)
        .then(response => {
            // Check if the response is successful (status code 200)
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch product details.");
            }
        })
        .then(product => {
            // Display the product details on the page
            displayProductDetails(product);
        })
        .catch(error => {
            displayErrorMessage(error.message);
        });
}

// Function to display product details on the page
function displayProductDetails(product) {
    detailsOutput.innerHTML = "";
    // Loop through each property of the product object
    for (let key in product) {
        const detailParagraph = document.createElement("p");
        detailParagraph.textContent = `${key}: ${product[key]}`;
        detailsOutput.appendChild(detailParagraph);
    }
}

// Function to display an error message on the page
function displayErrorMessage(message) {
    detailsOutput.innerHTML = "";
    const errorParagraph = document.createElement("p");
    errorParagraph.textContent = `Error: ${message}`;
    detailsOutput.appendChild(errorParagraph);
}
