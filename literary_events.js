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

  // Comprehensive Event Data
  const eventsData = {
    debate: {
      title: "Debate (Prelims) - 04/12/24",
      rules: [
        "Individual event.",
        "Topics are announced a day before the event.",
        "Speaking and Rebuttal Time: 4 minutes + 1 minute. Non-parliamentary style of debate.",
        "Usage of notes will be as per judges' discretion.",
        "Participants should be prepared for both, for and against the motion.",
        "Rules for the Final round will be given at the judges' discretion.",
        "Finals on 07/12/24",
      ],
    },
    extempore: {
      title: "Extempore - 03/01/25",
      rules: [
        "Individual event.",
        "A topic will be given on the spot, and the participant has to speak on the given topic.",
        "1 minute will be given to think/prepare for the topic.",
        "No writing allowed.",
        "Points are awarded for content, fluency, relevance to the topic, style, and humor.",
      ],
    },
    "air-crash-ship-wreck": {
      title: "Air Crash / Ship Wreck - 10/12/24",
      rules: [
        "Individual event.",
        "Participants are assigned a character at random and put in a situation depicting a crashing ship/plane.",
        "The judge is the captain, and based on the case presented by the participant, the captain decides whether to give the participant the last lifejacket on the lifeboat/plane or not.",
        "1 minute will be given to think/prepare for the topic.",
        "No writing allowed.",
        "1+1 minute will be given to present your case (1 minute to speak and 1 minute to answer the captain’s questions).",
      ],
    },
    "dumb-charades": {
      title: "Dumb Charades - 07/12/24",
      rules: [
        "3 members per team (1 person to guess and 2 people to act, based on the team’s choice).",
        "Spelling, rhyming, splitting, codes, etc. are not allowed.",
        "The rounds and charades prompts can be anything like movies, characters, songs, phrases, situations, etc.",
        "The final round will be given at the judges' discretion.",
      ],
    },
    "pot-pourri": {
      title: "Pot Pourri - 03/12/24",
      rules: [
        "3 members per team.",
        "The event will consist of multiple rounds, each focusing on different literary activities (examples of rounds include quizzes, spell bee, crosswords, heads up, extempore, turncoat, and more).",
        "Make your team accordingly.",
        "Points can be cumulative at the end of the final round or based on elimination at each round, at the judges' discretion.",
        "Points will be awarded based on accuracy, creativity, speed, and adherence to the task guidelines.",
      ],
    },
    "just-a-minute": {
      title: "Just A Minute - 05/12/24",
      rules: [
        "Individual event.",
        "The event happens in multiple rounds and is based on elimination.",
        "Just-A-Minute (JAM) is an individual event where participants must speak on a given topic for one minute without hesitation, repetition, or deviation.",
        "Points are awarded for seconds spoken, non-errors, quick thinking, eloquence, and presence of mind.",
        "The topic for each round will be given by the JAM Master on the spot.",
        "Standard JAM rules apply.",
      ],
    },
    "creative-writing": {
      title: "Creative Writing - 02/12/24",
      rules: [
        "Individual participation.",
        "English is the only medium of language.",
        "Vulgarity, obscenity, and inappropriate language will not be tolerated.",
        "A. Poetry (Duration: 1 hour; Format: 4 stanzas with 4 lines each) - Themes will be given on the spot.",
        "B. Essay (Duration: 1 hour; Minimum: 1000 words, Maximum: 1500 words) - Topic will be given on the spot.",
        "C. Short Story (Duration: 1 hour; Minimum: 500 words, Maximum: 750 words) - A picture prompt will be given on the spot.",
      ],
    },
    quiz: {
      title: "Quiz (Prelims) - 09/12/24",
      rules: [
        "Only team entries are allowed, and the team shall consist of three members.",
        "The decision of the quiz-master will be final and will not be subjected to any change.",
        "Participants shall not be allowed to use mobile or other electronic instruments during the quiz time.",
        "The questions shall be in the form of multiple choice, true/false statement, specific answer questions, etc., and the quizmaster will decide the rounds and the question format.",
        "Replacement of any participant of a team is not allowed after registration.",
        "Finals on 11/12/24",
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
