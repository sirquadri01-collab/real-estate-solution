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
        cartCountDisplay.textContent = cartCount;

        alert(propertyName + " has been added to your cart!");
    });
});
