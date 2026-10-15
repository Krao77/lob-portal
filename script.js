
const jobs = [
  { id: 1, title: "Frontend Developer Intern", company: "PixelCraft Studio", category: "Technology", location: "Jaipur / Remote", salary: "₹8,000–₹12,000/mo", type: "Internship", icon: "💻", description: "Build responsive web pages and learn modern frontend development with a friendly team." },
  { id: 2, title: "UI/UX Design Intern", company: "BrightPath Labs", category: "Design", location: "Remote", salary: "₹7,000–₹10,000/mo", type: "Internship", icon: "🎨", description: "Help create simple user flows, wireframes, and accessible digital experiences." },
  { id: 3, title: "Digital Marketing Intern", company: "GrowthNest", category: "Marketing", location: "Jaipur", salary: "₹6,000–₹9,000/mo", type: "Internship", icon: "📣", description: "Support social media campaigns, content planning, and basic performance reports." },
  { id: 4, title: "Junior Data Analyst", company: "InsightWorks", category: "Technology", location: "Hybrid", salary: "₹3–4 LPA", type: "Full-time", icon: "📊", description: "Help organise datasets, prepare reports, and discover useful business insights." },
  { id: 5, title: "Business Development Associate", company: "LaunchBridge", category: "Business", location: "Jaipur", salary: "₹2.5–3.5 LPA", type: "Full-time", icon: "🤝", description: "Connect with potential customers and help the team build strong relationships." },
  { id: 6, title: "Python Developer", company: "CodeHarbor", category: "Technology", location: "Remote", salary: "₹10,000–₹15,000/mo", type: "Internship", icon: "🐍", description: "Practise Python, write small scripts, and collaborate on beginner-friendly projects." }
];


function renderJobs(list) {
  const grid = document.getElementById("jobGrid");
  if (!grid) return;

  grid.innerHTML = "";
  list.forEach(function(job) {
    const card = document.createElement("article");
    card.className = "job-card";
    card.innerHTML = `
      <div class="job-top">
        <div class="company-icon" aria-hidden="true">${job.icon}</div>
        <div><h3>${job.title}</h3><p class="company-name">${job.company}</p></div>
      </div>
      <span class="tag">${job.category}</span>
      <p class="job-description">${job.description}</p>
      <div class="job-meta"><span>📍 ${job.location}</span><span>💰 ${job.salary}</span><span>🕒 ${job.type}</span></div>
      <button class="button button-primary apply-job" type="button" data-job="${job.title}">Apply now →</button>
    `;
    grid.appendChild(card);
  });

  const count = document.getElementById("jobCount");
  const message = document.getElementById("resultMessage");
  const empty = document.getElementById("noResults");
  if (count) count.textContent = list.length;
  if (message) message.textContent = `Showing ${list.length} of ${jobs.length} jobs`;
  if (empty) empty.hidden = list.length !== 0;
}


const searchForm = document.getElementById("searchForm");
if (searchForm) {
  searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    filterJobs();
  });
  document.getElementById("jobSearch").addEventListener("input", filterJobs);
  document.getElementById("categoryFilter").addEventListener("change", filterJobs);
}

function filterJobs() {
  const searchInput = document.getElementById("jobSearch");
  const categoryInput = document.getElementById("categoryFilter");
  if (!searchInput || !categoryInput) return;

  const keyword = searchInput.value.trim().toLowerCase();
  const category = categoryInput.value;
  const filtered = jobs.filter(function(job) {
    const matchesKeyword = job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword);
    const matchesCategory = category === "all" || job.category === category;
    return matchesKeyword && matchesCategory;
  });
  renderJobs(filtered);
}


const jobGrid = document.getElementById("jobGrid");
if (jobGrid) {
  jobGrid.addEventListener("click", function(event) {
    const button = event.target.closest(".apply-job");
    if (!button) return;
    window.location.href = `apply.html?job=${encodeURIComponent(button.dataset.job)}`;
  });
}


const themeButton = document.getElementById("themeToggle");
if (themeButton) {
  function updateThemeButton() {
    themeButton.textContent = document.body.classList.contains("dark") ? "☀️ Light mode" : "🌙 Dark mode";
  }
  if (localStorage.getItem("jobfinder-theme") === "dark") {
    document.body.classList.add("dark");
  }
  updateThemeButton();
  themeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark");
    localStorage.setItem("jobfinder-theme", document.body.classList.contains("dark") ? "dark" : "light");
    updateThemeButton();
  });
}


const selectedJob = document.getElementById("selectedJob");
if (selectedJob) {
  const requestedJob = new URLSearchParams(window.location.search).get("job");
  if (requestedJob) {
    const optionExists = Array.from(selectedJob.options).some(option => option.value === requestedJob || option.textContent === requestedJob);
    if (optionExists) selectedJob.value = requestedJob;
  }
}


const applicationForm = document.getElementById("applicationForm");
if (applicationForm) {
  const formMessage = document.getElementById("formMessage");
  applicationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!applicationForm.checkValidity()) {
      applicationForm.reportValidity();
      return;
    }
    const name = document.getElementById("fullName").value.trim();
    const jobTitle = selectedJob.value;
    formMessage.textContent = `Thank you, ${name}! Your demo application for ${jobTitle} is complete. No information was sent or saved.`;
    formMessage.className = "form-message success";
  });
  applicationForm.addEventListener("reset", function() {
    formMessage.textContent = "";
    formMessage.className = "form-message";
  });
}


setInterval(function() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  document.title = `${time} | JobFinder`;
}, 1000);


renderJobs(jobs);
