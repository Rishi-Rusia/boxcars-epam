
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

//swiper code

document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper", {
        slidesPerView: 3,     // Show 1 slide at a time
        spaceBetween: 30,     // Gap between slides
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
});

document.addEventListener("DOMContentLoaded",async function(){
    const fetchData= await fetch("carData.json");
    const data= await fetchData.json();
    console.log(data.cars);

    const carCards= document.getElementById("most-searched-cars-container");
    const latestCars= document.getElementById("latest-cars-container");
    console.log(carCards);
    

    data.cars.forEach(element => {
        const card=document.createElement('div');
        card.className="swiper-slide car-card-single w-80";
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
                                        <img src="./images/speed.png" alt="">
                                        <p>50 miles</p>
                                    </div>
                                    <div class="feature-square">
                                        <img src="./images/speed.png" alt="">
                                        <p>50 miles</p>
                                    </div>
                                    <div class="feature-square">
                                        <img src="./images/speed.png" alt="">
                                        <p>50 miles</p>
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
});


// Now you can use all slider methods like
