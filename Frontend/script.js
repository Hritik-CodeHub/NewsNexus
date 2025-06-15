const url = "https://newsnexus-3q7g.onrender.com/news?q=";

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
        randerNews(data.articles);
    } else {
        console.error("No articles found:", data);
    }
});

let mobmenu=document.querySelector(".mobile");
let menubtn=document.querySelector(".menubtn");
menubtn.addEventListener("click",()=>{
    mobmenu.classList.toggle("unhiden")
});


// rander news Function

function randerNews(arr){
    let htmlCard =``;
    for(let i=0;i<arr.length;i++){
        if(arr[i].urlToImage){
        htmlCard+=`
        <div class="card">
        <a href=${arr[i].url}>
          <img src=${arr[i].urlToImage} lazy="loading">
          <h4>${arr[i].title}</h4>
          <div class="publicBydate">
            <p>${arr[i].author}</p>
            <span> • </span>
            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
          </div>
          <div class="desc">
          ${arr[i].description}
          </div>
          </a>
        </div>
`    };
}
document.querySelector("main").innerHTML=htmlCard;

}
// nav-bar operations

const searchBtn=document.getElementById("searchDesk");
const searchBtnMob=document.getElementById("searchMob");
const searchInpurMobile=document.getElementById("searchInputMob");
const searchInput=document.getElementById("searchInputDesk");

searchBtn.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const data= await fetchData(searchInput.value);
    randerNews(data.articles);
});

searchBtnMob.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data= await fetchData(searchInpurMobile.value);
    randerNews(data.articles);
})

async function search(query) {
    const data =await fetchData(query);
    randerNews(data.articles);
}



//  Dark mode and light mode for disktop
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Toggle Dark Mode
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Update icon
    if (body.classList.contains("dark-mode")) {
        themeToggle.classList.replace("fa-sun", "fa-moon");
    } else {
        themeToggle.classList.replace("fa-moon", "fa-sun");
    }
});


//  Dark mode and light mode for Mobile
const themeToggleMob = document.getElementById("theme-toggleMob");
const newbody = document.body;
// Toggle Dark Mode
themeToggleMob.addEventListener("click", () => {
    newbody.classList.toggle("dark-mode");
    // Update icon
    if (newbody.classList.contains("dark-mode")) {
        themeToggleMob.classList.replace("fa-sun", "fa-moon");
    } else {
        themeToggleMob.classList.replace("fa-moon", "fa-sun");
    }
});


const topButton = document.getElementById("topButton");

// Show button when scrolling down
window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
};

// Scroll to top when button is clicked
topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});