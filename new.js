// 12 Distinct Mock Listing Entries embedded directly in JavaScript
const listings = [
    {
        id: 1,
        title: "Frontend React Developer",
        domain: "Frontend",
        experience: "Mid",
        remote: "Remote",
        skills: ["React", "JavaScript", "Tailwind CSS"],
        date: "2026-10-25"
    },
    {
        id: 2,
        title: "Senior Node.js Backend Engineer",
        domain: "Backend",
        experience: "Senior",
        remote: "On-site",
        skills: ["Node.js", "Express", "MongoDB", "TypeScript"],
        date: "2026-10-28"
    },
    {
        id: 3,
        title: "UI/UX Product Designer",
        domain: "Design",
        experience: "Entry",
        remote: "Hybrid",
        skills: ["Figma", "User Research", "Wireframing"],
        date: "2026-10-20"
    },
    {
        id: 4,
        title: "Fullstack Web Developer",
        domain: "Fullstack",
        experience: "Mid",
        remote: "Remote",
        skills: ["Vue.js", "Python", "Django", "PostgreSQL"],
        date: "2026-10-27"
    },
    {
        id: 5,
        title: "Junior Frontend Developer",
        domain: "Frontend",
        experience: "Entry",
        remote: "Hybrid",
        skills: ["HTML5", "CSS3", "JavaScript"],
        date: "2026-10-15"
    },
    {
        id: 6,
        title: "Lead Backend Architect",
        domain: "Backend",
        experience: "Senior",
        remote: "Remote",
        skills: ["Java", "Spring Boot", "Microservices", "Docker"],
        date: "2026-10-29"
    },
    {
        id: 7,
        title: "Senior Fullstack Engineer",
        domain: "Fullstack",
        experience: "Senior",
        remote: "On-site",
        skills: ["Next.js", "GraphQL", "Node.js", "AWS"],
        date: "2026-10-22"
    },
    {
        id: 8,
        title: "Design System Lead",
        domain: "Design",
        experience: "Senior",
        remote: "Remote",
        skills: ["Figma", "Design Systems", "CSS", "Accessibility"],
        date: "2026-10-18"
    },
    {
        id: 9,
        title: "Python Backend Developer",
        domain: "Backend",
        experience: "Mid",
        remote: "Hybrid",
        skills: ["Python", "FastAPI", "Redis", "SQL"],
        date: "2026-10-26"
    },
    {
        id: 10,
        title: "Angular Frontend Engineer",
        domain: "Frontend",
        experience: "Mid",
        remote: "On-site",
        skills: ["Angular", "TypeScript", "RxJS", "Sass"],
        date: "2026-10-19"
    },
    {
        id: 11,
        title: "Entry Level Web Designer",
        domain: "Design",
        experience: "Entry",
        remote: "Remote",
        skills: ["Photoshop", "Illustrator", "HTML", "CSS"],
        date: "2026-10-12"
    },
    {
        id: 12,
        title: "MERN Stack Developer",
        domain: "Fullstack",
        experience: "Mid",
        remote: "Remote",
        skills: ["React", "Node.js", "Express", "MongoDB"],
        date: "2026-10-24"
    }
];

// DOM Elements
const searchInput = document.getElementById("search-input");
const domainFilter = document.getElementById("domain-filter");
const experienceFilter = document.getElementById("experience-filter");
const remoteFilter = document.getElementById("remote-filter");
const sortSelect = document.getElementById("sort-select");
const listingsGrid = document.getElementById("listings-grid");
const emptyState = document.getElementById("empty-state");
const clearFiltersBtn = document.getElementById("clear-filters-btn");

// Event Listeners for Real-time Search & Multi-category Filtering
searchInput.addEventListener("input", filterAndRenderListings);
domainFilter.addEventListener("change", filterAndRenderListings);
experienceFilter.addEventListener("change", filterAndRenderListings);
remoteFilter.addEventListener("change", filterAndRenderListings);
sortSelect.addEventListener("change", filterAndRenderListings);
clearFiltersBtn.addEventListener("click", resetFilters);

// Combined Logical AND Filtering & Sorting Function
function filterAndRenderListings() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedDomain = domainFilter.value;
    const selectedExperience = experienceFilter.value;
    const selectedRemote = remoteFilter.value;
    const selectedSort = sortSelect.value;

    // Filter array based on combined criteria
    let filteredListings = listings.filter(item => {
        // Keyword Search (Matches Title or Skills)
        const matchesSearch = 
            item.title.toLowerCase().includes(searchTerm) ||
            item.skills.some(skill => skill.toLowerCase().includes(searchTerm));

        // Category Filters
        const matchesDomain = selectedDomain === "all" || item.domain === selectedDomain;
        const matchesExperience = selectedExperience === "all" || item.experience === selectedExperience;
        const matchesRemote = selectedRemote === "all" || item.remote === selectedRemote;

        // Logical AND combination
        return matchesSearch && matchesDomain && matchesExperience && matchesRemote;
    });

    // Sorting Logic
    if (selectedSort === "alphabetical") {
        filteredListings.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "newest") {
        filteredListings.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Render results or show Empty State
    renderListings(filteredListings);
}

// Render Listings Cards to UI
function renderListings(items) {
    listingsGrid.innerHTML = "";

    if (items.length === 0) {
        listingsGrid.classList.add("hidden");
        emptyState.classList.remove("hidden");
        return;
    }

    listingsGrid.classList.remove("hidden");
    emptyState.classList.add("hidden");

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        const badgeClass = item.remote === "Remote" ? "badge-remote" : 
                           item.remote === "On-site" ? "badge-onsite" : "badge-hybrid";

        card.innerHTML = `
            <div>
                <div class="card-header">
                    <div class="card-title">${item.title}</div>
                    <span class="badge ${badgeClass}">${item.remote}</span>
                </div>
                <div class="card-meta">
                    <strong>${item.domain}</strong> • ${item.experience} Level
                </div>
                <div class="card-skills">
                    ${item.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join("")}
                </div>
            </div>
            <div class="card-footer">
                <span>Posted: ${item.date}</span>
                <span>ID: #${item.id}</span>
            </div>
        `;

        listingsGrid.appendChild(card);
    });
}

// Reset All Filters
function resetFilters() {
    searchInput.value = "";
    domainFilter.value = "all";
    experienceFilter.value = "all";
    remoteFilter.value = "all";
    sortSelect.value = "newest";
    filterAndRenderListings();
}

// Initial Load
filterAndRenderListings();