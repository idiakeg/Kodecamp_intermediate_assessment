let availableCountries;
const modeBtns = document.querySelectorAll(".dark_mode, .light_mode");
const country_container = document.querySelector(".country_container");
const loadingContainer = document.querySelector(".loading_container");
const regionFilter = document.querySelector(".region_filter");
const errorContainer = document.querySelector(".error_container");
const searchInput = document.querySelector(".search_input");

const toggleMode = () => {
    modeBtns.forEach((item) => {
        item.classList.toggle("hide_mode");
    });
};

modeBtns.forEach((button) => {
    button.addEventListener("click", toggleMode);
});

regionFilter.addEventListener("change", (e) => {
    console.log(e.target.value);
    loadingContainer.style.display = "flex";
    country_container.style.display = "none";
    errorContainer.style.display = "none";
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
            handleCountryDisplay(data);
        })
        .catch((err) => {
            handleError(err);
        });
});

window.onload = () => {
    fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => {
            handleCountryDisplay(data);
        })
        .catch((err) => {
            handleError(err);
        });
};

const handleCountryDisplay = (data) => {
    // console.log(data);
    loadingContainer.style.display = "none";
    country_container.style.display = "flex";
    // clear the previous content
    country_container.innerHTML = "";
    availableCountries = data;
    // console.log(availableCountries);
    data.forEach((item) => {
        const country_card = document.createElement("div");
        country_card.classList.add("country_card");
        country_card.innerHTML = `      
            <div class="country_image">
                <img src="${item.flags.svg}" alt="country flag" />
            </div>
            <div class="country_card_body">
                <div class="country_name">${item.name.common}</div>
                <div class="country_populatio">
                    Population: ${item.population.toLocaleString("en")}
                </div>
                <div class="country_region">Region: ${item.region}</div>
                <div class="country_capital">Capital: ${item.capital}</div>
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
};

const handleError = (err) => {
    console.log(err);

    if (err.message === "Failed to fetch") {
        err.message = err.message;
    } else {
        err.message = "Something went wrong. Try again.";
    }
    loadingContainer.style.display = "none";
    errorContainer.style.display = "block";
    errorContainer.textContent = err.message;
};

// search country
searchInput.addEventListener("input", (e) => {
    search_string = e.target.value.replace(/\s/g, "").toLowerCase();
    // search_string = e.target.value.trim().toLowerCase();
    searchResult = availableCountries.filter((item) => {
        let test = item.name.common.toLowerCase();
        return test.includes(search_string);
    });
    console.log(search_string);
    console.log(searchResult);

    // display the result
    handleCountryDisplay(searchResult);
});
