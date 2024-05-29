const modeBtns = document.querySelectorAll(".dark_mode, .light_mode");
const country_container = document.querySelector(".country_container");
const loadingContainer = document.querySelector(".loading_container");

const toggleMode = () => {
    modeBtns.forEach((item) => {
        item.classList.toggle("hide_mode");
    });
};

modeBtns.forEach((button) => {
    button.addEventListener("click", toggleMode);
});

window.onload = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => {
            loadingContainer.style.display = "none";
            data.forEach((item, index) => {
                console.log(item);
                // if (item.borders) console.log(item.borders, index);
                const country_card = document.createElement("div");
                country_card.classList.add("country_card");
                country_card.innerHTML = `      
                        <div class="country_image">
                            <img src="${item.flags.svg}" alt="country flag" />
                        </div>
                        <div class="country_card_body">
                            <div class="country_name">${item.name.common}</div>
                            <div class="country_populatio">
                                Population: ${item.population.toLocaleString(
                                    "en"
                                )}
                            </div>
                            <div class="country_region">Region: ${
                                item.region
                            }</div>
                            <div class="country_capital">Capital: ${
                                item.capital
                            }</div>
                        </div> 
                `;

                country_card.addEventListener("click", function () {
                    // Navigate to the country detail page when the div is clicked
                    window.location.href = `./country_detail.html?name=${encodeURIComponent(
                        item.name.common
                    )}`;
                });
                country_container.append(country_card);
            });
        })
        .catch((err) => {
            console.log(err);
            loadingContainer.style.display = "flex";
        });
};
