const burger = document.querySelector('.burger')
const menu = document.querySelector('.header_nav')
let span = document.getElementById('currentyear')
let lastModified = document.getElementById('lastModified')

let year = new Date(). getFullYear()
let date = new Date(document.lastModified).toLocaleString('en-EN')
// alert('Hi')
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
})


span.innerText = `\u00A9 ${year}`
lastModified.innerHTML = `Last modified: ${date}` 