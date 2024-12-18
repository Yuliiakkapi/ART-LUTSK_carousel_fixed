// ---------------------------------Dynamically load the header
document.addEventListener("DOMContentLoaded", async () => {
  // Load header
  const headerContainer = document.getElementById("header");
  if (headerContainer) {
    try {
      const response = await fetch("header.html");
      const html = await response.text();
      headerContainer.innerHTML = html;

      // Active menu item logic
      const currentPage = window.location.pathname.split("/").pop();
      const menuItems = document.querySelectorAll(".menu-item");

      menuItems.forEach((item) => {
        if (item.getAttribute("href") === currentPage) {
          item.classList.add("active");
        }
      });

      // After header is loaded, initialize mobile menu
      const menuBtn = document.querySelector(".mobile-menu-btn");
      const menuPopup = document.querySelector(".mobile-menu-popup");
      const closeBtn = document.querySelector(".close-menu");

      if (menuBtn && menuPopup && closeBtn) {
        menuBtn.addEventListener("click", () => {
          menuPopup.classList.add("active");
          document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
        });

        closeBtn.addEventListener("click", () => {
          menuPopup.classList.remove("active");
          document.body.style.overflow = ""; // Restore scrolling
        });

        // Close menu when clicking on a menu item
        const menuItems = document.querySelectorAll(".mobile-nav .menu-item");
        menuItems.forEach((item) => {
          item.addEventListener("click", () => {
            menuPopup.classList.remove("active");
            document.body.style.overflow = "";
          });
        });
      }
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }

  // -----------------------------------------------Load footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      const footerDiv = document.createElement("div");
      footerDiv.innerHTML = data;
      document.body.appendChild(footerDiv);
    })
    .catch((error) => console.error("Error loading footer:", error));

  // ----------------------------To avoid repetition of section .posts in HTML
  const postsElement = document.querySelector(".posts");
  if (postsElement) {
    var copy = postsElement.cloneNode(true);
    document.querySelector(".gallery_track").appendChild(copy);
  }

  // ---------------------------------Events carousel functionality
  const carousel = document.querySelector(".events_carousel");
  const cardsContainer = document.querySelector(".events_cards");
  const cards = document.querySelectorAll(".event_card");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentPosition = 0;
  // const cardWidth = 312; // Width of one card
  const cardWidth = cards[0].offsetWidth;
  const gap = 22; // Gap between cards
  const cardsToShow = 4; // Number of cards to show at once
  const moveAmount = cardWidth + gap;
  const maxPosition = -((cards.length - cardsToShow) * moveAmount);

  // Function to update carousel position
  function updateCarousel() {
    currentPosition = Math.max(currentPosition, maxPosition);
    currentPosition = Math.min(currentPosition, 0);
    console.log("Current Position (px):", currentPosition);
    cardsContainer.style.transform = `translateX(${currentPosition}px)`;

    // Enable/disable buttons based on position
    prevButton.style.opacity = currentPosition === 0 ? "0.5" : "1";
    nextButton.style.opacity = currentPosition <= maxPosition ? "0.5" : "1";
  }

  // Previous button click handler
  prevButton.addEventListener("click", () => {
    if (currentPosition < 0) {
      currentPosition += moveAmount;
      updateCarousel();
    }
  });

  // Next button click handler
  nextButton.addEventListener("click", () => {
    if (currentPosition > maxPosition) {
      currentPosition -= moveAmount;
      updateCarousel();
    }
  });

  // Initialize carousel
  updateCarousel();

  //------------------------ ANIMATED TEXT for the hero screen
  const words = ["", "INSPIRE", "EXPLORE", "CREATE", "ENJOY"];
  const animatedText = document.querySelector(".animated-text");
  let currentIndex = 0;

  function typeWriter(text, index) {
    if (index < text.length) {
      animatedText.textContent += text.charAt(index);
      setTimeout(() => typeWriter(text, index + 1), 100); // Adjust typing speed here
    }
  }

  function eraseText() {
    const text = animatedText.textContent;
    if (text.length > 0) {
      animatedText.textContent = text.slice(0, -1);
      setTimeout(eraseText, 50); // Adjust erasing speed here
    } else {
      currentIndex = (currentIndex + 1) % words.length;
      typeWriter(words[currentIndex], 0);
    }
  }

  function startAnimation() {
    setTimeout(eraseText, 500); // Word display duration
  }

  // Start the initial animation
  typeWriter(words[0], 0);

  // Start the cycle
  setInterval(startAnimation, 4000); // Total animation cycle duration

  // ------------------------NEWSLETTER - Get the form element

  const newsletterForm = document.querySelector(".newsletter_form form");
  const popup = document.getElementById("successPopup");
  const closePopup = document.querySelector(".close-popup");

  // Add submit event listener to the form
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from actually submitting

    // Show the popup
    popup.style.display = "block";

    // Clear the form
    this.reset();
  });

  // Close popup when clicking the close button
  closePopup.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // Close popup when clicking outside of it
  window.addEventListener("click", function (e) {
    if (e.target == popup) {
      popup.style.display = "none";
    }
  });

  //----------------- Back to top button functionality
  const backToTopButton = document.getElementById("backToTop");

  // Show button when scrolling down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      // Button appears after 300px scroll
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  // Scroll to top when clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const readMoreBtn = document.querySelector(".read-more-btn");
  const hiddenParagraphs = document.querySelectorAll(
    ".block_left p:not(:first-of-type)"
  );

  console.log("Read More button:", readMoreBtn); // Debug log
  console.log("Hidden paragraphs:", hiddenParagraphs); // Debug log

  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", function () {
      console.log("Button clicked"); // Debug log
      hiddenParagraphs.forEach((p) => {
        p.classList.toggle("show");
        console.log("Toggling paragraph:", p); // Debug log
      });

      // Change button text
      this.textContent =
        this.textContent === "Read more" ? "Read less" : "Read more";
    });
  }
});
