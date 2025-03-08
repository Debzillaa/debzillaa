document.addEventListener("DOMContentLoaded", function () {
  const greeting1 = document.getElementById("greeting1");
  const greeting2 = document.getElementById("greeting2");
  const container = document.querySelector(".container");
  const contentBlocks = document.getElementById("contentBlocks");

  contentBlocks.style.opacity = 0;
  contentBlocks.classList.add("hidden");

  fadeIn(greeting1, 1400, function () {
    fadeOut(greeting1, 1400, function () {
      fadeIn(greeting2, 1400, function () {
        fadeOut(greeting2, 1400, function () {
          animateBackgroundColorChange(container, "black", "#121212", 800);
        });
      });
    });
  });

  function fadeIn(element, duration, callback) {
    element.style.display = "block";
    element.style.opacity = 0;
    let startTime = null;

    function fade() {
      if (startTime === null) {
        startTime = performance.now();
      }

      const progress = (performance.now() - startTime) / duration;
      element.style.opacity = Math.min(progress, 1);

      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        callback();
      }
    }

    requestAnimationFrame(fade);
  }

  function fadeOut(element, duration, callback) {
    let startTime = null;

    function fade() {
      if (startTime === null) {
        startTime = performance.now();
      }

      const progress = (performance.now() - startTime) / duration;
      element.style.opacity = 1 - Math.min(progress, 1);

      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        element.style.display = "none";
        callback();
      }
    }

    requestAnimationFrame(fade);
  }

  function animateBackgroundColorChange(element, fromColor, toColor, duration) {
    let startTime = null;

    function animate() {
      if (startTime === null) {
        startTime = performance.now();
      }

      const progress = (performance.now() - startTime) / duration;
      element.style.backgroundColor = interpolateColor(
        fromColor,
        toColor,
        progress
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        showSocials();
      }
    }

    requestAnimationFrame(animate);
  }

  function showSocials() {
    fadeIn(contentBlocks, 1000);
    contentBlocks.classList.remove("hidden");
  }

  function interpolateColor(fromColor, toColor, progress) {
    const fromRGB = hexToRGB(fromColor);
    const toRGB = hexToRGB(toColor);

    const resultRGB = [];
    for (let i = 0; i < 3; i++) {
      resultRGB[i] = Math.round(
        fromRGB[i] + (toRGB[i] - fromRGB[i]) * progress
      );
    }

    return `rgb(${resultRGB.join(",")})`;
  }

  function hexToRGB(hexColor) {
    const hex = hexColor.slice(1);
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
  }

  function updateAge() {
    const birthTimestamp = 1125792000000;
    const nowTimestamp = Date.now();
    let ageInMilliseconds = nowTimestamp - birthTimestamp;
    let ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    document.getElementById("dynamicAge").textContent = ageInYears.toFixed(5);
  }

  updateAge();
  setInterval(updateAge, 100);
});
