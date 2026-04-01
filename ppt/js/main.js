// 파일 경로: /js/main.js
const App = (() => {
  const state = {
    menuOpen: false,
    gsapReady: false,
  };

  const selectors = {
    loadingScreen: "#loadingScreen",
    siteHeader: "#siteHeader",
    menuBtn: "#menuBtn",
    mobileMenu: "#mobileMenu",
    mobileLinks: ".mobile-nav a",
    sectionLinks: 'a[href^="#"]',
    revealUp: ".reveal-up",
    revealLeft: ".reveal-left",
    revealRight: ".reveal-right",
    heroTitle: ".hero-title",
    heroDesc: ".hero-desc",
    heroActions: ".hero-actions .btn",
    heroCard: ".hero-card",
    pipelineSteps: ".pipeline-step",
    featureCards: ".feature-card",
    visionCards: ".vision-card",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);
  const getEls = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const init = () => {
    waitForGSAP().finally(() => {
      initLoadingScreen();
      initHeaderScroll();
      initMobileMenu();
      initSmoothAnchorScroll();
      initPipelineHighlight();
      initRevealAnimations();
      initHeroMotion();
    });
  };

  const waitForGSAP = async () => {
    const maxWait = 3000;
    const interval = 100;
    let elapsed = 0;

    while (elapsed < maxWait) {
      if (window.gsap) {
        state.gsapReady = true;

        if (window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
        }
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, interval));
      elapsed += interval;
    }

    state.gsapReady = false;
  };

  const initLoadingScreen = () => {
    const loadingScreen = getEl(selectors.loadingScreen);
    if (!loadingScreen) return;

    const hideLoading = () => {
      if (state.gsapReady) {
        window.gsap.to(loadingScreen, {
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            loadingScreen.style.display = "none";
          },
        });
      } else {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";
        loadingScreen.style.pointerEvents = "none";
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 500);
      }
    };

    if (document.readyState === "complete") {
      setTimeout(hideLoading, 500);
    } else {
      window.addEventListener(
        "load",
        () => {
          setTimeout(hideLoading, 500);
        },
        { once: true }
      );
    }
  };

  const initHeaderScroll = () => {
    const siteHeader = getEl(selectors.siteHeader);
    if (!siteHeader) return;

    const onScroll = () => {
      if (window.scrollY > 24) {
        siteHeader.classList.add("is-scrolled");
      } else {
        siteHeader.classList.remove("is-scrolled");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  const initMobileMenu = () => {
    const menuBtn = getEl(selectors.menuBtn);
    const mobileMenu = getEl(selectors.mobileMenu);
    const mobileLinks = getEls(selectors.mobileLinks);

    if (!menuBtn || !mobileMenu) return;

    const openMenu = () => {
      state.menuOpen = true;
      mobileMenu.classList.add("is-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      menuBtn.setAttribute("aria-label", "메뉴 닫기");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      state.menuOpen = false;
      mobileMenu.classList.remove("is-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      menuBtn.setAttribute("aria-label", "메뉴 열기");
      document.body.style.overflow = "";
    };

    menuBtn.addEventListener("click", () => {
      if (state.menuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 991 && state.menuOpen) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.menuOpen) {
        closeMenu();
      }
    });
  };

  const initSmoothAnchorScroll = () => {
    const header = getEl(selectors.siteHeader);
    const sectionLinks = getEls(selectors.sectionLinks);
    if (!sectionLinks.length) return;

    sectionLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = getEl(href);
        if (!target) return;

        event.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const targetTop =
          target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;

        window.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });
      });
    });
  };

  const initPipelineHighlight = () => {
    const steps = getEls(selectors.pipelineSteps);
    if (!steps.length) return;

    if (!("IntersectionObserver" in window)) {
      steps.forEach((step) => step.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    steps.forEach((step) => observer.observe(step));
  };

  const initRevealAnimations = () => {
    const revealTargets = [
      ...getEls(selectors.revealUp),
      ...getEls(selectors.revealLeft),
      ...getEls(selectors.revealRight),
    ];

    if (!revealTargets.length) return;

    if (!state.gsapReady || !window.ScrollTrigger) {
      revealTargets.forEach((target) => {
        target.style.opacity = "1";
        target.style.transform = "translate(0, 0)";
      });
      return;
    }

    revealTargets.forEach((target) => {
      let x = 0;
      let y = 36;

      if (target.classList.contains("reveal-left")) {
        x = -36;
        y = 0;
      }

      if (target.classList.contains("reveal-right")) {
        x = 36;
        y = 0;
      }

      window.gsap.fromTo(
        target,
        { autoAlpha: 0, x, y },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: target,
            start: "top 84%",
            once: true,
          },
        }
      );
    });

    const pipelineSteps = getEls(selectors.pipelineSteps);
    const featureCards = getEls(selectors.featureCards);
    const visionCards = getEls(selectors.visionCards);

    if (pipelineSteps.length) {
      window.gsap.fromTo(
        pipelineSteps,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: pipelineSteps[0].closest(".section") || pipelineSteps[0],
            start: "top 65%",
            once: true,
          },
        }
      );
    }

    if (featureCards.length) {
      window.gsap.fromTo(
        featureCards,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: featureCards[0].closest(".section") || featureCards[0],
            start: "top 68%",
            once: true,
          },
        }
      );
    }

    if (visionCards.length) {
      window.gsap.fromTo(
        visionCards,
        { autoAlpha: 0, y: 44, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: visionCards[0].closest(".vision") || visionCards[0],
            start: "top 64%",
            once: true,
          },
        }
      );
    }
  };

  const initHeroMotion = () => {
    const heroTitle = getEl(selectors.heroTitle);
    const heroDesc = getEl(selectors.heroDesc);
    const heroActions = getEls(selectors.heroActions);
    const heroCard = getEl(selectors.heroCard);

    if (!heroTitle) return;

    if (!state.gsapReady) {
      heroTitle.style.opacity = "1";
      if (heroDesc) heroDesc.style.opacity = "1";
      if (heroCard) heroCard.style.opacity = "1";
      heroActions.forEach((button) => {
        button.style.opacity = "1";
      });
      return;
    }

    const tl = window.gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      heroTitle,
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 1 }
    );

    if (heroDesc) {
      tl.fromTo(
        heroDesc,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        "-=0.45"
      );
    }

    if (heroActions.length) {
      tl.fromTo(
        heroActions,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
        "-=0.4"
      );
    }

    if (heroCard) {
      tl.fromTo(
        heroCard,
        { autoAlpha: 0, x: 40, scale: 0.96 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 0.95 },
        "-=0.7"
      );
    }

    if (window.ScrollTrigger) {
      window.gsap.to(".hero-copy", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      window.gsap.to(".hero-card", {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", App.init);