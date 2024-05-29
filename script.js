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

window.onload = () => {
    countryDetail.style.display = "none";
    fetch(`https://restcountries.com/v3.1/name/${searchOption}?fullText=true`)
        .then((res) => res.json())
        .then((data) => {
            loadingContainer.style.display = "none";
            countryDetail.style.display = "block";
            let country_info = data[0];
            console.log(country_info);
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
            subRegion.textContent = country_info.subregion;
            if (country_info.capital) {
                capital.textContent = country_info.capital;
            }
            if (country_info.tld) {
                tld.textContent = country_info.tld[0];
            }
            if (country_info.currencies) {
                currencies.textContent = Object.values(
                    country_info.currencies
                )[0].name;
            }
            if (country_info.languages) {
                languages.textContent = Object.values(
                    country_info.languages
                ).join(", ");
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
                        .catch((err) => console.log(err));
                });
            } else {
                // create the span element
                const borderBtn = document.createElement("span");
                borderBtn.textContent = "None";
                borderBtnContainer.appendChild(borderBtn);
            }
        })
        .catch((err) => {
            console.log(err);
            loadingContainer.style.display = "flex";
        });

    backBtn.addEventListener("click", () => {
        window.history.go(-1);
    });
};
