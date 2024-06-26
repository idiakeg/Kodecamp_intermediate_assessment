const searchOption = new URLSearchParams(window.location.search).get("name");
const loadingContainer = document.querySelector(".loading_container");
const countryDetail = document.querySelector(".country_detail");
// get required fields
const countryName = document.querySelector(".specific_country_name");
const nativeName = document.querySelector(".native_name");
const population = document.querySelector(".Population");
const countryFlag = document.querySelector(".country_flag img");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub_region");
const capital = document.querySelector(".capital");
const tld = document.querySelector(".top_level_domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
let borderBtnContainer = document.querySelector(".border_btn_container");
let backBtn = document.querySelector(".back_btn");
const errorContainer = document.querySelector(".error_container");

// dark mode
const body = document.body;
const nav = document.querySelector("nav");
const modeBtns = document.querySelectorAll(".dark_mode, .light_mode");

const toggleMode = () => {
    body.classList.toggle("dark_theme");
    nav.classList.toggle("dark_theme");
    modeBtns.forEach((item) => {
        item.classList.toggle("hide_mode");
    });
};

modeBtns.forEach((button) => {
    button.addEventListener("click", toggleMode);
});

window.onload = () => {
    countryDetail.style.display = "none";
    fetch(`https://restcountries.com/v3.1/name/${searchOption}?fullText=true`)
        .then((res) => res.json())
        .then((data) => {
            loadingContainer.style.display = "none";
            countryDetail.style.display = "block";
            let country_info = data[0];
            // console.log(country_info);
            countryName.textContent = country_info.name.common;
            countryFlag.src = country_info.flags.svg;
            if (country_info.name.nativeName) {
                nativeName.textContent = Object.values(
                    country_info.name.nativeName
                )[0].official;
            }
            population.textContent =
                country_info.population.toLocaleString("en");
            region.textContent = country_info.region;
            if (country_info.subregion) {
                subRegion.textContent = country_info.subregion;
            } else {
                subRegion.textContent = "Not available";
            }
            if (country_info.capital) {
                capital.textContent = country_info.capital;
            } else {
                capital.textContent = "Not available";
            }
            if (country_info.tld) {
                tld.textContent = country_info.tld[0];
            } else {
                tld.textContent = "Not available";
            }
            if (country_info.currencies) {
                currencies.textContent = Object.values(
                    country_info.currencies
                )[0].name;
            } else {
                currencies.textContent = "Not available";
            }
            if (country_info.languages) {
                languages.textContent = Object.values(
                    country_info.languages
                ).join(", ");
            } else {
                languages.textContent = "Not available";
            }
            if (country_info.borders) {
                //    get the country from the country code
                country_info.borders.forEach((item) => {
                    fetch(
                        `https://restcountries.com/v3.1/alpha/${item}?fullText=true`
                    )
                        .then((res) => res.json())
                        .then(([data]) => {
                            // create the span element
                            const borderBtn = document.createElement("span");
                            borderBtn.style.cursor = "pointer";
                            borderBtn.textContent = data.name.common;
                            borderBtn.addEventListener("click", function () {
                                // Navigate to the country detail page when the span is clicked
                                window.location.href = `./country_detail.html?name=${encodeURIComponent(
                                    data.name.common
                                )}`;
                            });
                            borderBtnContainer.appendChild(borderBtn);
                        })
                        .catch((err) => handleError(err));
                });
            } else {
                // create the span element
                const borderBtn = document.createElement("span");
                borderBtn.textContent = "None";
                borderBtnContainer.appendChild(borderBtn);
            }
        })
        .catch((err) => {
            handleError(err);
        });

    backBtn.addEventListener("click", () => {
        window.history.go(-1);
    });
};

const handleError = (err) => {
    console.log(err);

    if (err.message === "Failed to fetch") {
        err.message = "Failed to fetch. Try again.";
    } else {
        err.message = "Something went wrong. Try again.";
    }
    countryDetail.style.display = "none";
    loadingContainer.style.display = "none";
    errorContainer.style.display = "block";
    errorContainer.textContent = err.message;
};
