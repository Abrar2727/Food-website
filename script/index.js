// open navbar
function openNav() {
    $(".nav").animate({ "left": "0px" }, 500);
    $(".openMenu").removeClass("open-close-icon").addClass("fa-x");
}

// close navbar
function closeNav() {
    $(".nav").animate({ "left": "-270px" }, 500);
    $(".openMenu").removeClass("fa-x").addClass("open-close-icon");
}

$(".openMenu").click(function () {
    console.log("hi");
    let isOpen = $(".nav").css("left");
    if (isOpen == "0px") {
        return closeNav();
    } else {
        return openNav();
    }
})

// search Section

function search() {
    let cartonaa = ""
    cartonaa += ` 
    <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" id="searchInput" class="bg-transparent form-control text-light" type="text" placeholder="Search By Name" >
    </div>
    <div class="col-md-6">
        <input id="searchInput" class="bg-transparent form-control text-light" type="text" placeholder="Search By First Letter" >
    </div>
`
    document.getElementById("rowData").innerHTML = cartonaa;
    console.log("ehfoieeeeeeee");

}

async function searchByName(term) {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    res = await res.json();
    res.meals ? diaplayCategory(res.meals) : diaplayCategory([])
}

function displayMeals(res) {
    let cartonaa = "";

    for (let i = 0; i < res.length; i++) {
        cartonaa += `
        <div class="col-md-3">
                <div onclick="gointerMeal('${res[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${res[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${res[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    document.getElementById("rowData").innerHTML = cartonaa;
}

async function getDataCategory() {
    var res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    res = await res.json();
    diaplayCategory(res.categories)
}
getDataCategory();
function diaplayCategory(res) {
    let cartonaa = "";
    for (let i = 0; i < res.length; i++) {
        const element = res[i];
        cartonaa += `<div class="col-md-3">
        <div onclick="gointerMeal(${res[i].strCategory})" class="item position-relative">
            <img class="w-100  image"  src="${element.strCategoryThumb}" alt="">
            <div class="img-layer position-absolute">
                      <h3>${res[i].strCategory}</h3>
                      <p>${res[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
                   </div>
        </div>
    </div>`
    
    }
    document.getElementById("rowData").innerHTML = cartonaa;
}

async function gointerMeal(category) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    res = await res.json();
    displayMeals(res.meals);
}

// areaa section

async function getDataArea() {
    var res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    res = await res.json();
    console.log(res.meals);
    displayArea(res.meals)
}

getDataArea();
function displayArea(res) {
    let cartonaa = "";
    for (let i = 0; i < res.length; i++) {
        cartonaa += ` <div class="col-md-3">
      <div class="item">
          <img src="${res[i].meals}" alt="">
          <i class="fa-solid fa-house-laptop fa-4x text-light"></i>
          <h3 class="text-light">${res[i].strArea}</h3>
      </div>
  </div>`
    }
    document.getElementById("rowData").innerHTML = cartonaa;
}

async function gointerArea(area) {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    res = await res.json();
    displayMeals(res.meals);
}

// ingrrdients section
async function getDataIngre() {
    var res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    res = await res.json();
    displayDataIngredients(res.meals.slice(0, 15))
}
getDataIngre();
function displayDataIngredients(res) {
    let cartonaa = "";
    for (let i = 0; i < res.length; i++) {
        cartonaa += `
        <div class="col-md-3">
      <div class="item">
      <i class="fa-solid fa-drumstick-bite fa-4x text-light"></i>
          <h3 class="text-light">${res[i].strIngredient}</h3>
          <p class="text-light">${res[i].strDescription.split(" ").slice(0,15).join(" ")}</p>
      </div>
  </div>`
    }
    document.getElementById("rowData").innerHTML = cartonaa;
}
async function gointerIngre(area) {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    res = await res.json();
    displayMeals(res.meals);
}

// meals details
async function showDetails(meal) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    res = await res.json();
    displayDetails(meal[0]);
}

function displayDetails(meal) {
    let ingredients = ``

    for (let i = 1; i <= 15; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(" ")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let cartonaa = "";
    cartonaa += `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${res.strMealThumb}"
                    alt="">
                    <h2>${res.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-primary">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    document.getElementById("rowData").innerHTML = cartonaa;
}



function getContact() {

    let rowData = document.getElementById("rowData");
    rowData.innerHTML = ` <div class="col-md-6"> 
    <input oninput="checkName()" class="p-2 form-control nameInput" type="text" placeholder="Enter Your Name">
    <div class="nameAlert d-none alert alert-danger text-center mt-2" role="alert">
        Special characters and numbers not allowed
    </div>
</div>
<div class="col-md-6">
    <input class="form-control p-2 mailInput" type="email" placeholder="Enter Your Email">
    <div class="mailAlert d-none alert alert-danger text-center mt-2" role="alert">
        Email not valid *exemple@yyy.zzz
    </div>
</div>
<div class="col-md-6">
    <input class="p-2 form-control phoneInput" type="number" placeholder="Enter Your Phone">
    <div class="phoneAlert d-none alert alert-danger text-center mt-2" role="alert">
        Enter valid Phone Number
    </div>
</div>
<div class="col-md-6">
    <input class="form-control p-2 ageInput" type="number" placeholder="Enter Your Age">
    <div class="ageAlert d-none alert alert-danger text-center mt-2" role="alert">
        Enter valid age
    </div>
</div>
<div class="col-md-6">
    <input class="p-2 form-control passInput" type="password" placeholder="Enter Your Password">
    <div class="passAlert d-none alert alert-danger text-center mt-2" role="alert">
        Enter valid password *Minimum eight characters, at least one letter and one number:*
    </div>
</div>
<div class="col-md-6">
    <input class="form-control p-2 rePassInput" type="password" placeholder="Repassword">
    <div class="repassAlert d-none alert alert-danger text-center mt-2" role="alert">
        Enter valid repassword
    </div>
</div>
<div class="col-md-12 text-center">
<button id="submitBtn" disabled class="btn btn-outline-danger mt-3 ">Submit</button>

</div>
`
}



