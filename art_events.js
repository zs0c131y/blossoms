document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;
  const eventsList = document.querySelector(".events-list");
  const eventDetails = document.querySelector(".event-details");

  // Comprehensive Event Data
  const eventsData = {
    photography: {
      title: "Photography",
      rules: [
        "Individual event.",
        "Themes will be announced 1 day prior to the date of the event, and photos must be in JPEG format only.",
        "Each student should submit 2 photos.",
        "Basic editing such as cropping of the photos and color correction can be done, but any editing that affects the genuineness of the photos will be directly disqualified. Advanced editing is prohibited.",
        "Only DSLR photos are allowed.",
        "The participants are supposed to present and explain their photos to the judges.",
      ],
    },
    "greeting-card-making": {
      title: "Greeting Card Making",
      rules: [
        "Individual event.",
        "White cardboard sheets will be provided.",
        "Stationery to be brought by the participants.",
        "Theme will be given on the spot.",
        "Time: 1 hour 30 minutes.",
      ],
    },
    "pencil-sketching": {
      title: "Pencil Sketching",
      rules: [
        "Individual event.",
        "Only the following materials are allowed: pencils, charcoal, and erasers.",
        "No color media (e.g., markers, paints) to be used.",
        "Participants must bring their own sketching supplies.",
        "Sketching paper will be provided to the participants.",
        "There will be a prompt given as a topic.",
        "Time limit: 1 hour 30 minutes.",
      ],
    },
    "reel-making": {
      title: "Reel Making",
      rules: [
        "Individual event.",
        "Maximum duration for the reel is 60 to 90 seconds.",
        "Explicit or vulgar content won't be entertained and accepted.",
        "Plagiarized work will be rejected.",
        "Topic will be given 1 day prior to the event.",
        "Only mobile phones to be used for reel making and only basic editing allowed. Voiceovers are allowed with BGM.",
        "No VFX effects will be allowed and stock footage will not be allowed.",
        "Shoot to be done only inside the campus.",
      ],
    },
    painting: {
      title: "Painting",
      rules: [
        "Individual event.",
        "Theme will be given on the spot.",
        "Any kind of paints are allowed to be used.",
        "Time: 1 hour 30 minutes.",
        "The painting should be original and have not been published elsewhere.",
        "The participants will carry their own water bottle, drawing and painting material, and rough cloth for cleaning.",
        "Painting sheets will be provided.",
      ],
    },
    collage: {
      title: "Collage",
      rules: [
        "Team shall consist of four members.",
        "Theme for collage shall be given on the spot.",
        "Time limit for collage making shall be 1 hour 30 minutes.",
        "No mobile or internet means would be allowed to use at the time of competition.",
        "Chart papers will be provided to the participants in the finals, and other materials must be brought by the participants.",
        "Paper, magazines, glue, scissors, sketch pens/colors, etc. to be brought by participants.",
      ],
    },
    "pot-art": {
      title: "Pot Art",
      rules: [
        "Individual event.",
        "Theme will be given on the spot.",
        "Use of glitter, mirror pieces, plaster of Paris, chalk powder, hammer chisels, and other sharp instruments are not allowed.",
        "Time: 1 hour 30 minutes.",
        "Pots will be provided.",
      ],
    },
    "mehandi-art": {
      title: "Mehandi Art",
      rules: [
        "Mehandi design should be creative and unique.",
        "Time: 1 hour 30 minutes.",
        "Mehandi design should be portrayed on one hand till the wrist.",
        "Participants need to bring their own materials (Mehndi cones & other materials).",
        "A team must have 2 participants: one artist and the other is the subject (Model).",
        "Mehndi tattoo designs that mimic tattoos (stickers) are not allowed.",
      ],
    },
    "rangoli-design": {
      title: "Rangoli Design",
      rules: [
        "Team shall consist of four members.",
        "Theme will be given on the spot.",
        "Time: 1 hour 30 minutes.",
        "Participants must bring their own colored powders for the competition.",
        "Pre-drawn outlines, stencils, or use of adhesives are strictly prohibited, and only natural or traditional Rangoli colors are allowed. Use of synthetic colors is not permitted.",
        "No additional decorations like lights, stickers, or objects should be used unless specified.",
        "Each team will be assigned a specific area to work.",
        "Participants are expected to maintain cleanliness at their workstation during and after the event.",
        "Rangoli sheet (black cardboard) will be provided.",
      ],
    },
    "digital-poster-making": {
      title: "Digital Poster Making",
      rules: [
        "Individual event.",
        "Theme to be given on the spot.",
        "Time: 1 hour 30 minutes.",
        "Participants may use any editing software as instructed in schools (Adobe Photoshop, Canva, Paint, Microsoft PowerPoint, etc.).",
        "The size of the poster must only be in A4 size (8.27” x 11.69”) in portrait format.",
        "The posters are governed by laws and regulations concerning intellectual property. Participants are strictly advised to submit an original work and avoid using elements that could subject it to copyright infringement.",
        "Usage of AI tools for poster creation is prohibited.",
      ],
    },
  };

  // Function to update event details
  function updateEventDetails(eventId) {
    const eventData = eventsData[eventId];
    if (!eventData) return;

    eventDetails.innerHTML = `
          <h2 class="event-title">${eventData.title}</h2>
          <ul class="event-rules">
              ${eventData.rules.map((rule) => `<li>${rule}</li>`).join("")}
          </ul>
      `;

    // Update active state
    document.querySelectorAll(".event-item").forEach((item) => {
      item.classList.remove("active");
    });
    const activeItem = document.querySelector(`[data-event="${eventId}"]`);
    if (activeItem) {
      activeItem.classList.add("active");
    }

    // Scroll to details on mobile
    if (window.innerWidth <= 768) {
      eventDetails.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Populate events list
  Object.keys(eventsData).forEach((eventId) => {
    const eventElement = document.createElement("div");
    eventElement.className = "event-item";
    eventElement.setAttribute("data-event", eventId);
    eventElement.textContent = eventsData[eventId].title;
    eventElement.onclick = () => updateEventDetails(eventId);
    eventsList.appendChild(eventElement);
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
    body.style.overflow = this.classList.contains("active") ? "hidden" : "";
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Prevent menu close when clicking inside nav-links
  navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Handle resize events
  let resizeTimer;
  window.addEventListener("resize", () => {
    // Prevent animation issues during resize
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 400);

    // Reset mobile menu on resize
    if (window.innerWidth > 768) {
      mobileMenuBtn.classList.remove("active");
      navLinks.classList.remove("active");
      body.style.overflow = "";
    }
  });

  // Select first event by default
  const firstEventId = Object.keys(eventsData)[0];
  updateEventDetails(firstEventId);
});
