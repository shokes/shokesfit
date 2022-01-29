"use strict";

const join = document.querySelector(".btn--join");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btncloseModal = document.querySelector(".btn--close-modal");
const mainNavLinks = document.querySelector(".main-nav-links");
const logo = document.querySelector(".logo-name");
const sectionWelcome = document.querySelector(".section-welcome");
const header = document.querySelector(".header");
const navLink = document.querySelectorAll(".main-nav-link");
const preloaderBackground = document.querySelector(".preloader-background");
const btnMenu = document.querySelector(".btn-mobile-nav");

// activating the modal

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

join.addEventListener("click", openModal);

btncloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// implementing smooth scrolling

mainNavLinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("main-nav-link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    header.classList.remove("nav-open");
  }
});

// implementing a fading navigation bar

const opacity = function (e) {
  e.preventDefault();

  if (e.target.classList.contains("main-nav-link")) {
    // console.log(e.target);
    const link = e.target;
    const siblings = link
      .closest(".main-nav-links")
      .querySelectorAll(".main-nav-link");
    // console.log(siblings);
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

mainNavLinks.addEventListener("mouseover", opacity.bind(0.5));

mainNavLinks.addEventListener("mouseout", opacity.bind(1));

// implementing sticky navigation bar

const navHeight = sectionWelcome.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

const sectionWelcomeObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

sectionWelcomeObserver.observe(sectionWelcome);

// revealing sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

// lazy loading of images

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// preloader functionality

// const preloader = document.querySelector(".preloader");

// window.addEventListener("load", function () {
//   preloader.classList.add("hide-preloader");
//   preloaderBackground.classList.add("hidden");
// });

// implementing mobile navigation functionaliy

btnMenu.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
