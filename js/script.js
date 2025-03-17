// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li");
const header = document.querySelector("header");
const trendingCarousel = document.querySelector(".trending-carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const testimonialCarousel = document.querySelector(".testimonial-carousel");
const dots = document.querySelectorAll(".dot");
const bookingForm = document.getElementById("bookingForm");

// Mobile Navigation
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Animate hamburger to X
  hamburger.classList.toggle("toggle");

  // Animate Links
  navLinksItems.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });
});

// Close mobile menu when clicking on a link
navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("toggle");

      navLinksItems.forEach((link) => {
        link.style.animation = "";
      });
    }
  });
});

// Sticky Header
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.background = "white";
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Active Navigation Link on Scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Trending Carousel
let trendingPosition = 0;
const trendingItems = document.querySelectorAll(".trending-item");
const trendingItemWidth = trendingItems[0].offsetWidth;
const trendingItemMargin = 16; // 1rem = 16px
const trendingVisibleItems = 3;

// Initialize carousel position
function initTrendingCarousel() {
  // Adjust for responsive design
  if (window.innerWidth <= 768) {
    trendingPosition = 0;
    trendingCarousel.style.transform = `translateX(0)`;
  }
}

// Next button for trending carousel
nextBtn.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    // On mobile, show one item at a time
    if (
      trendingPosition >
      -(trendingItems.length - 1) * (trendingItemWidth + trendingItemMargin)
    ) {
      trendingPosition -= trendingItemWidth + trendingItemMargin;
      trendingCarousel.style.transform = `translateX(${trendingPosition}px)`;
    }
  } else {
    // On desktop, show three items at a time
    if (
      trendingPosition >
      -(trendingItems.length - trendingVisibleItems) *
        (trendingItemWidth + trendingItemMargin)
    ) {
      trendingPosition -= trendingItemWidth + trendingItemMargin;
      trendingCarousel.style.transform = `translateX(${trendingPosition}px)`;
    }
  }
});

// Previous button for trending carousel
prevBtn.addEventListener("click", () => {
  if (trendingPosition < 0) {
    trendingPosition += trendingItemWidth + trendingItemMargin;
    trendingCarousel.style.transform = `translateX(${trendingPosition}px)`;
  }
});

// Testimonial Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial");

// Hide all testimonials except the first one
for (let i = 1; i < testimonials.length; i++) {
  testimonials[i].style.display = "none";
}

// Function to show a specific testimonial
function showTestimonial(index) {
  // Hide all testimonials
  testimonials.forEach((testimonial) => {
    testimonial.style.display = "none";
  });

  // Show the selected testimonial
  testimonials[index].style.display = "block";

  // Update active dot
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  dots[index].classList.add("active");

  currentTestimonial = index;
}

// Add click event to dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showTestimonial(index);
  });
});

// Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Form Validation and Submission
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic form validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const appointmentType = document.getElementById("appointmentType").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!name || !email || !phone || !appointmentType || !date || !time) {
      alert("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^\d{10,}$/;
    if (!phoneRegex.test(phone.replace(/[^0-9]/g, ""))) {
      alert("Please enter a valid phone number");
      return;
    }

    // If all validations pass, show success message
    alert(
      "Thank you for booking an appointment! We will contact you shortly to confirm."
    );
    bookingForm.reset();
  });
}

// Image Zoom Effect for Collection Items
const categoryImages = document.querySelectorAll(".category-img img");

categoryImages.forEach((img) => {
  img.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = img.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  });

  img.addEventListener("mouseleave", () => {
    img.style.transformOrigin = "center center";
  });
});

// Newsletter Form Submission
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // If validation passes, show success message
    alert("Thank you for subscribing to our newsletter!");
    newsletterForm.reset();
  });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      });
    }
  });
});

// Initialize on page load
window.addEventListener("load", () => {
  initTrendingCarousel();

  // Add animation class to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".category, .process-step, .showcase-item, .appointment-type"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.classList.add("animate");
      }
    });
  };

  // Call once on load
  animateOnScroll();

  // Call on scroll
  window.addEventListener("scroll", animateOnScroll);
});

// Resize event listener for responsive adjustments
window.addEventListener("resize", () => {
  initTrendingCarousel();
});
