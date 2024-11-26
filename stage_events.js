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
    "general-solo-music": {
      title: "General Rules for Solo Music Events",
      rules: [
        "For all the solo music events, only ONE accompanist is allowed.",
        "Keyboard only in Grand Piano mode or Acoustic guitar.",
        "Indian percussion instruments for Indian Solo Singing events like Tabla, Mridangam may be used.",
        "Western Acoustic Percussion Instruments for Western Solo events like Djembe or Cajon may be used.",
        "No sequenced beats/samples or backing tracks allowed.",
      ],
    },
    "battle-of-bands-western": {
      title: "Battle of Bands (Western) - 8/01/25",
      rules: [
        "Time: 10+2 minutes (including setup and clearance time).",
        "In case of failure to adhere to the allotted time limit, output volumes will be cut and there would be deduction of points/minus extended (discretion of the judges).",
        "Minimum of 5 and maximum of 10 members per team.",
        "No backing tracks, samples, and sequences are allowed.",
        "A standard 5-piece drum kit will be provided.",
        "Growling is NOT allowed.",
        "Band must have at least one vocalist and not more than three vocalists.",
        "If the team is performing its own composition, a copy of the lyrics, in English, must be submitted at the time of registration on campus and the lyrics will be checked for vulgarity and profanity.",
        "Failure to adhere to the given rules of this event will result in disqualification.",
        "Clothing and grooming to be in University conduct.",
      ],
    },
    "acapella-group": {
      title: "Acapella (Group) - 10/12/24",
      rules: [
        "Time: 10 + 2 mins (Entry to Exit Stage, Including setup).",
        "In case of failure to adhere to the allotted time limit, output volumes will be cut and there would be deduction of points/min (discretion of the judges).",
        "Both Indian and Western allowed.",
        "Minimum of 5 and Maximum of 10 members per team (Including a Beatboxer).",
        "Beatboxer not compulsory.",
        "No instruments or Backup Tracks allowed for Acapella.",
        "Clothing and grooming to be in University conduct.",
      ],
    },
    "indian-group": {
      title: "Indian Group Dance - 09/01/25  ",
      rules: [
        "Time: 10+2 minutes (including setup and clearance time).",
        "In case of failure to adhere to the allotted time limit, output volumes will be cut and there would be deduction of points/min (discretion of the judges).",
        "Team Size: 5 - 10 members.",
        "A copy of lyrics must be submitted if the performance includes an original composition of the band/group.",
        "If the lyrics are in any of the Indian languages, a copy of the literal translation of the lyrics in English must be submitted at the time of registration on campus.",
        "Lyrics will be checked for vulgarity and profanity.",
        "Performances should only be in any of the Indian languages.",
        "Growling is not allowed; any pre-recorded music/sound or sequenced samples are not allowed.",
        "Bands/Groups must include a minimum of one Indian melodic or percussion instrument.",
        "Clothing and grooming to be in University conduct.",
      ],
    },
    "indian-solo": {
      title: "Indian Folk and Film Singing (Solo) - 04/12/24",
      rules: [
        "Time limit: 4+1 mins.",
        "Only 1 accompanist allowed.",
        "Use only Grand Piano tone for keyboard accompanists.",
        "Accompanists can use an Acoustic guitar.",
        "Indian Percussive instruments like Tabla or Mridangam can be used.",
        "No sequenced beats/samples or backing tracks allowed.",
        "No inappropriate lyrics.",
        "Grooming and clothing to be appropriate.",
      ],
    },
    "western-solo": {
      title: "Western Singing (Solo) - 05/12/24",
      rules: [
        "Time limit: 4+1 mins.",
        "Best Original Composition will be awarded.",
        "Only one Accompanist allowed.",
        "Use only Grand Piano tone for keyboard or Acoustic Guitar for accompanying.",
        "Western Acoustic Percussion Instruments like Djembe or Cajon may be used.",
        "No sequenced beats/samples or backing tracks allowed.",
        "No inappropriate lyrics allowed.",
        "Grooming and clothing to be appropriate.",
      ],
    },
    "indian-classical-dance-solo": {
      title: "Indian Classical Dance Solo - 06/12/24",
      rules: [
        "Time: 4+1 minutes on stage.",
        "Only authentic classical song to be used.",
        "Only one song permitted, no mixing of songs.",
        "No live music allowed.",
        "No film songs will be allowed.",
        "First 2 winners of the prelims to be selected for the finals.",
        "Authentic costumes, hairstyle, and jewelry which represent the dance form to be worn.",
        "Deaneries with more than 5 participants to send 3 finalists; deaneries with 3 to 5 participants to select only 2 finalists; deaneries with less than 3 participants to select only 1 finalist.",
      ],
    },
    // "indian-dance-group-non-theme": {
    //   title: "Indian Dance Group: Non-Theme (Film/Folk) - ",
    //   rules: [
    //     "Time: 5+1 minutes on stage.",
    //     "Fusion of songs is not allowed.",
    //     "Songs should be only from Indian films, no remixes, no album songs.",
    //     "Only Indian dance forms (including Bollywood, Contemporary) are allowed.",
    //     "The songs must have lyrics.",
    //     "Minimum 8 and maximum 15 members in a team.",
    //     "Minimum props will be allowed.",
    //     "No fire on stage, no vulgarity in costume, movements, or lyrics.",
    //     "First 3 winning teams of the prelims to be selected for the finals.",
    //     "Deaneries with more than 5 teams to send 3 finalist teams; deaneries with 3 to 5 teams to select only 2 finalists; deaneries with less than 3 teams to select only 1 finalist.",
    //   ],
    // },
    "dance-duet": {
      title: "Dance Duet - 10/12/24",
      rules: [
        "Time: 2+1 minutes on stage.",
        "Team of 2.",
        "Only Indian film songs allowed.",
        "Mixing of songs allowed (maximum 2 songs).",
        "Vulgarity in movements and costume will not be entertained.",
        "The use of fire and water on stage is not allowed.",
        "No western dance form will be allowed.",
        "First 2 winners of the prelims to be selected for the finals.",
        "Deaneries with more than 5 teams to send 3 finalist teams; deaneries with 3 to 5 teams to select only 2 finalists; deaneries with less than 3 teams to select only 1 finalist.",
      ],
    },
    "folk-dance-duet": {
      title: "Folk Dance Duet - 12/12/24",
      rules: [
        "Time: 4+1 minutes on stage.",
        "Only one song permitted, no mixing of songs.",
        "No live music allowed.",
        "Authentic folk songs to be used.",
        "Film songs and album songs not to be used.",
        "Authentic costumes, hairstyle, and jewelry which represent the dance form to be worn.",
        "First 2 teams will be selected for the finals.",
        "Deaneries with more than 5 teams to send 3 finalist teams; deaneries with 3 to 5 teams to select only 2 finalists; deaneries with less than 3 teams to select only 1 finalist.",
      ],
    },
    "indian-classical-dance-group": {
      title: "Indian Classical Dance (Group) - 07/01/25",
      rules: [
        "Time: 6+1 minutes on stage.",
        "Minimum 4 members and a maximum of 8 members per team.",
        "No live music allowed.",
        "Authentic Indian classical song to be selected.",
        "Classical music from movies is not allowed.",
        "Authentic costumes, hairstyle, and jewelry which represent the dance form to be worn.",
        "Deaneries with more than 5 teams to send 3 finalist teams; deaneries with 3 to 5 teams to select only 2 finalists; deaneries with less than 3 teams to select only 1 finalist.",
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
