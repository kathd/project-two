const apiHandler = axios.create({
    baseURL: `https://cliche-app.herokuapp.com/`
})

const allCheckboxes = document.querySelectorAll(".checkbox");
const loc = document.querySelector("#loc");
const profilContainer = document.querySelector("#all-photographers");
let profilArr = [];


//HOME ANSWER BUTTON
let answerBtn = document.getElementById("answer");
let choice = document.getElementById("choice");

if (answerBtn) {
    answerBtn.onclick = function redirectTo(){
        if (choice.value === "yes") {
            location.href = "http://localhost:2000/photographers"
            // "https://cliche-app.herokuapp.com/photographers"
        } else location.href = "http://localhost:2000/auth/signup"
        // "https://cliche-app.herokuapp.com/auth/signup"
    }
}

function showFiltered() {
    // const checkedBox = document.querySelectorAll(".checkbox:checked");
    let catFilter = [];
    let allCat = [];
    console.log("hey")

    allCheckboxes.forEach(checkbox => {
        if (checkbox.checked) catFilter.push(checkbox.getAttribute("value"))
        allCat.push(checkbox.getAttribute("value"))
    });

    if (catFilter.length === 0) {
        getMatchInfo(loc.value, allCat);
    } else {
        getMatchInfo(loc.value, catFilter);
    }

}



function getMatchInfo(lieu, special) {
    apiHandler
    .post("/photographers/filter", {
        lieu,
        special
    })
    .then(apiRes => {
            profilArr = apiRes.data;
            postInfos(profilArr);
    })
    .catch(apiErr => {
            console.log(apiErr)
    })
}

function postInfos(profil) {
    profilContainer.innerHTML = "";
    profilArr.forEach(pro => {
        let link = document.createElement("a");
        let linkAttr = document.createAttribute("href");
        linkAttr.value = `/photographers/${pro._id}/solo`;
        link.setAttributeNode(linkAttr);
        
        let profilBox = document.createElement("div")
        profilBox.classList.add("photographer-profile")

        profilContainer.appendChild(link)
        link.appendChild(profilBox)


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
            catList.innerHTML += `<li>${cat}</li>`
        })
    })
}



//FILTER DISPLAY
let filterBtn = document.getElementById("filterDisplay");
let filterBar = document.getElementById("form")
console.log(filterBtn)

function showFilterBar(){
    if(filterBtn.checked){
        filterBar.style.display = "none"
    } else filterBar.style.display = "flex"
}


allCheckboxes.forEach(checkbox => checkbox.onclick = showFiltered)
loc.onchange = showFiltered
filterBtn.onclick = showFilterBar



