const url = "http://localhost:5000/news?q=";

async function fetchData(query) {
    try {
        const res = await fetch(`${url}${query}`);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

fetchData("all").then(data => {
    if (data && data.articles) {
        console.log(data.articles);
        randerNews(data.articles);
    } else {
        console.error("No articles found:", data);
    }
});

let mobmenu = document.querySelector(".mobile");
let menubtn = document.querySelector(".menubtn");
menubtn.addEventListener("click", () => {
    mobmenu.classList.toggle("unhiden");
});

// Render news function
function randerNews(arr) {
    let htmlCard = ``;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].image) {
            htmlCard += `
        <div class="card">
        <a href=${arr[i].url}>
          <img src=${arr[i].image} loading="lazy">
          <h4>${arr[i].title}</h4>
          <div class="publicBydate">
            <p>${arr[i].source.name}</p>
            <span> • </span>
            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
          </div>
          <div class="desc">
          ${arr[i].description}
          </div>
          </a>
        </div>`;
        }
    }
    document.querySelector("main").innerHTML = htmlCard;
}

// Nav-bar operations
const searchBtn = document.getElementById("searchDesk");
const searchBtnMob = document.getElementById("searchMob");
const searchInpurMobile = document.getElementById("searchInputMob");
const searchInput = document.getElementById("searchInputDesk");

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInput.value);
    randerNews(data.articles);
});

searchBtnMob.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await fetchData(searchInpurMobile.value);
    randerNews(data.articles);
});

async function search(query) {
    const data = await fetchData(query);
    randerNews(data.articles);
}

// Theme toggle logic (dark/light)
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMob = document.getElementById("theme-toggleMob");
const body = document.body;

// Apply saved theme on load
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.classList.replace("fa-sun", "fa-moon");
    themeToggleMob.classList.replace("fa-sun", "fa-moon");
}

// Toggle function
function toggleTheme(buttonDesktop, buttonMobile) {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        buttonDesktop.classList.replace("fa-sun", "fa-moon");
        buttonMobile.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
    } else {
        buttonDesktop.classList.replace("fa-moon", "fa-sun");
        buttonMobile.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
    }
}

// Event listeners
themeToggle.addEventListener("click", () => {
    toggleTheme(themeToggle, themeToggleMob);
});

themeToggleMob.addEventListener("click", () => {
    toggleTheme(themeToggle, themeToggleMob);
});

// Scroll to top button
const topButton = document.getElementById("topButton");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
};

topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
