// PROPERTY CATEGORY FILTERS

const categoryButtons = document.querySelectorAll(".category-button");
const propertyCards = document.querySelectorAll(".property-card");
const noResults = document.getElementById("no-results");

categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.category;
        let visibleCount = 0;

        // Update the active category button
        categoryButtons.forEach(function (categoryButton) {
            categoryButton.classList.remove("active");
        });

        button.classList.add("active");

        // Show properties that match the selected category
        propertyCards.forEach(function (card) {
            const propertyCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                propertyCategory === selectedCategory
            ) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        // Display a message if no properties match
        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }
    });
});


// SHOPPING CART

let cartCount = 0;
const cartItems = [];

const cartCountDisplay = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const propertyName = button.dataset.name;
        const propertyPrice = Number(button.dataset.price);

        cartItems.push({
            name: propertyName,
            price: propertyPrice
        });

        cartCount++;

        if (cartCountDisplay) {
            cartCountDisplay.textContent = cartCount;
        }

        alert(propertyName + " has been added to your cart!");
    });
});
