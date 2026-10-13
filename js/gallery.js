// ==========================================
// RACHIT KREATIONS — GALLERY.JS
// supabaseClient is initialized in js/supabase.js
// ==========================================

const galleryGrid = document.getElementById("galleryGrid");

// Load gallery when page opens
document.addEventListener("DOMContentLoaded", () => {
    loadGallery();
});

// ==========================================
// LOAD DESIGNS FROM SUPABASE
// ==========================================

async function loadGallery() {

    if (!galleryGrid) return;

    galleryGrid.innerHTML = `
        <div style="text-align:center;width:100%;padding:40px;">
            Loading Collection...
        </div>
    `;

    const { data, error } = await supabaseClient
        .from("designs")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {

        console.error(error);

        galleryGrid.innerHTML = `
            <h2 style="text-align:center">
                Unable to load collection.
            </h2>
        `;

        return;
    }

    if (data.length === 0) {

        galleryGrid.innerHTML = `
            <h2 style="text-align:center">
                No Designs Uploaded Yet
            </h2>
        `;

        return;
    }

    galleryGrid.innerHTML = "";

    data.forEach(design => {

        createCard(design);

    });

}

// ==========================================
// CREATE CARD
// ==========================================

function createCard(design) {

    const card = document.createElement("div");

    card.className = "gallery-card hidden";

    card.dataset.category =
        design.category.toLowerCase();

    card.innerHTML = `

        <div class="zoom">

            <img
                src="${design.image_url}"
                alt="${design.title}"
                loading="lazy">

        </div>

        <div class="gallery-info">

            <span class="badge">

                ${design.category}

            </span>

            <h3>

                ${design.title}

            </h3>

            <p>

                ${design.description}

            </p>

            <small>

                Fabric :
                ${design.fabric}

            </small>

        </div>

    `;

    galleryGrid.appendChild(card);

    observeCard(card);

}

// ==========================================
// SCROLL ANIMATION
// ==========================================

function observeCard(card) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    });

    observer.observe(card);

}

// ==========================================
// SEARCH (OPTIONAL)
// ==========================================

function searchDesign(text) {

    const cards =
        document.querySelectorAll(".gallery-card");

    text = text.toLowerCase();

    cards.forEach(card => {

        const value =
            card.innerText.toLowerCase();

        if (value.includes(text)) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}

// ==========================================
// CATEGORY FILTER
// ==========================================

function filterCategory(category) {

    const cards =
        document.querySelectorAll(".gallery-card");

    cards.forEach(card => {

        if (

            category === "all" ||

            card.dataset.category === category

        ) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}

// ==========================================
// FILTER BUTTON EVENTS
// ==========================================

document.querySelectorAll(".gallery-filter button")
.forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".gallery-filter button")
            .forEach(btn => {

                btn.classList.remove("active");

            });

        button.classList.add("active");

        filterCategory(

            button.dataset.filter

        );

    });

});

// ==========================================
// REFRESH AFTER ADMIN UPLOAD
// ==========================================

window.refreshGallery = function () {

    loadGallery();

};