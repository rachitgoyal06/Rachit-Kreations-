// ============================================
// RACHIT KREATIONS — app.js (Static Version)
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

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        hamburger.classList.toggle("open");
        navLinks.classList.toggle("open");
        document.body.style.overflow =
            navLinks.classList.contains("open") ? "hidden" : "";
    });

    // Close when a link is clicked
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMobileMenu();
    });
}

function closeMobileMenu() {
    if (!hamburger || !navLinks) return;
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
}

// ============================================
// SCROLL REVEAL
// ============================================
const hiddenEls = document.querySelectorAll(".hidden");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

hiddenEls.forEach(el => revealObserver.observe(el));

// ============================================
// ACTIVE NAV LINK
// ============================================
const sections   = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navAnchors.forEach(a => {
                a.classList.toggle("active", a.getAttribute("href") === "#" + id);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ============================================
// HEADER SCROLL STYLE
// ============================================
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 50);
}, { passive: true });

// ============================================
// BACK TO TOP
// ============================================
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    if (!topBtn) return;
    topBtn.style.display = window.scrollY > 400 ? "flex" : "none";
}, { passive: true });

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
    const steps = Math.ceil(duration / 16);
    const inc = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += inc;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll(".stat-number").forEach(el => counterObserver.observe(el));

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
    });
});

// ============================================
// FOOTER YEAR
// ============================================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();