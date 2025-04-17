import elements from "./elements_array.js";
const filterLinks = document.querySelectorAll('.sub-element')


let elementDescriptionContainer = null;
const macroCont = document.querySelector('.element-description-macro')
const microCont = document.querySelector('.element-description-micro')
const mainElement = document.querySelectorAll('.main-element')



function renderElementDesc(chemical, container) {
    container.innerHTML = "";

// <h3>${chemical.name}</h3>

    container.innerHTML = `
        <p><strong><span>Description:<span></strong> ${chemical.description}</p>
        <p><strong><span>Recommended dosage:<span></strong> ${chemical.recommendedDosage}</p>
        <p><strong><span>Deficiency signs:<span></strong> ${chemical.deficiencySigns}</p>
        <p><strong><span>Causes of deficiency:<span></strong> ${chemical.deficiencyCauses}</p>
        <p><strong><span>Excess signs:<span></strong> ${chemical.excessSigns}</p>
        <p><strong><span>Causes of excess:<span></strong> ${chemical.excessCauses}</p>
        <p><strong><span>How to correct excess:<span></strong> ${chemical.excessCorrection}</p>

  `;

}



filterLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const filter = link.firstElementChild.dataset.filter.split(' ');

        let filtered = elements.filter(e => e.dataFilter.includes(filter[0]));
        if(filtered.length == 1) {
            if(filter[1] == 'micro') {
                elementDescriptionContainer = document.querySelector('.element-description-micro')
            } else {
                elementDescriptionContainer = document.querySelector('.element-description-macro')
            }
        }
        renderElementDesc(filtered[0], elementDescriptionContainer);
    })
})



document.querySelectorAll('.main-element h2').forEach(header => {
    // header.preventDefault()
    header.addEventListener('click', () => {
        const section = header.parentElement;
        section.classList.toggle('active');
    });
});
