// ==========================================
// PAGE LOADER
// ==========================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});

// ==========================================
// SCROLL REVEAL
// ==========================================

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: .15

});

hiddenElements.forEach(el => observer.observe(el));

// ==========================================
// ACTIVE NAVBAR
// ==========================================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 400) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

// ==========================================
// NAVBAR BACKGROUND
// ==========================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 80) {

        navbar.style.background = "rgba(255,255,255,.95)";

        navbar.style.backdropFilter = "blur(20px)";

    }

    else {

        navbar.style.background = "rgba(255,255,255,.25)";

    }

});

// ==========================================
// GALLERY FILTER
// ==========================================

const filterButtons = document.querySelectorAll(".gallery-filter button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>

            btn.classList.remove("active")

        );

        button.classList.add("active");

        const filter = button.dataset.filter;

        const cards = document.querySelectorAll(".gallery-card");

        cards.forEach(card => {

            if (

                filter === "all" ||

                card.dataset.category === filter

            ) {

                card.style.display = "block";

            }

            else {

                card.style.display = "none";

            }

        });

    });

});

// ==========================================
// IMAGE LIGHTBOX
// ==========================================

document.addEventListener("click", function (e) {

    const img = e.target.closest(".gallery-card img");

    if (!img) return;

    const overlay = document.createElement("div");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,.85)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
    overlay.style.cursor = "pointer";

    const image = document.createElement("img");

    image.src = img.src;
    image.style.maxWidth = "90%";
    image.style.maxHeight = "90%";
    image.style.borderRadius = "20px";

    overlay.appendChild(image);

    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => {

        overlay.remove();

    });

});

// ==========================================
// FLOATING BUTTON TOOLTIPS
// ==========================================

document.querySelectorAll(".call,.whatsapp").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform = "scale(1.15)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "scale(1)";

    });

});

// ==========================================
// SIMPLE PARALLAX
// ==========================================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    hero.style.backgroundPositionY =

        window.scrollY * 0.35 + "px";

});

// ==========================================
// YEAR (OPTIONAL)
// ==========================================

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}