// ============================================
// RACHIT KREATIONS — app.js
// ============================================

// ============================================
// PAGE LOADER
// ============================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 600);
    }
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        navLinks.classList.toggle("open");
        document.body.style.overflow =
            navLinks.classList.contains("open") ? "hidden" : "";
    });

    // Close on link click
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            navLinks.classList.remove("open");
            document.body.style.overflow = "";
        });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove("open");
            navLinks.classList.remove("open");
            document.body.style.overflow = "";
        }
    });
}

// ============================================
// SCROLL REVEAL
// ============================================
const hiddenEls = document.querySelectorAll(".hidden");
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.12 });

hiddenEls.forEach(el => revealObserver.observe(el));

// ============================================
// ACTIVE NAVBAR HIGHLIGHT
// ============================================
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 140) {
            current = section.getAttribute("id");
        }
    });
    navAnchors.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === "#" + current) {
            a.classList.add("active");
        }
    });
});

// ============================================
// HEADER SCROLL STYLE
// ============================================
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 60);
});

// ============================================
// BACK TO TOP
// ============================================
const topBtn = document.getElementById("topBtn");
window.addEventListener("scroll", () => {
    if (!topBtn) return;
    topBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});
if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-number").forEach(el => counterObserver.observe(el));

// ============================================
// GALLERY FILTER
// ============================================
const filterButtons = document.querySelectorAll(".gallery-filter button");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        const filter = button.dataset.filter;
        document.querySelectorAll(".gallery-card").forEach(card => {
            const match = filter === "all" || card.dataset.category === filter;
            card.style.display = match ? "block" : "none";
        });
    });
});

// ============================================
// IMAGE LIGHTBOX
// ============================================
document.addEventListener("click", function (e) {
    const img = e.target.closest(".gallery-card .zoom img");
    if (!img) return;

    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.alt;

    overlay.appendChild(image);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    overlay.addEventListener("click", () => {
        overlay.remove();
        document.body.style.overflow = "";
    });

    // Keyboard close
    const keyClose = (e) => {
        if (e.key === "Escape") { overlay.remove(); document.body.style.overflow = ""; }
        document.removeEventListener("keydown", keyClose);
    };
    document.addEventListener("keydown", keyClose);
});

// ============================================
// PARALLAX HERO
// ============================================
const hero = document.querySelector(".hero");
window.addEventListener("scroll", () => {
    if (!hero) return;
    hero.style.backgroundPositionY = window.scrollY * 0.3 + "px";
});

// ============================================
// SMOOTH SCROLL (native fallback)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
});

// ============================================
// FOOTER YEAR
// ============================================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();