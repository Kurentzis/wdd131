import { temples } from "./templesArray.js"
const burger = document.querySelector('.burger')
const menu = document.querySelector('.header_nav')
let span = document.getElementById('currentyear')
let lastModified = document.getElementById('lastModified')

let year = new Date(). getFullYear()
let date = new Date(document.lastModified).toLocaleString('en-EN')
//  alert('Hi')
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
})


span.innerText = `\u00A9 ${year}`
lastModified.innerHTML = `Last modified: ${date}`


const galleryContainer = document.querySelector('main');
// const galleryContainer = document.querySelector('.temple-cards');

temples.forEach(temple => {
    const card = document.createElement('div');
    card.className = 'temple-card';

    card.innerHTML = `
    <div>
    <h2>${temple.templeName}<h2>
    <p><strong>Location: </strong>${temple.location}</p>
    <p><strong>Dedicated: </strong>${temple.dedicated}</p> 
    <p><strong>Area: </strong>${temple.area}</p>
    </div>
    <img src=${temple.imageUrl} alt= Picture of ${temple.templeName} loading="lazy">
    `;

    galleryContainer.appendChild(card)
    
});

