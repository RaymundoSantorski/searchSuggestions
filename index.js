const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const input = document.getElementById('search_input');
const suggestions = document.getElementById('suggestions');
const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(resp => cities.push(...resp));

const formatNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
}

function handleInputChange(){
    const regex = new RegExp(this.value, 'gi');
    const filteredCities = cities.filter(place => regex.test(place.city) || regex.test(place.state));
    const html = filteredCities.map(place => {
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
            <li>
                <span>${cityName}, ${stateName}</span>
                <span class="population">${formatNumber(place.population)}</span>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

input.addEventListener('change', handleInputChange);
input.addEventListener('keypress', handleInputChange);