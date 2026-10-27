const categoryButtons = document.querySelectorAll(".category-button");
const propertyCards = document.querySelectorAll(".property-card");
const searchInput = document.getElementById("property-search");
const loadingMessage = document.getElementById("loading-message");
const resultsMessage = document.getElementById("results-message");
const noResults = document.getElementById("no-results");
const cartCountDisplay = document.getElementById("cart-count");

let selectedCategory = "all";
let cartCount = 0;

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

function filterProperties(showLoading = false) {
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (showLoading) {
        loadingMessage.hidden = false;

        window.setTimeout(function () {
            loadingMessage.hidden = true;
            displayMatchingProperties(searchTerm);
        }, 500);
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
            selectedCategory === "all" || category === selectedCategory;

        const matchesSearch =
            name.includes(searchTerm) || location.includes(searchTerm);

        const shouldShow = matchesCategory && matchesSearch;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    resultsMessage.textContent =
        visibleCount + (visibleCount === 1 ? " property found." : " properties found.");

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
            "Contact: sirquadri01@gmail.com\n" +
            "Phone: 08069510815"
        );
    });
});

document.querySelectorAll(".add-to-cart").forEach(function (button) {
    button.addEventListener("click", function () {
        cartCount++;
        cartCountDisplay.textContent = cartCount;

        alert(button.dataset.name + " has been added to your cart.");
    });
});

filterProperties(false);
// Connect the property inquiry form to EmailJS
emailjs.init({
    publicKey: "d8D1B-q220_SF5s_l"
});

const inquiryForm = document.getElementById("property-inquiry-form");

if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const status = document.getElementById("inquiry-status");
        const submitButton = inquiryForm.querySelector('button[type="submit"]');

        status.textContent = "Sending your inquiry...";
        submitButton.disabled = true;

        emailjs.sendForm(
            "service_anrzbc8",
            "template_lr46qkc",
            inquiryForm
        )
        .then(function () {
            status.textContent = "Your inquiry has been sent successfully!";
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
