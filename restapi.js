document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Function to fetch and display country data from an API
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        displayCountries(countries);
        addSearchAndFilterListeners(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function displayCountries(countries) {
    const countriesContainer = document.getElementById('countries');
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <div class="info">
                <h2>${country.name.common}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        `;
        countriesContainer.appendChild(countryCard);
    });
}

function addSearchAndFilterListeners(countries) {
    const searchInput = document.getElementById('search');
    const filterRegion = document.getElementById('filter-region');

    searchInput.addEventListener('input', () => {
        filterCountries(countries);
    });

    filterRegion.addEventListener('change', () => {
        filterCountries(countries);
    });
}

function filterCountries(countries) {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filterRegion = document.getElementById('filter-region').value;

    const filteredCountries = countries.filter(country => {
        const countryName = country.name.common.toLowerCase();
        const countryRegion = country.region;

        const matchesSearch = countryName.includes(searchInput);
        const matchesRegion = filterRegion ? countryRegion === filterRegion : true;

        return matchesSearch && matchesRegion;
    });

    displayCountries(filteredCountries);
}

// Initial fetch of countries
fetchCountries();
