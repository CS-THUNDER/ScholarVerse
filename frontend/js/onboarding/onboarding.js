/*
==========================================
ScholarVerse
Onboarding Engine
Author : Sudip Pattanayak
==========================================
*/

let currentStep = 0;

const totalSteps = 5;

const userData = {
  course: "",

  semester: "",

  university: "",

  goal: "",

  experience: "",
};

const stepContainer = document.getElementById("stepContainer");

const progressFill = document.getElementById("progressFill");

const currentStepText = document.getElementById("currentStep");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const steps = [
  {
    title: "Choose Your Course",

    description: "Select your current course.",

    type: "course",

    options: [
      {
        title: "MCA",
        icon: "graduation-cap",
      },

      {
        title: "BCA",
        icon: "book-open",
      },

      {
        title: "BSc CS",
        icon: "laptop",
      },

      {
        title: "MSc CS",
        icon: "brain",
      },

      {
        title: "B.Tech",
        icon: "cpu",
      },

      {
        title: "Other",
        icon: "circle-help",
      },
    ],
  },

  {
    title: "Current Semester",

    description: "Select your semester.",

    type: "semester",
  },

  {
    title: "University",

    description: "Choose your university.",

    type: "university",
  },

  {
    title: "Primary Goal",

    description: "Why are you using ScholarVerse?",

    type: "goal",

    options: [
      {
        title: "Placement",
        icon: "briefcase",
      },

      {
        title: "Development",
        icon: "code",
      },

      {
        title: "Semester",
        icon: "book",
      },

      {
        title: "JECA",

        icon: "brain",
      },

      {
        title: "GATE",

        icon: "rocket",
      },
    ],
  },

  {
    title: "Programming Experience",

    description: "Select your level.",

    type: "experience",

    options: [
      {
        title: "Beginner",

        icon: "sprout",
      },

      {
        title: "Intermediate",

        icon: "zap",
      },

      {
        title: "Advanced",

        icon: "flame",
      },
    ],
  },
];

renderStep();

function renderStep() {
  progressFill.style.width = ((currentStep + 1) / totalSteps) * 100 + "%";

  currentStepText.textContent = currentStep + 1;

  prevBtn.style.visibility = currentStep === 0 ? "hidden" : "visible";

  nextBtn.textContent =
    currentStep === totalSteps - 1 ? "Finish 🚀" : "Continue →";

  const step = steps[currentStep];

  if (
    step.type === "course" ||
    step.type === "goal" ||
    step.type === "experience"
  ) {
    renderCards(step);
  } else if (step.type === "semester") {
    renderSemester();
  } else if (step.type === "university") {
    renderUniversity();
  }
}

/*=========================================
        CARD RENDERER
=========================================*/

function renderCards(step){

stepContainer.innerHTML=`

<div class="step-content">

<h2 class="step-title">

${step.title}

</h2>

<p class="step-description">

${step.description}

</p>

<div class="option-grid">

${step.options.map(option=>`

<div
class="option-card"
data-value="${option.title}">

<div class="option-icon">

<i data-lucide="${option.icon}"></i>

</div>

<h3>

${option.title}

</h3>

</div>

`).join("")}

</div>

</div>

`;

lucide.createIcons();

document.querySelectorAll(".option-card").forEach(card=>{

card.addEventListener("click",()=>{

document.querySelectorAll(".option-card").forEach(c=>{

c.classList.remove("active");

});

card.classList.add("active");

userData[step.type]=card.dataset.value;

});

});

}

/*=========================================
        SEMESTER
=========================================*/

function renderSemester(){

stepContainer.innerHTML=`

<div class="step-content">

<h2 class="step-title">

Current Semester

</h2>

<p class="step-description">

Choose your semester.

</p>

<div class="semester-grid">

${Array.from({length:8},(_,i)=>`

<div
class="semester-card"
data-value="${i+1}">

${i+1}

</div>

`).join("")}

</div>

</div>

`;

document.querySelectorAll(".semester-card").forEach(card=>{

card.addEventListener("click",()=>{

document.querySelectorAll(".semester-card").forEach(c=>{

c.classList.remove("active");

});

card.classList.add("active");

userData.semester=Number(card.dataset.value);

});

});

}

/*=========================================
        UNIVERSITY
=========================================*/

function renderUniversity(){

stepContainer.innerHTML=`

<div class="step-content">

<h2 class="step-title">

Select University

</h2>

<p class="step-description">

Choose your university.

</p>

<div class="select-box">

<select id="university">

<option value="">

Choose University

</option>

<option>

Vidyasagar University

</option>

<option>

MAKAUT

</option>

<option>

Jadavpur University

</option>

<option>

University of Calcutta

</option>

<option>

Other

</option>

</select>

</div>

</div>

`;

const select=document.getElementById("university");

select.addEventListener("change",()=>{

userData.university=select.value;

});

}

/*=========================================
        VALIDATION
=========================================*/

function validateStep() {

    const step = steps[currentStep];

    if (!userData[step.type]) {

        alert("Please complete this step before continuing.");

        return false;

    }

    return true;

}


/*=========================================
        NEXT BUTTON
=========================================*/

nextBtn.addEventListener("click", () => {

    if (!validateStep()) return;

    if (currentStep < totalSteps - 1) {

        currentStep++;

        renderStep();

    }

    else {

        completeOnboarding();

    }

});


/*=========================================
        PREVIOUS BUTTON
=========================================*/

prevBtn.addEventListener("click", () => {

    if (currentStep === 0) return;

    currentStep--;

    renderStep();

});

/*=========================================
        COMPLETE ONBOARDING
=========================================*/

async function completeOnboarding() {

    nextBtn.disabled = true;

    nextBtn.innerHTML = "Saving...";

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "http://localhost:5000/api/profile/onboarding",
            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(userData)

            }
        );

        const data = await response.json();

        if (data.success) {

            stepContainer.innerHTML = `

            <div class="loading-screen">

                <div class="loading-circle"></div>

                <h2>

                    Welcome to ScholarVerse 🎉

                </h2>

                <p>

                    Preparing your personalized dashboard...

                </p>

            </div>

            `;

            nextBtn.style.display = "none";

            prevBtn.style.display = "none";

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 1800);

        }

        else {

            alert(data.message);

            nextBtn.disabled = false;

            nextBtn.innerHTML = "Continue →";

        }

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

        nextBtn.disabled = false;

        nextBtn.innerHTML = "Continue →";

    }

}

/*=========================================
        INITIALIZE
=========================================*/

renderStep();