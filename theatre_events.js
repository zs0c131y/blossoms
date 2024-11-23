document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;
  const eventsList = document.querySelector(".events-list");
  const eventDetails = document.querySelector(".event-details");

  // Get event parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventParam = urlParams.get("event");

  // Event data
  const eventsData = {
    "mono-acting": {
      title: "Mono Acting",
      rules: [
        "Duration: 3+1 minutes (including entry and exit).",
        "Language: English only.",
        "Performance: Self-directed and self-written acts only, performance can be in the form of a monologue or mono-act style.",
        "Props: Basic props and appropriate costumes are encouraged for better quality performance.",
        "Background Music: Permitted; music must be submitted to the tech team beforehand.",
        "Mic Facilities: Provided.",
        "Finalists: 2 winners from prelims advance to finals conducted on 15,16,17 January, 2025.",
      ],
    },
    "street-theatre": {
      title: "Street Theatre",
      rules: [
        "Duration: 8+2 minutes (including entry/exit).",
        "Participants: Minimum 15 and Maximum 25.",
        "Language: English Thematic (the dialogues, narration, etc. of the play should be told only in English).",
        "Jingle can be in any Indian language and English (every team has to have a minimum of 4 Indian languages in singing jingles, and majority usage of any Indian language is not allowed to be more than 30%).",
        "Qualification criteria for finals: If 1 to 4 teams participate, only 1 team qualifies. If 5 to 7 teams participate, 2 teams qualify. If 8 or more teams participate, 3 teams qualify, given the quality of performance.",
        "No ties are to be given at any positions for any of the winners in Theatre events.",
      ],
    },
    "proscenium-theatre": {
      title: "Proscenium Theatre",
      rules: [
        "Duration: 20 + 5 minutes (includes first stage setup and last stage clearance).",
        "Participants: Minimum 8 and Maximum of 25 – including backstage crew, lights, and production team. Minimum 6 actors must be involved.",
        "Language: English / Hindi / Kannada.",
        "Teams are allowed to do originals or adaptations with due credits and announcement.",
        "Props and Set: 4 chairs and 1 table will be provided. All other settings need to be brought by the performing team.",
        "Mics: 4 floor mics, 2 condenser stand mics, and 2 cordless mics will be provided. Any further requirements or changes should be intimated 5 days before the event.",
        "Music: Live music and the usage of instruments are allowed. All audios have to be submitted to SWO closer to the event.",
        "Lights: Basic lighting will be provided. Teams will NOT be allowed to bring in external lights or smoke machines.",
        "Qualification criteria for finals: If 1 to 4 teams participate, only 1 team qualifies. If 5 to 7 teams participate, 2 teams qualify. If 8 or more teams participate, 3 teams qualify, given the quality of performance.",
        "No ties are to be given at any positions for any of the winners in Theatre events.",
      ],
    },
    mime: {
      title: "Mime",
      rules: [
        "Duration: 7 + 1 mins (including stage entry and exit).",
        "Participants: Maximum 10 members per team including the painters, musicians, and console in charge. At any given time, minimum of 6 members should be on the stage.",
        "Use of props is NOT allowed.",
        "Use of narration (live or recorded) is NOT allowed.",
        "Mime painting can be done as per the team’s creative choice keeping traditional Mime elements in mind.",
        "No restrictions on mime costumes in regard to the colors. Vulgarity and obscenity in costumes are strictly prohibited.",
        "Sound: Recorded music, live music, and SFX may be used on or off stage. Minimal instruments are recommended if live. Teams should submit the audio as per their requirement to SWO closer to the event.",
        "Lights: Lights and auditorium facility will be provided.",
        "Qualification criteria for finals: If 1 to 4 teams participate, only 1 team qualifies. If 5 to 7 teams participate, 2 teams qualify. If 8 or more teams participate, 3 teams qualify, given the quality of performance.",
        "No ties are to be given at any positions for any of the winners in Theatre events.",
      ],
    },
    "short-film-making": {
      title: "Short Film Making",
      rules: [
        "Time: Minimum- 6 minutes, Maximum- 8 minutes (Intro and credits included).",
        "Participants: Minimum 5 members and Maximum 15 members per team including the camera person, video editors, directors, production team, etc.",
        "Language: English only (10-15% usage of regional languages is allowed based on the need of the film premise, given that subtitles are included).",
        "Only mobile phone-shot films are allowed. No professional camera films.",
        "Credits with role titles should be included in the movie (at any point, as per the team’s creativity).",
        "Criteria for judgment broadly: Editing, BGM, Minute Color Grading, Story, Script and Screenplay, Acting, and Cinematography.",
        "ANY ONE of these props must be present in the film: mismatched pair of shoes, a framed black-and-white painting, a compass, broken mirror, torchlight, pair of yellow gloves.",
        "ANY ONE of these phrases must be spoken by the characters: 'Too many cooks spoil the broth,' 'Birds of a feather flock together,' 'Rome wasn't built in a day,' 'The early bird catches the worm,' or 'Barking up the wrong tree.'",
        "Qualification criteria for finals: If 1 to 4 teams participate, only 1 team qualifies. If 5 or more teams participate, 2 teams qualify.",
      ],
    },
    dosAndDonts: {
      title: "Common DO's and DON'ts",
      rules: [
        "No Government, Governmental orders, Political parties, or any person can be targeted directly or indirectly. Mocking of political alliances and any other controversial/offensive ideas will not be tolerated.",
        "Participants/Teams are NOT allowed to change their entire act, play, or storyline for the finals. Basic modifications and quality improvement measures can be taken based on the feedback received from the prelims.",
        "Teams/Productions in each deanery are expected to perform only one production. No multiple teams are allowed across schools or within the deanery under the same production name.",
        "Scripts or storylines must be screened by the Cultural Coordinator & SWO Coordinators a week before the event.",
        "Vulgarity in movements and costume will NOT be entertained.",
        "Usage of fire and water on stage is NOT allowed.",
        "Teams are not allowed to seek support from external or cross-deanery directors, makeup, costume, or set designers for the performances.",
        "Usage of powdered colors, liquid paints, loudspeakers, or anything that damages the venue will NOT be permitted.",
        "10ft is the maximum permitted height for any formations during the performance. No lifts involving boys and girls are allowed.",
        "No Religious slokas, bhajans, or any verses from the scriptures can be used.",
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

  // Function to scroll to event details
  function scrollToEvent(eventId) {
    const eventElement = document.querySelector(`[data-event="${eventId}"]`);
    if (eventElement) {
      eventElement.scrollIntoView({ behavior: "smooth", block: "start" });
      updateEventDetails(eventId);
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

  // Handle URL parameter after populating events list
  if (eventParam) {
    // Small timeout to ensure DOM is ready
    setTimeout(() => {
      scrollToEvent(eventParam);
    }, 100);
  } else {
    // Select first event by default if no parameter
    const firstEventId = Object.keys(eventsData)[0];
    updateEventDetails(firstEventId);
  }

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
  // const firstEventId = Object.keys(eventsData)[0];
  // updateEventDetails(firstEventId);
});
