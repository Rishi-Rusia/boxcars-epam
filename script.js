
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

//swiper code

document.addEventListener("DOMContentLoaded", function () {
    
});


document.addEventListener("DOMContentLoaded",async function(){
    const fetchData= await fetch("carData.json");
    const data= await fetchData.json();
    

    const carCards= document.getElementById("most-searched-cars-container");
    const latestCars= document.getElementById("latest-cars-container");
    console.log(carCards);
    
    //Slider Dynamic Rendering

    data.cars.forEach(element => {
        const card=document.createElement('div');
        card.className="swiper-slide car-card-single w-20";
        card.innerHTML=`
                            <div class="card-card-single-header">
                                <img class="w-full rounded-t-3xl" src="${element.image}" alt="">
                            </div>
                            <div class="car-card-single-footer rounded-b-3xl bg-[#050B20] text-white p-2">
                                <div class="card-first-row p-2">
                                    <h2 class="text-xl">${element.carName}</h2>
                                    <p class="text-base">Lorem ipsum dolor sit amet.</p>
                                </div>

                                <hr class="h-1 mx-2 text-gray-500 opacity-50 my-1 p-1">
                                <div class="card-features flex justify-between mx-2 p-2">
                                    <div class="feature-square">
                                        <img class="mx-auto" src="./images/speed.png" alt="">
                                        <p>50 miles</p>
                                    </div>
                                    <div class="feature-square">
                                        <img class="mx-auto" src="./images/model.png" alt="">
                                        <p>${element.type}</p>
                                    </div>
                                    <div class="feature-square">
                                        <img class="mx-auto" src="./images/speed.png" alt="">
                                        <p>${element.year}</p>
                                    </div>

                                </div>

                                <hr class="h-1 mx-2 text-gray-500 opacity-50 my-1 p-1">

                                <div class="card-third-row flex justify-between mx-2 p-2">
                                    <p class="font-bold text-xl">$${element.price}</p>
                                    <button class="text-white">View Details</button>
                                </div>
                            </div>
                       `;

        const card2 = card.cloneNode(true);

        carCards.appendChild(card);
        latestCars.appendChild(card2);

    });

    const browsebytype= document.getElementById("browse-by-type-list-id");

    //Browse by type rendering

    data.types.forEach(element => {
        const item= document.createElement("button");
        item.className="browse-by-type-button border border-gray-300 h-24 w-24 flex flex-col items-center justify-center rounded-xl p-4 my-2 hover:border-5 hover:bg-red-100 cursor-pointer";
        item.innerHTML=`
        <img src="./images/sedan.png" class="h-10" alt="">
        <p class="font-semibold text-sm md:text-base text-center">${element}</p>
        `;
        item.value=element;

        browsebytype.appendChild(item);

        handleTypeButton();
    });

    //Brand rendering in search bar
    
    data.brands.forEach(element => {
        const parent_element= document.getElementById("brand-select-dropdown");

        const item= document.createElement('option');
        item.className= "cursor-pointer";
        item.value=element;
        item.innerHTML=element;

        parent_element.appendChild(item);
    });

    data.types.forEach(element => {
        const parent_element= document.getElementById("type-select-dropdown");

        const item= document.createElement('option');
        item.className= "cursor-pointer";
        item.value=element;
        item.innerHTML=element;

        parent_element.appendChild(item);
    });
    
    data.price.forEach(element => {
        const parent_element= document.getElementById("price-select-dropdown");

        const item= document.createElement('option');
        item.className= "cursor-pointer";
        item.value=element;
        item.innerHTML= "< $"+element;

        parent_element.appendChild(item);
    });

    var swiper = new Swiper(".swiper", {
        slidesPerView: 3,     // Show 1 slide at a time
        spaceBetween: 30,     // Gap between slides
        observer:true,
        observeParents:true,
        loop: true,           // Infinite looping
        autoplay: {           // Auto-slide
            delay: 5000,
            disableOnInteraction: true,
        },
        pagination: {         // Pagination bullets
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {         // Next/Prev buttons
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints:{
            0:{
                slidesPerView:1,
            },
            768:{
                slidesPerView:2,
            },
            1024:{
                slidesPerView:3,
            }
        }
    });

    swiper();
});

const handleTypeButton= ()=>{
    const type_buttons = [...document.getElementsByClassName("browse-by-type-button")];

    console.log(type_buttons);

    type_buttons.forEach((button)=>{
    button.addEventListener('click',(event)=>{
        console.log(event.target.value);
    });

});
}

const handleSearch= async (stuff)=>{
    const fetchData= await fetch("carData.json");
    const data= await fetchData.json();

    const results= data.cars.filter((element)=>{
        return (element.price<stuff.price) && (element.brand===stuff.brand || stuff.brand==="Any-Brand") && (element.type===stuff.type || stuff.type==="Any-Build");
    });

    console.log(results.length?results:"No results");

    search_results=document.getElementById('search-results-container-alt');

    search_results.innerHTML="";

    results.forEach(element => {
        const card=document.createElement('div');
        card.className = "car-card-single w-80 mx-auto my-5 sm:m-10";
card.innerHTML = `
    <div class="card-card-single-header">
        <img class="w-full rounded-t-3xl" src="${element.image}" alt="">
    </div>
    <div class="car-card-single-footer rounded-b-3xl bg-[#050B20] text-white p-2">
        <div class="card-first-row p-2">
            <h2 class="text-xl">${element.carName}</h2>
            <p class="text-base">Lorem ipsum dolor sit amet.</p>
        </div>

        <hr class="h-1 mx-2 text-gray-500 opacity-50 my-1 p-1">
        <div class="card-features flex justify-between mx-2 p-2">
            <div class="feature-square">
                <img class="mx-auto" src="./images/speed.png" alt="">
                <p>50 miles</p>
            </div>
            <div class="feature-square">
                <img class="mx-auto" src="./images/model.png" alt="">
                <p>${element.type}</p>
            </div>
            <div class="feature-square">
                <img class="mx-auto" src="./images/speed.png" alt="">
                <p>${element.year}</p>
            </div>
        </div>

        <hr class="h-1 mx-2 text-gray-500 opacity-50 my-1 p-1">

        <div class="card-third-row flex justify-between mx-2 p-2">
            <p class="font-bold text-xl">$${element.price}</p>
            <button class="text-white">View Details</button>
        </div>
    </div>
`;


        const card2 = card.cloneNode(true);

        search_results.appendChild(card);

    });
}


const main_search_form= document.getElementById("main-search-form");
main_search_form.addEventListener("submit",(event)=>{
    event.preventDefault();
    

    const brand = document.getElementById("brand-select-dropdown").value;
    const type = document.getElementById("type-select-dropdown").value;
    const price = document.getElementById("price-select-dropdown").value;

    // // Log or use the values
    // console.log("Selected Brand:", brand);
    // console.log("Selected Type:", type);
    // console.log("Selected Price:", price);

    // Perform search or filter action

    const main_div = document.getElementById("landing-main-content-div-id");
    const search_div=document.getElementById("search-main-content-div-id");
            if (main_div && search_div) {
                main_div.classList.add("hidden");
                search_div.classList.remove("hidden");
            } else {
                console.error("Element with ID 'landing-main-content-div-id' not found");
            }

    handleSearch({ brand:brand, type:type, price:price });
});

document.addEventListener("DOMContentLoaded", () => {
    const home_button = document.getElementById("nav-main-home-button");

    if (home_button) {
        home_button.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            console.log("home button clicked");

            const main_div = document.getElementById("landing-main-content-div-id");
            const search_div=document.getElementById("search-main-content-div-id");
            if (main_div && search_div) {
                main_div.classList.remove("hidden");
                search_div.classList.add("hidden");
            } else {
                console.error("Element with ID 'landing-main-content-div-id' not found");
            }
        });
    } else {
        console.error("Element with ID 'nav-main-home-button' not found");
    }
});


document.addEventListener("DOMContentLoaded",()=>{

    console.log(document.getElementsByClassName("browse-by-type-button"));

    
});


// Now you can use all slider methods like
