
let span = document.getElementById('currentyear')
let lastModified = document.getElementById('lastModified')

let year = new Date(). getFullYear()
let date = new Date(document.lastModified).toLocaleString('en-EN')


span.innerText = `\u00A9 ${year}`
lastModified.innerHTML = `Last modified: ${date}` 