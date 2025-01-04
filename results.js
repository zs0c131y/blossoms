document.addEventListener("DOMContentLoaded", function () {
  // Leading Contenders Data
  const leadingContenders = [
    { position: "1st", school: "SCHOOL OF BUSINESS & MANAGEMENT" },
    { position: "2nd", school: "SCHOOL OF SOCIAL SCIENCES" },
    { position: "3rd", school: "SCHOOL OF ARTS & HUMANITIES" },
    { position: "4th", school: "SCHOOL OF SCIENCES" },
    { position: "5th", school: "SCHOOL OF COMMERCE, FINANCE & ACCOUNTANCY" },
  ];

  // Results Data
  const resultsData = {
    art: [
      {
        name: "Pot Art",
        winners: [
          { position: "1st", name: "THAYA", school: "SCHOOL OF SCIENCES" },
          {
            position: "2nd",
            name: "SRIVIDYA S MURUGAN NADAR",
            school: "SCHOOL OF ARTS AND HUMANITIES",
          },
          {
            position: "3rd",
            name: "SNEHA BISWAS",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
        ],
      },
      {
        name: "Pencil Sketching",
        winners: [
          {
            position: "1st",
            name: "ANUSHKA PATRA",
            school: "SCHOOL OF ARTS AND HUMANITIES",
          },
          {
            position: "2nd",
            name: "SANCHAYITA ROY",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
          {
            position: "3rd",
            name: "CINOSH SIBI",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
        ],
      },
      {
        name: "Painting",
        winners: [
          {
            position: "1st",
            name: "LAASYA BALAJI",
            school: "SCHOOL OF BUSINESS AND MANAGEMENT",
          },
          { position: "2nd", name: "JENNIFER D", school: "SCHOOL OF SCIENCES" },
          { position: "3rd", name: "THAYA", school: "SCHOOL OF SCIENCES" },
        ],
      },
      {
        name: "Mehendi",
        winners: [
          {
            position: "1st",
            name: "HUDA IMTIYAZ",
            school: "SCHOOL OF SCIENCES",
          },
          {
            position: "2nd",
            name: "AANYA KAMAL",
            school: "SCHOOL OF COMMERCE, FINANCE & ACCOUNTANCY",
          },
          {
            position: "3rd",
            name: "SURABHI KUMARI",
            school: "SCHOOL OF SCIENCES",
          },
        ],
      },
      {
        name: "Photography",
        winners: [
          {
            position: "1st",
            name: "NANDINI DIXIT",
            school: "SCHOOL OF ARTS & HUMANITIES",
          },
          {
            position: "2nd",
            name: "BEERAKA SHALINI SRUTI",
            school: "SCHOOL OF ARTS & HUMANITIES",
          },
          {
            position: "3rd",
            name: "DEV KUMAR KA",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
        ],
      },
      {
        name: "Greeting Card Making",
        winners: [
          {
            position: "1st",
            name: "SHRIYA NAIR",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
          {
            position: "2nd",
            name: "THAYA SRIHA MANOJ",
            school: "SCHOOL OF SCIENCES",
          },
          {
            position: "3rd",
            name: "SNEH MANGAL",
            school: "SCHOOL OF BUSINESS AND MANAGEMENT",
          },
        ],
      },
    ],
    literature: [
      {
        name: "Poetry",
        winners: [
          {
            position: "1st",
            name: "DEVANSHI CHANDWANI",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
          { position: "2nd", name: "HARSHA K", school: "SCHOOL OF SCIENCES" },
          {
            position: "3rd",
            name: "SANJANA KHIANI",
            school: "SCHOOL OF COMMERCE, FINANCE & ACCOUNTANCY",
          },
        ],
      },
      {
        name: "Short Story",
        winners: [
          {
            position: "1st",
            name: "AISHWARYA C",
            school: "SCHOOL OF SCIENCES",
          },
          {
            position: "2nd",
            name: "LAVANYA JAIKUMAR MUDLIAR",
            school: "SCHOOL OF ARTS AND HUMANITIES",
          },
          {
            position: "3rd",
            name: "SUZETTE BRYAN DSOUZA",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
        ],
      },
      {
        name: "Essay",
        winners: [
          {
            position: "1st",
            name: "RANJITH",
            school: "SCHOOL OF COMMERCE, FINANCE & ACCOUNTANCY",
          },
          {
            position: "2nd",
            name: "ANUSHKA",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
          {
            position: "3rd",
            name: "ANYA PRASAD",
            school: "SCHOOL OF COMMERCE, FINANCE & ACCOUNTANCY",
          },
        ],
      },
      {
        name: "Debate",
        winners: [
          {
            position: "1st",
            name: "PRAGYA NAIDU",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
          {
            position: "2nd",
            name: "SHREYA GIRI RAO",
            school: "SCHOOL OF COMMERCE, FINANCE & ACCOUNTANCY",
          },
          {
            position: "3rd",
            name: "JYOTSNA VARMA",
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
        ],
      },
      {
        name: "Dumb Charades",
        winners: [
          {
            position: "1st",
            names: ["ANAGHA SHEEBU", "ISHANA GUPTA", "SYEDA AMATUL AFOO"],
            school: "SCHOOL OF ARTS AND HUMANITIES",
          },
          {
            position: "2nd",
            names: ["DARSHITA GOSWAMI", "SAIYED ALEEZA IRFAN", "TIYA NAYAK"],
            school: "SCHOOL OF SOCIAL SCIENCES",
          },
          {
            position: "3rd",
            names: ["AHANA MAITI", "VAISHALI RAJAN", "NABOMITA PAL"],
            school: "SCHOOL OF BUSINESS AND MANAGEMENT",
          },
        ],
      },
    ],
    theatre: [
      {
        name: "Mono Acting",
        winners: [
          {
            position: "1st",
            name: "ANIKA AGARWAL",
            school: "SCHOOL OF BUSINESS & MANAGEMENT",
          },
          {
            position: "2nd",
            name: "ANANYA CHAUDHARY",
            school: "SCHOOL OF BUSINESS & MANAGEMENT",
          },
          {
            position: "3rd",
            name: "RAGHAV JOSHI",
            school: "SCHOOL OF BUSINESS & MANAGEMENT",
          },
        ],
      },
      {
        name: "Short Film Making",
        winners: [
          {
            position: "1st",
            names: [
              "ANUSHKA KULKARNI",
              "DEBDOOT BANERJEE",
              "DAKSH JAIN",
              "SHAYEREE DAS",
              "ANIKA AGARWAL",
              "JOSHAN ASHISH PAUL",
            ],
            school: "SCHOOL OF BUSINESS & MANAGEMENT",
          },
          {
            position: "2nd",
            names: [
              "ASHISH MISRA",
              "VAISHNAVI MANIYAR",
              "JAISIM BALAKRISHNA",
              "RAGHAV JOSHI",
              "RAGHAV KADMAWALA",
              "GODWIN MACHADO",
              "NIKUNJ LAAD",
              "MOKSHITH S",
              "SURABHI PATEL",
              "ANNA MARIA RAISON",
              "DEV BHATNAGAR",
              "TRAYEE JOSHI",
              "UTKARSH SINGH RATHORE",
            ],
            school: "SCHOOL OF BUSINESS & MANAGEMENT",
          },
          {
            position: "3rd",
            names: [
              "PRIYANGHA M",
              "VANISHA R BHONSLE",
              "MAHITHA PEKETI",
              "ABHISHEK M",
              "SNEHA SAHA",
              "IDA DOROTHY S",
            ],
            school: "SCHOOL OF ARTS & HUMANITIES",
          },
        ],
      },
    ],
  };

  // Function to create event card
  function createEventCard(event) {
    return `
        <div class="event-card">
          <h3 class="event-title">${event.name}</h3>
          <ul class="winners-list">
            ${event.winners
              .map(
                (winner) => `
              <li class="winner-item">
                <div class="position">${winner.position} Position</div>
                ${
                  winner.names
                    ? `
                  <div class="winner-name">${winner.names.join("<br>")}</div>
                `
                    : `
                  <div class="winner-name">${winner.name}</div>
                `
                }
                <div class="winner-school">${winner.school}</div>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `;
  }

  // Function to populate leading contenders
  function populateLeadingContenders() {
    const container = document.getElementById("leadingContenders");
    container.innerHTML = leadingContenders
      .map(
        (contender) => `
        <div class="contender-item">
          <div class="contender-position">${contender.position} Position</div>
          <div class="contender-school">${contender.school}</div>
        </div>
      `
      )
      .join("");
  }

  // Populate events for each category
  Object.keys(resultsData).forEach((category) => {
    const container = document.getElementById(category + "Events");
    if (container && resultsData[category]) {
      container.innerHTML = resultsData[category]
        .map((event) => createEventCard(event))
        .join("");
    }
  });

  // Populate leading contenders
  populateLeadingContenders();

  // Animation on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
      body.style.overflow = this.classList.contains("active") ? "hidden" : "";
    });

    document.addEventListener("click", function (e) {
      if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuBtn.classList.remove("active");
        navLinks.classList.remove("active");
        body.style.overflow = "";
      }
    });
  }
});
