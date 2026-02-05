"use sctrict";

document.addEventListener("DOMContentLoaded", function () {
  const rotatingImages = document.querySelectorAll(".rotate-15");

  function setBigEllipseDimensions() {
    const bigEllipseContainers = document.querySelectorAll(
      ".elliptical-link-container-big"
    );
    bigEllipseContainers.forEach((container) => {
      const image = container.querySelector(".elliptical-link");
      const ellipse = container.querySelector(".ellipse-big");

      const imageWidth = image.offsetWidth;

      const ellipseWidth = imageWidth * 1.42;
      const ellipseHeight = ellipseWidth * 0.45;

      ellipse.style.width = `${ellipseWidth}px`;
      ellipse.style.height = `${ellipseHeight}px`;
    });
  }

  setBigEllipseDimensions();

  window.addEventListener("resize", setBigEllipseDimensions);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  rotatingImages.forEach((img) => {
    transformImage(img);
    observer.observe(img);
  });

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        rotateImage(entry.target);
      }
    });
  }

  function calcRotationAngle(image) {
    const windowHeight = window.innerHeight;
    const windowMiddleY = windowHeight / 2;

    const rect = image.getBoundingClientRect();
    const imageMiddleY = rect.top + rect.height / 2;

    const distance = imageMiddleY - windowMiddleY;

    let rotationAngle = (distance / windowHeight) * 15 + 5;

    return Math.max(-15, Math.min(15, rotationAngle));
  }

  function transformImage(img) {
    img.style.transform = `rotate(${calcRotationAngle(img)}deg)`;
  }

  function rotateImage(image) {
    window.addEventListener("scroll", function () {
      transformImage(image);
    });
  }

  // const animContainres = document.querySelectorAll(".anim-container");
  let ellipseBtns = document.querySelectorAll(".ellipse-btn");

  // animContainres.forEach((container) => {
  //   const textCont = document.querySelector(".text-container");
  //   container.style.height = textCont.offsetHeight + "px";
  // });

  ellipseBtns.forEach(function (ellipseBtn) {
    let ellipseLink = ellipseBtn.nextElementSibling;

    const fillEllipse = function (btn, link) {
      btn.style.backgroundColor = "black";
      btn.style.border = "none";
      link.style.color = "white";
    };

    const clearEllipse = function (btn, link) {
      btn.style.backgroundColor = "transparent";
      btn.style.border = "1px solid rgba(0, 0, 0, 0.5)";
      link.style.color = "black";
    };

    ellipseBtn.addEventListener("mouseover", function () {
      fillEllipse(ellipseBtn, ellipseLink);
    });

    ellipseBtn.addEventListener("mouseout", function () {
      clearEllipse(ellipseBtn, ellipseLink);
    });

    ellipseBtn.addEventListener("click", (e) => {
      e.preventDefault();

      ellipseBtn.id === "submitFormBtn"
        ? (window.location.href = "#contact-form")
        : (window.location.href = "#contact");
    });

    ellipseLink.addEventListener("mouseover", function () {
      fillEllipse(ellipseBtn, ellipseLink);
    });

    ellipseLink.addEventListener("mouseout", function () {
      clearEllipse(ellipseBtn, ellipseLink);
    });
  });

  window.addEventListener("scroll", function () {
    shiftPortfolio();
    animateAbout();
    animateElements();
  });
});

window.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("loaded");
  animateAbout();
  animateElements();
});

function shiftPortfolio() {
  const parallaxContainers = document.querySelectorAll(
    ".parallax-portfolio-container"
  );
  parallaxContainers.forEach(function (container) {
    const containerHeight = container.offsetHeight;

    const windowHeight = window.innerHeight;

    const containerScrollPosition = container.getBoundingClientRect().top;

    const scrollPercentage =
      1 -
      (containerScrollPosition + containerHeight) /
        (windowHeight + containerHeight);

    const parallaxImage = container.querySelector(".parallax-portfolio");
    const imageHeight = parallaxImage.offsetHeight;

    const maxShiftDistance = containerHeight - imageHeight;

    const shiftDistance = (1 - scrollPercentage) * maxShiftDistance;

    parallaxImage.style.transform = `translateY(${shiftDistance}px)`;
  });
}

function animateAbout() {
  const placeholdersAbout = document.querySelectorAll(".img-placeholder");

  placeholdersAbout.forEach(function (placeholder, index) {
    const img = document.createElement("img");
    img.src = placeholder.getAttribute("data-src");
    img.alt = "Design Kuhn";
    img.classList.add("img-fluid");
    img.classList.add("about-img");
    img.classList.add("no-shadow");
    if (isInViewport(placeholder)) {
      img.classList.add("about-animate-grow");
      placeholder.parentNode.insertBefore(img, placeholder.nextSibling);
      setTimeout(function () {
        img.style.opacity = "1";
      }, 500);
      placeholder.remove();
    }
  });
}

function animateElements() {
  const elements = document.querySelectorAll(".animated-text");

  elements.forEach(function (elem) {
    const delay = parseFloat(elem.getAttribute("data-delay") || "0") * 1000;
    if (isInViewport(elem)) {
      setTimeout(function () {
        elem.classList.add("animate");
      }, delay);
    }
  });
}

function isInViewport(elem) {
  const rect = elem.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
