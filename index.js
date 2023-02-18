const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const input = document.getElementById('search_input');
const suggestions = document.getElementById('suggestions');
const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(resp => cities.push(...resp));

function handleInputChange(){
    const regex = new RegExp(this.value, 'gi');
    const filteredCities = cities.filter(city => regex.test(city.city) || regex.test(city.state));
    const html = filteredCities.map(city => {
        return `<li>${city.city}, ${city.state}</li>`;
    }).join('');
    suggestions.innerHTML = html;
}

input.addEventListener('change', handleInputChange);
input.addEventListener('keypress', handleInputChange);