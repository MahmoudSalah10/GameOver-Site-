// <!-- ========== Global Part ========== -->
let gameData = []
const loader = document.querySelector(".loading")
const mode = document.getElementById("mode");

// <!-- ========== Start Part ========== -->
getGames("mmorpg")
if (localStorage.getItem("theme") != null) {
   const themeData = localStorage.getItem("theme"); 

   if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon"); 
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); 
   }

   document.querySelector("html").setAttribute("data-theme", themeData); 
}
// <!-- ========== Events Part ========== -->
document.querySelectorAll(".menu a").forEach(function (link) {
    link.addEventListener("click", function () {
        document.querySelector(".menu .active").classList.remove("active")
        link.classList.add("active")
        const category = link.getAttribute("data-category");
        console.log(category)
        getGames(category)
    })
})


async function getGames(categoryName) {
    loader.classList.remove("d-none") // loader appears
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1366d3d601mshf9906b450d6eebbp13232fjsnadfdb6711919',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options)
    const data = await api.json()
    console.log(data)
    displayData(data)
    loader.classList.add("d-none") // hiding loader

}
document.querySelector(".logout-btn").addEventListener("click", function () {
   localStorage.removeItem("uToken");
   location.href = "./index.html";
});
mode.addEventListener("click", function (e) {
   if (mode.classList.contains("fa-sun")) {
      document.querySelector("html").setAttribute("data-theme", "light");
      mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon

      localStorage.setItem("theme", "light");
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
      document.querySelector("html").setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
   }
});


// <!-- ========== Functions Part ========== -->

function displayData(gamesData) {
    let gamesBox = ""

    for (let i = 0; i < gamesData.length; i++) {
        gamesBox += `
    <div class="col">
        <div onclick = "showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" >
        <div class="card-body">

            <figure class="position-relative">
            <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />

            
            </figure>

            <figcaption>

            <div class="hstack justify-content-between">
            <h3 class="h6 small"> ${gamesData[i].title} </h3>
            <span class="badge text-bg-primary p-2">Free</span>
            </div>

            <p class="card-text small text-center opacity-50">
                ${gamesData[i].short_description}
            </p>

            </figcaption>
        </div>

        <footer class="card-footer small hstack justify-content-between">

            <span class="badge badge-color">${gamesData[i].genre}</span>
            <span class="badge badge-color">${gamesData[i].platform}</span>

        </footer>
    </div>
    </div>`;

    }
    document.getElementById("gameData").innerHTML = gamesBox
}

function showDetails(id){
    location.href = `./details.html?id=${id}`
}