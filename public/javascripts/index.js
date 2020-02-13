const apiHandler = axios.create({
    baseURL: "http://localhost:2000"
})

const allCheckboxes = document.querySelectorAll(".checkbox");
const profilContainer = document.querySelector("#all-photographers");
let profilArr = [];



function showFiltered() {
    // const checkedBox = document.querySelectorAll(".checkbox:checked");
    let catFilter = [];
    let allCat = []

    allCheckboxes.forEach(checkbox => {
        if (checkbox.checked) catFilter.push(checkbox.getAttribute("value"))
        allCat.push(checkbox.getAttribute("value"))
    });
    console.log(catFilter)
    console.log(allCat)

    if (catFilter.length === 0) {
        getMatchInfo(allCat);
    } else {
        getMatchInfo(catFilter);
    }

}

function getMatchInfo(arr) {
    apiHandler
    .post("/photographers/filter", {
        arr
    })
    .then(apiRes => {
            profilArr = apiRes.data;
            console.log(profilArr)
            postInfos(profilArr);
    })
    .catch(apiErr => {
            console.log(apiErr)
    })
}

function postInfos(profil) {
    profilContainer.innerHTML = "";
    console.log(profilArr)
    profilArr.forEach(pro => {
        let profilBox = document.createElement("div")
        profilBox.classList.add("photographer-profile")
        profilContainer.appendChild(profilBox)
        profilBox.innerHTML += `
            <div class="portfolio-block">
                <div>
                    <img class="img-portfolio" src="${pro.portfolio[0]}"> 
                </div>
                <div>
                    <img class="img-portfolio" src="${pro.portfolio[1]}">
                </div>
                <div>
                    <img class="img-portfolio" src="${pro.portfolio[2]}">
                </div>
                <div>
                    <img class="img-portfolio" src="${pro.portfolio[3]}">
                </div>
            </div>
            <hr style="width: 60%; margin: 20px auto;">
            <div class="photographers-infos">
                <div class="pp">
                    <img class="tete" src="${pro.profile_picture}">
                </div>
                <div class="text-profile">
                    <h3>${pro.name}</h3>
                    <p>Price : ${pro.price}€ per day</p>
                    <p>Location : ${pro.location}</p>
                    <p>Speciality : 
                        <ul class="cat-list">
                        </ul>
                    </p>
                </div>
            </div>
        `
        let catList = profilBox.querySelector(".cat-list")
        pro.categories.forEach(cat => {
            console.log(cat)    
            catList.innerHTML += `<li>${cat}</li>`
        })
    })
}

allCheckboxes.forEach(checkbox => checkbox.onclick = showFiltered)