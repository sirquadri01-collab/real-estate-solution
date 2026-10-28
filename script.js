// ========================================
// REAL ESTATE SOLUTION
// Website functionality and shopping cart
// ========================================

// CATEGORY FILTERS AND PROPERTY SEARCH

const categoryButtons = document.querySelectorAll(".category-button");
const propertyCards = document.querySelectorAll(".property-card");
const searchInput = document.getElementById("property-search");
const loadingMessage = document.getElementById("loading-message");
const resultsMessage = document.getElementById("results-message");
const noResults = document.getElementById("no-results");

// SHOPPING CART ELEMENTS

const cartCountDisplay = document.getElementById("cart-count");
const viewCartButton = document.getElementById("view-cart-button");
const closeCartButton = document.getElementById("close-cart-button");
const cartPanel = document.getElementById("cart-panel");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart-button");

let selectedCategory = "all";
let cart = [];

// Restore the cart after a page refresh when possible.

try {
const savedCart = localStorage.getItem("realEstateSolutionCart");

if (savedCart) {
    const parsedCart = JSON.parse(savedCart);

    if (Array.isArray(parsedCart)) {
        cart = parsedCart.filter(function (item) {
            return (
                typeof item.name === "string" &&
                Number.isFinite(item.price) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0
            );
        });
    }
}

} catch (error) {
console.warn("The saved cart could not be restored.", error);
}

// PROPERTY DETAILS

const propertyDetails = {
"Royal Luxury Mansion": {
bedrooms: "7",
bathrooms: "8",
type: "Luxury mansion",
description: "A spacious luxury home with elegant architecture and generous living areas. Contact us to ask about viewing arrangements and availability."
},

"Modern Family Duplex": {
    bedrooms: "5",
    bathrooms: "6",
    type: "Family duplex",
    description: "A contemporary family home with spacious rooms and stylish finishes. Contact us for more information about this sample listing."
},

"Executive City Apartment": {
    bedrooms: "3",
    bathrooms: "3",
    type: "Apartment for rent",
    description: "A stylish apartment suited to comfortable city living. Contact us to enquire about rental terms and availability."
},

"Peaceful Garden Bungalow": {
    bedrooms: "3",
    bathrooms: "3",
    type: "Detached bungalow",
    description: "A comfortable single-storey home with a welcoming outdoor space. Contact us to learn more about this sample listing."
},

"Premium Residential Plot": {
    bedrooms: "N/A",
    bathrooms: "N/A",
    type: "Residential land",
    description: "A sample land listing for visitors exploring residential development opportunities. Confirm land documentation, ownership, and location before any transaction."
},

"Prime Commercial Building": {
    bedrooms: "N/A",
    bathrooms: "N/A",
    type: "Commercial property",
    description: "A sample commercial listing for business and investment enquiries. Contact us to discuss your requirements."
}

};

// FORMAT NAIRA PRICES

function formatNaira(amount) {
return "₦" + amount.toLocaleString("en-NG");
}

// SAVE CART

function saveCart() {
try {
localStorage.setItem(
"realEstateSolutionCart",
JSON.stringify(cart)
);
} catch (error) {
console.warn("The cart could not be saved.", error);
}
}

// UPDATE CART COUNT AND CONTENTS

function updateCart() {
const totalItems = cart.reduce(function (total, item) {
return total + item.quantity;
}, 0);

cartCountDisplay.textContent = totalItems;

renderCart();
saveCart();

}

// DISPLAY THE SHOPPING CART

function renderCart() {
cartItemsContainer.replaceChildren();

if (cart.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.textContent = "Your cart is empty.";

    cartItemsContainer.appendChild(emptyMessage);
    cartTotalDisplay.textContent = "₦0";

    return;
}

let totalPrice = 0;

cart.forEach(function (item) {
    totalPrice += item.price * item.quantity;

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";

    const detailsElement = document.createElement("div");
    detailsElement.className = "cart-item-details";

    const nameElement = document.createElement("h3");
    nameElement.textContent = item.name;

    const priceElement = document.createElement("p");

    if (item.priceLabel) {
        priceElement.textContent = item.priceLabel;
    } else {
        priceElement.textContent = formatNaira(item.price);
    }

    const quantityElement = document.createElement("p");
    quantityElement.textContent =
        "Quantity: " + item.quantity;

    const subtotalElement = document.createElement("p");
    subtotalElement.className = "cart-item-subtotal";
    subtotalElement.textContent =
        "Subtotal: " + formatNaira(item.price * item.quantity);

    detailsElement.appendChild(nameElement);
    detailsElement.appendChild(priceElement);
    detailsElement.appendChild(quantityElement);
    detailsElement.appendChild(subtotalElement);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-cart-item";
    removeButton.textContent = "Remove";
    removeButton.setAttribute(
        "aria-label",
        "Remove " + item.name + " from cart"
    );

    removeButton.addEventListener("click", function () {
        removeFromCart(item.name);
    });

    itemElement.appendChild(detailsElement);
    itemElement.appendChild(removeButton);

    cartItemsContainer.appendChild(itemElement);
});

cartTotalDisplay.textContent = formatNaira(totalPrice);

}

// ADD PROPERTY TO CART

document.querySelectorAll(".add-to-cart").forEach(function (button) {
button.addEventListener("click", function () {
const name = button.dataset.name;
const price = Number(button.dataset.price);
const priceLabel = button.dataset.priceLabel || "";

    if (!name || !Number.isFinite(price) || price < 0) {
        alert("Sorry, this property could not be added to your cart.");
        return;
    }

    const existingItem = cart.find(function (item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            priceLabel: priceLabel,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " has been added to your cart.");
});

});

// OPEN CART

viewCartButton.addEventListener("click", function () {
cartPanel.hidden = false;

cartPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
});

});

// CLOSE CART

closeCartButton.addEventListener("click", function () {
cartPanel.hidden = true;
});

// REMOVE A PROPERTY FROM CART

function removeFromCart(propertyName) {
cart = cart.filter(function (item) {
return item.name !== propertyName;
});

updateCart();

}

// CLEAR THE ENTIRE CART

clearCartButton.addEventListener("click", function () {
if (cart.length === 0) {
alert("Your cart is already empty.");
return;
}

const confirmed = window.confirm(
    "Are you sure you want to remove all properties from your cart?"
);

if (confirmed) {
    cart = [];
    updateCart();
}

});

// CATEGORY FILTERING AND PROPERTY SEARCH

function filterProperties(showLoading = false) {
const searchTerm = searchInput.value.trim().toLowerCase();

if (showLoading) {
    loadingMessage.hidden = false;

    window.setTimeout(function () {
        loadingMessage.hidden = true;
        displayMatchingProperties(searchTerm);
    }, 300);
} else {
    displayMatchingProperties(searchTerm);
}

}

function displayMatchingProperties(searchTerm) {
let visibleCount = 0;

propertyCards.forEach(function (card) {
    const category = card.dataset.category;
    const name = card.dataset.name.toLowerCase();
    const location = card.dataset.location.toLowerCase();

    const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

    const matchesSearch =
        name.includes(searchTerm) ||
        location.includes(searchTerm);

    const shouldShow = matchesCategory && matchesSearch;

    card.hidden = !shouldShow;

    if (shouldShow) {
        visibleCount++;
    }
});

resultsMessage.textContent =
    visibleCount +
    (visibleCount === 1
        ? " property found."
        : " properties found.");

noResults.hidden = visibleCount !== 0;

}

categoryButtons.forEach(function (button) {
button.addEventListener("click", function () {
selectedCategory = button.dataset.category;

    categoryButtons.forEach(function (categoryButton) {
        categoryButton.classList.remove("active");
    });

    button.classList.add("active");

    filterProperties(true);
});

});

searchInput.addEventListener("input", function () {
filterProperties(false);
});

// VIEW PROPERTY DETAILS

document.querySelectorAll(".view-details").forEach(function (button) {
button.addEventListener("click", function () {
const propertyName = button.dataset.property;
const details = propertyDetails[propertyName];
const card = button.closest(".property-card");

    const price = card.querySelector(".price").textContent;
    const location = card.querySelector(".location").textContent;

    if (!details) {
        alert("Property details are not available.");
        return;
    }

    alert(
        propertyName + "\n\n" +
        "Property type: " + details.type + "\n" +
        "Location: " + location + "\n" +
        "Price: " + price + "\n" +
        "Bedrooms: " + details.bedrooms + "\n" +
        "Bathrooms: " + details.bathrooms + "\n\n" +
        details.description + "\n\n" +
        "Email: sirquadri01@gmail.com\n" +
        "Phone: 08069510815"
    );
});

});

// INITIALIZE THE WEBSITE

filterProperties(false);
updateCart();

// ========================================
// EMAILJS PROPERTY INQUIRY FORM
// IMPORTANT: RESTORE YOUR EXISTING VALUES
// ========================================

// Replace the three "HIDDEN" placeholders below with the
// corresponding values from your previously working setup.

emailjs.init({
publicKey: "d8D1B-q220_SF5s_l"
});

const inquiryForm = document.getElementById("property-inquiry-form");

if (inquiryForm) {
inquiryForm.addEventListener("submit", function (event) {
event.preventDefault();

    const status = document.getElementById("inquiry-status");

    const submitButton = inquiryForm.querySelector(
        'button[type="submit"]'
    );

    status.textContent = "Sending your inquiry...";
    submitButton.disabled = true;

    emailjs.sendForm(
        "service_anrzbc8",
        "template_lr46qkc",
        inquiryForm
    )
    .then(function () {
        status.textContent =
            "Your inquiry has been sent successfully!";

        inquiryForm.reset();
    })
    .catch(function (error) {
        console.error("EmailJS error:", error);

        status.textContent =
            "Unable to send your inquiry. Please try again or email us directly.";
    })
    .finally(function () {
        submitButton.disabled = false;
    });
});

    }
