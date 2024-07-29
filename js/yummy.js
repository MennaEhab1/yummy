//loader
$(function () {
    $(".loader").fadeOut(1000, function () {
        $(".loading").fadeOut(1000);
        $("body").css("overflow", "auto");
    })
})

// sideBar
let innerSideWidth = $(".innerSide").innerWidth();
let frontMeals = document.getElementById("frontMeals");
let form = document.getElementsByClassName("form-control");
let container = document.getElementsByClassName("container");

$(".innerSide").css('left', -innerSideWidth);
$(".outterSide").css('left', "0px");

let arr,response,result;



$(".list").click(function () {
    $(".innerSide").animate({ left: 0 }, 500);
    $(".outterSide").animate({left:249},500);
    $(".list").addClass("d-none");
    $(".close").removeClass("d-none");    
    for (let i = 0; i < 5; i++) {
        $(".content li").eq(i).animate({
            top: 0
        }, (i + 5) * 200)
    }
})
$(".close").click(function () { 
    $(".innerSide").animate({ left: -innerSideWidth }, 1000);
    $(".outterSide").animate({ left: 0 }, 1000);
    $(".close").addClass("d-none");
    $(".list").removeClass("d-none");
    for (let i = 0; i < 5; i++) {
        $(".content li").eq(i).animate({
            top: 1000
        }, 400)
    }
})

// mainPage
async function getMeals() {
    response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    result = await response.json();
    // console.log(result);
    arr = result.meals;
    displayFrontMeals();

    // console.log(arr);
    
}
getMeals();

function displayFrontMeals() {
    let meals = '';
    for (i = 0; i < arr.length; i++){
        

    meals+=`<div class="mainCol col-md-3 meal gy-5">
    <div onclick="getMealDetails('${arr[i].strMeal}')" class="meal">
       <div class="image"> <img src="${arr[i].strMealThumb}" class="rounded-2" alt="">
        <div class="layer rounded-2">
            <h3>${arr[i].strMeal}</h3>
        </div>
    </div>
    </div>
</div>`
}
    frontMeals.innerHTML = meals;
}

async function getMealDetails(name) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let resl = await res.json();
    console.log(resl);
    displayOneMeal(resl.meals[0]);

}
function displayOneMeal(meal) {
let ingredients = ``;
    for (let j = 1; j <= 20; j++){
        if (meal[`strIngredient${j}`]) {
            ingredients += `<span>${meal[`strMeasure${j}`]} ${meal[`strIngredient${j}`]}</span>`;
        }
    }
    oneMeal=`<div class="col col-md-4">
    <img src="${meal.strMealThumb}" class="w-100 rounded-3 mb-3" alt="">
    <h2>${meal.strMeal}</h2>
</div>
<div class="col mb-5 col-md-8">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>

    <h2>Area : ${meal.strArea}</h2>

    <h2>Category : ${meal.strCategory}</h2>

    <h2>Recipes :</h2>
    <div class="ing">
        ${ingredients}
    </div>

    <h3 class="mb-4">Tags : </h3>
    <span class="text-danger p-2 rounded-3" style="background-color: rgb(255, 193, 193);">${meal.strTags}</span>
    <br>
    <br>
    <br>


        <a href="${meal.strSource}" class="source bg-success px-3 py-2 rounded-3 text-white" >Source</a>
        <a href="${meal.strYoutube}" class="youtube bg-danger px-3 py-2 rounded-3 text-white">Youtube</a>


</div>`
frontMeals.innerHTML = oneMeal;
    
}

// search
let searchForm = document.getElementById("searchForm");
$("#searchItem").click(function () {
    frontMeals.innerHTML = '';
    $(".loading2").fadeIn(1);

    $(".loading2").fadeOut(1000);
    

    let search = ``;
    search = `<div class="search">
    <div class="container d-flex flex-row justify-content-center">
<div style="width: 45%;">
    <input type="text" onkeyup="getNameInput(this.value)" class="form-control bg-black text-white" id="nameInput" placeholder="Search By Name">
  </div>
  <div class="ms-4" style="width: 45%;">
    <input type="text" onkeyup="getLetterInput(this.value)" class="form-control bg-black" id="letterInput" placeholder="Search By First Letter">
  </div>
</div>

</div> `;
    searchForm.innerHTML = search;
})

async function getLetterInput(name) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);
    resp = await resp.json();
    console.log(name);
    console.log(resp.meals);
    diplaySearched(resp.meals);
}

function diplaySearched(searcgedMeal) {
    let searched=``;

    for (i = 0; i < searcgedMeal.length; i++) {
        searched += `<div class="mainCol col-md-3 meal gy-5">
    <div onclick="getMealDetails('${searcgedMeal[i].strMeal}')" class="meal">
       <div class="image"> <img src="${searcgedMeal[i].strMealThumb}" class="rounded-2" alt="">
        <div class="layer rounded-2">
            <h3>${searcgedMeal[i].strMeal}</h3>
        </div>
    </div>
    </div>
</div>`
    }
    frontMeals.innerHTML = searched;
}


async function getNameInput(name) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    resp = await resp.json();
    console.log(name);
    console.log(resp.meals);
    dis(resp.meals);
    
}

function dis(meal) {
    box = ``;
    for (k = 0; k < meal.length;k++){
    box+=`<div class="mainCol col-md-3 meal gy-5">
    <div onclick="getMealDetails('${meal[k].strMeal}')" class="meal">
       <div class="image"> <img src="${meal[k].strMealThumb}" class="rounded-2" alt="">
        <div class="layer rounded-2">
            <h3>${meal[k].strMeal}</h3>
        </div>
    </div>
    </div>
</div>`
    }
    frontMeals.innerHTML = box;
    
}


// category
$("#cate").click(function () {
    frontMeals.innerHTML = '';
    $("#searchForm").addClass("d-none");
    $(".loading2").fadeIn(1);

    $(".loading2").fadeOut(1000);


    

    cateDis();

})
let loop,loopMeals,mealName;
async function category() {
    
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    resp = await resp.json();
   
    // console.log(resp.categories);
    loop = resp.categories;
    
}
category();

function cateDis() {
    let catee = '';
    for (i = 0; i < loop.length; i++) {
        

        catee += `<div class="mainCol col-md-3 meal gy-5">
    <div onclick="cateMeals('${loop[i].strCategory}')" class="meal">
       <div class="image"> <img src="${loop[i].strCategoryThumb}" class="rounded-2" alt="">
        <div class="layer rounded-2">
    <h3 style="text-align: center !important;">${loop[i].strCategory}</h3>
            <p>${loop[i].strCategoryDescription.substring(0,50)}...</p>
        </div>
    </div>
    </div>
</div>`
    }
    frontMeals.innerHTML = catee;
}

async function cateMeals(mealName) {
    let respo = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
    respo = await respo.json();
    loopMeals = respo.meals;
    console.log(loopMeals);
    categoriesMeals();
}

function categoriesMeals() {
    let meals = '';
for (i = 0; i < loopMeals.length; i++) {
    

    meals += `<div class="mainCol col-md-3 meal gy-5">
<div onclick="getMealDetails('${loopMeals[i].strMeal}')" class="meal">
   <div class="image"> <img src="${loopMeals[i].strMealThumb}" class="rounded-2" alt="">
    <div class="layer rounded-2">
        <h3>${loopMeals[i].strMeal}</h3>
    </div>
</div>
</div>
</div>`
    }
    frontMeals.innerHTML = meals;
}

//Area

$("#areaItem").click(function () {
    frontMeals.innerHTML = '';
    $("#searchForm").addClass("d-none");

    $(".loading2").fadeIn(1);

    $(".loading2").fadeOut(1000);
    disAreas();
    
})

let areasNames;
async function area() {
    
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    resp = await resp.json(); 

    // console.log(resp.meals);
    areasNames = resp.meals;
    
}
area();

function disAreas() {
    let areasContainer = ``;
    for (i = 0; i < areasNames.length; i++){
        areasContainer += `<div class="mainCol col-md-3 meal gy-5 text-center">
        <div onclick="areaMeals('${areasNames[i].strArea}')" class="areaBox">
    <i class="bi bi-pin-map-fill" style="font-size: 60px;"></i>
    <h2>${areasNames[i].strArea}</h2>
    </div>
     </div>`
}
    frontMeals.innerHTML = areasContainer; 
}
let loopAreaMeals;
async function areaMeals(name) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    resp = await resp.json();

    console.log(resp.meals);
    loopAreaMeals = resp.meals;
    disAreasMeals();
}


function disAreasMeals() {
    let meals = '';
    for (i = 0; i < loopAreaMeals.length; i++) {
        
    
        meals += `<div class="mainCol col-md-3 meal gy-5">
    <div onclick="getMealDetails('${loopAreaMeals[i].strMeal}')" class="meal">
       <div class="image"> <img src="${loopAreaMeals[i].strMealThumb}" class="rounded-2" alt="">
        <div class="layer rounded-2">
            <h3>${loopAreaMeals[i].strMeal}</h3>
        </div>
    </div>
    </div>
    </div>`
        }
        frontMeals.innerHTML = meals;
}

//ingredients

$("#ingItem").click(function () {
    frontMeals.innerHTML = '';
    $("#searchForm").addClass("d-none");

    $(".loading2").fadeIn(1);

    $(".loading2").fadeOut(1000);

    

    disIng();

})
let ingName;
async function ing() {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    resp = await resp.json();
    console.log(resp.meals.slice(0,20));
    ingName = resp.meals.slice(0,20);
}

ing();

function disIng() {
    ingContainer = ``;
    for (i = 0; i < ingName.length; i++){
        ingContainer +=`
        <div class="mainCol col-md-3 meal gy-5 text-center">
        <div onclick="getIngName('${ingName[i].strIngredient}')" class="ingBox">
            <i class="bi bi-egg-fried" style="font-size: 60px;"></i>
            <h2>${ingName[i].strIngredient}</h2>
            <p>${ingName[i].strDescription.substring(0,50)}</p>
        </div> </div>`
    }

    frontMeals.innerHTML=ingContainer;
}
let loopIng;
async function getIngName(name) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    resp = await resp.json();

    console.log(resp.meals);
    loopIng = resp.meals;
    disIngMeals();
}


function disIngMeals() {
    let meals = '';
    for (i = 0; i < loopIng.length; i++) {
        
    
        meals += `<div class="mainCol col-md-3 meal gy-5">
    <div onclick="getMealDetails('${loopIng[i].strMeal}')" class="meal">
       <div class="image"> <img src="${loopIng[i].strMealThumb}" class="rounded-2" alt="">
        <div class="layer rounded-2">
            <h3>${loopIng[i].strMeal}</h3>
        </div>
    </div>
    </div>
    </div>`
        }
    frontMeals.innerHTML = meals;
}

// contact
 
$("#contactItem").click(function () {
    frontMeals.innerHTML = '';
    $("#searchForm").addClass("d-none");

    $(".loading2").fadeIn(1);

    $(".loading2").fadeOut(1000);
    

    form=`<div id="contact" class="contact d-flex justify-content-center" style="margin-top: 300px;">
    <div class="row row-cols-1 w-75">
    
        <div class="col col-md-6">
            <div class="mb-3">
                <input type="text" class="form-control" onkeyup="checkName()" id="inputName"  placeholder="Enter Your Name">
                <div class="allert">
                    <p id="nameA" class="d-none">Special characters and numbers not allowed</p>
                </div>
              </div>
        </div>
        <div class="col col-md-6">
            <div class="mb-3">
                <input type="email" class="form-control" onkeyup="checkEmail()" id="inputEmail"  placeholder="Enter Your Email">
                <div class="allert">
                    <p id="emailA" class="d-none">Email not valid *exemple@yyy.zzz</p>
                </div>
              </div>

        </div>
        <div class="col col-md-6">
            <div class="mb-3">
                <input type="text" class="form-control" onkeyup="checkPhone()" id="inputPhone"  placeholder="Enter Your Phone">
                <div class="allert">
                    <p id="phoneA" class="d-none">Enter valid Phone Number</p>
                </div>
              </div>
           
        </div>
        <div class="col col-md-6">
            <div class="mb-3">
                <input type="number" class="form-control" onkeyup="checkAge()" id="inputAge"  placeholder="Enter Your Age">
                <div class="allert">
                    <p id="ageA" class="d-none">Enter valid age</p>
                </div>
              </div>
            

        </div>
        <div class="col col-md-6">
            <div class="mb-3">
                <input type="password" class="form-control" id="inputPass" onkeyup="checkPass()"  placeholder="Enter Your Password">
                <div class="allert">
                    <p id="passA" class="d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
                </div>
              </div>
        </div>
        <div class="col col-md-6">
            <div class="mb-3">
                <input type="password" class="form-control" onkeyup="checkRepass()" id="inputRepass"  placeholder="Repassword">
                <div class="allert">
                    <p id="repassA" class="d-none">Enter valid repassword</p>
                </div>
              </div>
              
        </div>
        
    </div>
</div>
 </div>
 <button value="Submit" disabled id="submitBtn">Submit</button>`
    
    
    frontMeals.innerHTML = form;

    const inputName = document.getElementById("inputName");
    
    inputName.addEventListener("focus", function () {
        return true;
    })

    const inputEmail = document.getElementById("inputEmail");

    inputEmail.addEventListener("focus", function () {
        return true;
    })

    const inputPhone = document.getElementById("inputPhone");

    inputPhone.addEventListener("focus", function () {
        return true;
    })

    const inputAge = document.getElementById("inputAge");

    inputAge.addEventListener("focus", function () {
        return true;
    })

    const inputPass = document.getElementById("inputPass");

    inputPass.addEventListener("focus", function () {
        return true;
    })

    const inputRepass = document.getElementById("inputRepass");

    inputRepass.addEventListener("focus", function () {
        return true;
    })



    

})




function nameValidation() {
    let regex = /^[a-zA-Z]+$/;
    if (regex.test(inputName.value)) {
        return true;
    };
}
function checkName() {
    if (!nameValidation()) {
        $("#nameA").removeClass("d-none");
    } else {
        $("#nameA").addClass("d-none");
        
    }
}

function emailValidation() {
    let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(inputEmail.value);
}
function checkEmail() {
        if (!emailValidation()) {
        $("#emailA").removeClass("d-none");
    } else {
        $("#emailA").addClass("d-none");
        
    }
}

function phoneValidation() {
    let regex = /^\d{11}$/;
    return regex.test(inputPhone.value);
}
function checkPhone() {
    if (!phoneValidation()) {
                $("#phoneA").removeClass("d-none");
            } else {
                $("#phoneA").addClass("d-none");
                
            }
}

function ageValidation() {
    let regex = /^(?:1[01]\d|[1-9]\d|\d)$/;
    return regex.test(inputAge.value);

}
function checkAge() {
    if (!ageValidation()) {
                $("#ageA").removeClass("d-none");
            } else {
                $("#ageA").addClass("d-none");
                
            }
}

function passValidation() {
    let regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regex.test(inputPass.value)
}

function checkPass() {
    if (!passValidation()) {
        $("#passA").removeClass("d-none");
    } else {
        $("#passA").addClass("d-none");
        
    }
}

function repassValidation() {
    return inputPass.value == inputRepass.value ;
}

function checkRepass() {
    if (!repassValidation()) {
        $("#repassA").removeClass("d-none");
    } else {
        $("#repassA").addClass("d-none");
        
    }
}












