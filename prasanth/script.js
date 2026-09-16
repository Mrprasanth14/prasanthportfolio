/* =========================================================
   HEMA PRASANTH — PREMIUM DEVELOPER PORTFOLIO
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    const progressBar = document.querySelector(".scroll-progress");

    const revealElements = document.querySelectorAll(".reveal");

    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    const modal = document.querySelector(".modal");
    const modalClose = document.querySelector(".modal-close");

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("menu-active");
            document.body.classList.toggle("menu-open");

            const isOpen =
                navbar.classList.contains("menu-active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.textContent =
                isOpen ? "×" : "☰";
        });

    }

    /* Close mobile menu after clicking a link */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            if (!navbar) return;

            navbar.classList.remove("menu-active");
            document.body.classList.remove("menu-open");

            if (menuToggle) {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });

    /* =====================================================
       NAVBAR SCROLL
       ===================================================== */

    const handleScroll = () => {

        const scrollTop = window.scrollY;

        if (navbar) {

            if (scrollTop > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        }

        /* Scroll progress */

        if (progressBar) {

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;

            progressBar.style.width =
                `${progress}%`;
        }

    };

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();

    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                currentSection &&
                target === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();

    /* =====================================================
       REVEAL ANIMATION
       ===================================================== */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

    /* =====================================================
       CUSTOM CURSOR
       ===================================================== */

    const supportsHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    if (
        supportsHover &&
        cursorDot &&
        cursorRing
    ) {

        document.body.classList.add(
            "cursor-ready"
        );

        let mouseX = 0;
        let mouseY = 0;

        let ringX = 0;
        let ringY = 0;

        window.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            },
            { passive: true }
        );

        const animateCursor = () => {

            ringX +=
                (mouseX - ringX) * 0.15;

            ringY +=
                (mouseY - ringY) * 0.15;

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;

            requestAnimationFrame(
                animateCursor
            );
        };

        animateCursor();

        const hoverElements =
            document.querySelectorAll(
                "a, button, .project-card, .skill-card, .service-card"
            );

        hoverElements.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {
                    document.body.classList.add(
                        "cursor-hover"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    document.body.classList.remove(
                        "cursor-hover"
                    );
                }
            );

        });

    }

    /* =====================================================
       PROJECT IMAGE FALLBACK
       ===================================================== */

    document.querySelectorAll(
        ".project-image img"
    ).forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display = "none";

                const parent =
                    image.parentElement;

                if (parent) {
                    parent.classList.add(
                        "image-missing"
                    );
                }

            }
        );

    });

    /* =====================================================
       MAGNETIC BUTTON EFFECT
       ===================================================== */

    if (supportsHover) {

        const magneticButtons =
            document.querySelectorAll(
                ".btn, .nav-cta"
            );

        magneticButtons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * 0.08}px, ${y * 0.08}px)`;

                }
            );

            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

    }

    /* =====================================================
       PROJECT DATA
       ===================================================== */

    const projectData = {

        ramssethuyatra: {

            title: "RamSethuYatra",

            description:
                "A tourism and booking platform built for Rameswaram travel services. The platform organizes tour packages, rooms, cab services, temple visits, 22 Holy Wells and pooja services.",

            stack:
                "HTML • CSS • JavaScript • Firebase • Firestore",

            status:
                "Live project",

            link:
                "https://ram-sethu-yathra.vercel.app/index.html"

        },

        theboys: {

            title: "THEBOYZ",

            description:
                "A fashion e-commerce platform designed around a premium shopping experience with product management, authentication, cart, checkout, orders and an admin workflow.",

            stack:
                "HTML • CSS • JavaScript • Node.js • MySQL • Cloudinary",

            status:
                "Full-stack project",

            link:
                "#"

        },

        friday: {

            title: "FRIDAY",

            description:
                "A personal AI assistant project combining voice interaction, AI conversations, text-to-speech and an Android interface with a Python FastAPI backend.",

            stack:
                "Python • FastAPI • Android • Kotlin • Jetpack Compose",

            status:
                "AI project",

            link:
                "#"

        }

    };

    /* =====================================================
       PROJECT MODAL
       ===================================================== */

    const projectButtons =
        document.querySelectorAll(
            "[data-project]"
        );

    const projectModal =
        document.querySelector(
            "#projectModal"
        );

    const projectModalTitle =
        document.querySelector(
            "#projectModalTitle"
        );

    const projectModalDescription =
        document.querySelector(
            "#projectModalDescription"
        );

    const projectModalStack =
        document.querySelector(
            "#projectModalStack"
        );

    const projectModalStatus =
        document.querySelector(
            "#projectModalStatus"
        );

    const projectModalLink =
        document.querySelector(
            "#projectModalLink"
        );

    const closeProjectModal = () => {

        if (!projectModal) return;

        projectModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "menu-open"
        );

    };

    projectButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const projectName =
                    button.dataset.project;

                const project =
                    projectData[projectName];

                if (!project) return;

                if (projectModalTitle) {
                    projectModalTitle.textContent =
                        project.title;
                }

                if (projectModalDescription) {
                    projectModalDescription.textContent =
                        project.description;
                }

                if (projectModalStack) {
                    projectModalStack.textContent =
                        project.stack;
                }

                if (projectModalStatus) {
                    projectModalStatus.textContent =
                        project.status;
                }

                if (projectModalLink) {
                    projectModalLink.href =
                        project.link;
                }

                if (projectModal) {

                    projectModal.classList.add(
                        "active"
                    );

                    document.body.classList.add(
                        "menu-open"
                    );

                }

            }
        );

    });

    document
        .querySelectorAll(
            "[data-close-project]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                closeProjectModal
            );

        });

    if (projectModal) {

        projectModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    projectModal
                ) {
                    closeProjectModal();
                }

            }
        );

    }

    /* =====================================================
       ASK FRIDAY
       ===================================================== */

    const fridayModal =
        document.querySelector(
            "#fridayModal"
        );

    const fridayInput =
        document.querySelector(
            "#fridayInput"
        );

    const fridayResponse =
        document.querySelector(
            "#fridayResponse"
        );

    const fridayButton =
        document.querySelector(
            "#fridayAskButton"
        );

    const fridayQuestions = {

        hello:
            "Hello. I'm Friday — Hema's AI assistant project. This portfolio currently contains a front-end demo of this interaction.",

        skills:
            "Hema works with web development, JavaScript, Node.js, MySQL, Firebase, Python, FastAPI and AI integrations.",

        projects:
            "The featured projects are RamSethuYatra, THEBOYZ and FRIDAY.",

        contact:
            "You can contact Hema using the contact section of this portfolio.",

        default:
            "I'm currently a portfolio demo. Connect the real FRIDAY API here when the backend is ready."

    };

    const getFridayResponse = question => {

        const text =
            question
                .toLowerCase()
                .trim();

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {
            return fridayQuestions.hello;
        }

        if (
            text.includes("skill") ||
            text.includes("technology") ||
            text.includes("tech")
        ) {
            return fridayQuestions.skills;
        }

        if (
            text.includes("project") ||
            text.includes("work")
        ) {
            return fridayQuestions.projects;
        }

        if (
            text.includes("contact") ||
            text.includes("email")
        ) {
            return fridayQuestions.contact;
        }

        return fridayQuestions.default;

    };

    if (fridayButton) {

        fridayButton.addEventListener(
            "click",
            () => {

                if (!fridayInput || !fridayResponse) {
                    return;
                }

                const question =
                    fridayInput.value;

                if (!question.trim()) {

                    fridayResponse.textContent =
                        "Type something first.";

                    return;
                }

                fridayResponse.textContent =
                    "FRIDAY is thinking...";

                setTimeout(() => {

                    fridayResponse.textContent =
                        getFridayResponse(
                            question
                        );

                }, 600);

            }
        );

    }

    /* =====================================================
       GENERAL MODAL CLOSE
       ===================================================== */

    if (modalClose && modal) {

        modalClose.addEventListener(
            "click",
            () => {

                modal.classList.remove(
                    "active"
                );

            }
        );

    }

    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            document
                .querySelectorAll(
                    ".modal.active"
                )
                .forEach(activeModal => {

                    activeModal.classList.remove(
                        "active"
                    );

                });

            if (navbar) {
                navbar.classList.remove(
                    "menu-active"
                );
            }

            document.body.classList.remove(
                "menu-open"
            );

        }
    );

    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const href =
                        anchor.getAttribute(
                            "href"
                        );

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            href
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior:
                            window.matchMedia(
                                "(prefers-reduced-motion: reduce)"
                            ).matches
                                ? "auto"
                                : "smooth"
                    });

                }
            );

        });

    /* =====================================================
       YEAR
       ===================================================== */

    document
        .querySelectorAll(
            "[data-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });

    /* =====================================================
       CONSOLE BRANDING
       ===================================================== */

    console.log(
        "%cHEMA PRASANTH",
        "font-size:24px;font-weight:bold;color:#d6b36a;"
    );

    console.log(
        "%cSoftware Developer • Web Developer • AI Builder",
        "font-size:13px;color:#aaa;"
    );

});